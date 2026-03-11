import Image from "next/image";
import Topbar from "@/components/common/topbar";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

export default function Home() {
  return (
    <>
      <Topbar />
      <Header />
      <main className="container mx-auto py-8">
        {/* page content goes here */}
      </main>
      <Footer />
    </>
  );
}
