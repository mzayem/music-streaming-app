import { useState, useEffect } from "react";
import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function useLoadSongUrl(song: Song | null) {
  const supabaseClient = useSupabaseClient();
  const [songUrl, setSongUrl] = useState<string | null>(null);


  useEffect(() => {
    // Early return if song is null
    if (!song) {
      return;
    }

    // Function to fetch the song URL asynchronously
    const loadSongUrl = async () => {
     
      try{
        
      const { data: songData } = await supabaseClient
        .storage
        .from("songs")
        .getPublicUrl(song.song_path);

      if (songData) {
        setSongUrl(songData.publicUrl);
      } 

    } catch (error) {
      console.log(error);}
    
    };

    loadSongUrl();
  }, [song, supabaseClient]);

  return songUrl;
}

//fixes the error
// export default async function useLoadSongUrl(song: Song | null) {
//     const supabaseClient = useSupabaseClient();

//     if(!song) {
//         return'';
//     }

//     const {data: songData} = await supabaseClient
//     .storage
//     .from("songs")
//     .getPublicUrl(song.song_path)

  
//     return songData.publicUrl;
// }