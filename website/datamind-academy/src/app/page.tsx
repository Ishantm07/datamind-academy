import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SubjectCards from "@/components/SubjectCards";
import Tracks from "@/components/Tracks";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <SubjectCards />
      <Tracks />
      <Features />
      <Footer />
    </main>
  );
}
