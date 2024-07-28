"use client";

import useUploadModal from "@/hooks/useUploadModal";

import Modal from "@/components/modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";

export default function UploadModal() {
  const { isOpen, onClose } = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    setIsLoading(true);
  };
  return (
    <Modal
      title="Add a song"
      description="Upload an Mp3 file."
      isOpen={isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song title"
        />
      </form>
    </Modal>
  );
}
