import { Song } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";
import useSubscribeModal from "./useSubscribeModal";
import { useContext } from "react";
import { NearContext } from "@/wallet/near";

export default function useOnPlay(songs:Song[]) {
    const subscribeModal = useSubscribeModal();
    const player = usePlayer();
    const authModal = useAuthModal();
    const {user,subscription } = useUser()

   const { signedAccountId, wallet } = useContext(NearContext) as {
        signedAccountId: string | null;
        wallet: {
            signIn: () => Promise<void>; // Ensure this returns a Promise
            signOut: () => Promise<void>; // Ensure this returns a Promise
        } | null;
    };

    const onPlay = (id:string) => {
       
        if(!signedAccountId){
             return wallet?.signIn() ;
         }

        if(!user){
           return authModal.onOpen();
        }

        if(!subscription){
            return subscribeModal.onOpen();
        }


        player.setId(id);
        player.setIds(songs.map((song)=> song.id))
    }


    return onPlay
}