"use client";

import uniqid from "uniqid";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";

import Modal from "@/components/modal";
import Input from "./Input";
import Button from "./button";
import { ThreeDots } from "react-loading-icons";

export default function UploadModal() {
  const { isOpen, onClose } = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      artist: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];
      if (!imageFile || !songFile || !user) {
        toast.error("Missing fields");
        return;
      }
      // Calculate audio duration
      const audio = new Audio(URL.createObjectURL(songFile));
      audio.addEventListener("loadedmetadata", async () => {
        setIsLoading(true);
        const duration = audio.duration;

        const uniqueId = uniqid();

        //upload song
        const { data: songData, error: songError } =
          await supabaseClient.storage
            .from("songs")
            .upload(`song-${values.title}-${uniqueId}`, songFile, {
              cacheControl: "3600",
              upsert: false,
            });
        if (songError) {
          setIsLoading(false);
          return toast.error("Failed to upload song");
        }

        //upload image
        const { data: imageData, error: imageError } =
          await supabaseClient.storage
            .from("images")
            .upload(`image-${values.title}-${uniqueId}`, imageFile, {
              cacheControl: "3600",
              upsert: false,
            });

        if (imageError) {
          setIsLoading(false);
          return toast.error("Failed to upload image");
        }

        const { error: supabaseError } = await supabaseClient
          .from("songs")
          .insert({
            user_id: user.id,
            title: values.title,
            author: values.author,
            image_path: imageData.path,
            song_path: songData.path,
            duration: duration,
          });

        if (supabaseError) {
          setIsLoading(false);
          return toast.error(supabaseError.message);
        }
        router.refresh();
        toast.success("Song created");
        reset();
        setIsLoading(false);
        onClose();
      });
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title="Add a song"
      description="Upload an Mp3 file."
      isOpen={isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song author"
        />
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">Select a song image</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("image", { required: true })}
          />
        </div>
        <Button
          className="flex items-center justify-center"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? (
            <ThreeDots color="#fff" height={30} width={30} />
          ) : (
            "Create"
          )}
        </Button>
      </form>
    </Modal>
  );
}
