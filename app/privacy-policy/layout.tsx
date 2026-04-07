import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import Topbar from "@/components/common/topbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
