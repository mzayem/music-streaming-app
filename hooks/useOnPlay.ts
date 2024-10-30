import { Song } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";
import useSubscribeModal from "./useSubscribeModal";

export default function useOnPlay(songs:Song[]) {
    const subscribeModal = useSubscribeModal();
    const player = usePlayer();
    const authModal = useAuthModal();
    const {user,subscription } = useUser()

    const onPlay = (id:string) => {
        if(!user){
           return authModal.onOpen();
        }

        if(!subscription){
            console.log('subscription not found')
            return subscribeModal.onOpen();
        }

        player.setId(id);
        player.setIds(songs.map((song)=> song.id))
    }


    return onPlay
}