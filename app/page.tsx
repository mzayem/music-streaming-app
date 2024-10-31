import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";
import getSongsByUserId from "@/actions/getSongByUserId";
import Sidebar from "@/components/sidebar";
import ModalProvider from "@/providers/ModalProvider";
import NextTopLoader from "nextjs-toploader";

export default async function App() {
  const userSongs = await getSongsByUserId();
  const products = await getActiveProductsWithPrices();

  return (
    <>
      <ModalProvider products={products} />
      <Sidebar songs={userSongs}>
        <NextTopLoader
          showSpinner={false}
          height={1}
          color="#22C55E"
          template='<div class="bar" role="bar"><div class="peg"></div></div>'
        />
      </Sidebar>
    </>
  );
}
