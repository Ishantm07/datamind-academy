import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubjectCards from "@/components/SubjectCards";

export default function SubjectsCatalogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-muted/20">
        <div className="pt-16 pb-8 text-center px-4">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Course Catalog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a subject to see its full curriculum. Start from the absolute basics or jump straight into advanced topics.
          </p>
        </div>

        <SubjectCards />
      </main>

      <Footer />
    </div>
  );
}
