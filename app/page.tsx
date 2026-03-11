import Image from "next/image";
import Topbar from "@/components/common/topbar";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import Banner from "@/components/common/Banner";

export default function Home() {
  return (
    <>
      <Topbar />
      <Header />
      <Banner/>

      <Footer />
    </>
  );
}
