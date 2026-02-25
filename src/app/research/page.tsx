import { getAllResearchPapers } from "@/lib/research";
import ResearchList from "@/components/research-list";
import { SplitText, FloatingShapes, RevealOnScroll } from "@/components/landing";
import { FlaskConical } from "lucide-react";

export const metadata = {
  title: "Research",
  description:
    "Technical papers and research notes from QRK Labs on thought injection, knowledge-augmented generation, and human-centric AI.",
};

export default async function ResearchPage() {
  const papers = await getAllResearchPapers();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-20">
        <FloatingShapes />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-5xl">
            <SplitText
              text="RESEARCH"
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-extralight tracking-tighter leading-[0.9]"
              staggerDelay={0.05}
              enableGlitch
            />

            <RevealOnScroll animation="fade-up" delay={300}>
              <p className="mt-8 md:mt-12 text-xl md:text-2xl text-muted-foreground font-light max-w-2xl leading-relaxed">
                Technical papers, preprints, and research notes. Less polish,
                more substance. These are working documents — expect updates.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Research Papers Section */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4 md:px-8">
          {papers.length === 0 ? (
            <RevealOnScroll className="py-20">
              <div className="max-w-2xl mx-auto text-center space-y-6">
                <div className="w-20 h-20 mx-auto rounded-full border border-border/40 flex items-center justify-center">
                  <FlaskConical
                    className="w-8 h-8 text-muted-foreground/50"
                    strokeWidth={1}
                  />
                </div>
                <p className="text-2xl md:text-3xl font-light text-muted-foreground">
                  No research papers yet.
                </p>
                <p className="text-lg text-muted-foreground/70">
                  We&apos;re working on something. Check back soon!
                </p>
              </div>
            </RevealOnScroll>
          ) : (
            <ResearchList papers={papers} />
          )}
        </div>
      </section>
    </main>
  );
}
