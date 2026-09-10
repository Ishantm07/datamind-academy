import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Tracks from "@/components/Tracks";

export default function TracksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="pt-16 pb-4 text-center px-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">
            Learning Tracks
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow a curated career path designed by industry experts. Each track takes you from beginner to job-ready.
          </p>
        </div>
        <Tracks />
      </main>
      <Footer />
    </div>
  );
}
