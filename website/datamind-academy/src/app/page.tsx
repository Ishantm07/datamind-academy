import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SubjectCards from "@/components/SubjectCards";
import HowItWorks from "@/components/HowItWorks";
import LiveCodeDemo from "@/components/LiveCodeDemo";
import Tracks from "@/components/Tracks";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <SubjectCards />
      <HowItWorks />
      <LiveCodeDemo />
      <Tracks />
      <Features />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Footer />
    </main>
  );
}
