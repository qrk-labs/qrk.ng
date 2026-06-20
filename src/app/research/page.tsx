import { getAllResearchPapers } from "@/lib/research";
import ResearchList from "@/components/research-list";
import {
  SplitText,
  FloatingShapes,
  RevealOnScroll,
} from "@/components/landing";
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
      <section className="relative flex min-h-[60vh] items-center overflow-hidden pt-20">
        <FloatingShapes />

        <div className="relative z-10 container mx-auto px-4 md:px-8">
          <div className="max-w-5xl">
            <SplitText
              text="RESEARCH"
              className="text-6xl leading-[0.9] font-extralight tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]"
              staggerDelay={0.05}
              enableGlitch
            />

            <RevealOnScroll animation="fade-up" delay={300}>
              <p className="text-muted-foreground mt-8 max-w-2xl text-xl leading-relaxed font-light md:mt-12 md:text-2xl">
                Manuscripts, preprints, technical papers, and research notes.
                Less polish, more substance. These are working documents —
                expect updates.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Research Papers Section */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          {papers.length === 0 ? (
            <RevealOnScroll className="py-20">
              <div className="mx-auto max-w-2xl space-y-6 text-center">
                <div className="border-border/40 mx-auto flex h-20 w-20 items-center justify-center rounded-full border">
                  <FlaskConical
                    className="text-muted-foreground/50 h-8 w-8"
                    strokeWidth={1}
                  />
                </div>
                <p className="text-muted-foreground text-2xl font-light md:text-3xl">
                  No research papers yet.
                </p>
                <p className="text-muted-foreground/70 text-lg">
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
