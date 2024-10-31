import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";
import getSongsByUserId from "@/actions/getSongByUserId";
import ListItem from "@/components/listitem";
import Sidebar from "@/components/sidebar";
import ModalProvider from "@/providers/ModalProvider";
import NextTopLoader from "nextjs-toploader";
import PageContent from "@/components/PageContent";
import Header from "@/components/header";
import getSongs from "@/actions/getSong";

export default async function App() {
  const userSongs = await getSongsByUserId();
  const products = await getActiveProductsWithPrices();
  const songs = await getSongs();

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

        <div
          className="
      bg-neutral-900 
      h-full
      w-full 
      overflow-x-hidden
      overflow-y-auto
"
        >
          <Header>
            <div className="mb-2">
              <h1
                className="
            text-white 
            text-3xl
            font-semibold
            "
              >
                Welcome back!
              </h1>
              <div
                className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
            gap-3
            mt-4
            "
              >
                <ListItem
                  image="/images/liked-img.jpg"
                  href="/liked"
                  name="Liked Songs"
                />
              </div>
            </div>
          </Header>
          <div className="mt-2 mb-7 px-6">
            <div className="flex justify-between items-center">
              <h1 className="text-white text-2xl font-semibold">
                Newest songs
              </h1>
            </div>
            <PageContent songs={songs} />
          </div>
        </div>
      </Sidebar>
    </>
  );
}
