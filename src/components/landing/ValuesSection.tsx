import { BookOpen, DatabaseZap, Gauge, GitBranch } from "lucide-react";
import { RevealOnScroll } from "./RevealOnScroll";

const workstreams = [
  {
    icon: DatabaseZap,
    title: "DABE",
    kicker: "Published manuscript",
    copy: "A learned tokenizer-autoencoder experiment using fixed 64-token chunks, coarse binary gist, and sparse lexical repair.",
  },
  {
    icon: GitBranch,
    title: "Thought injection notes",
    kicker: "Retrieval experiment",
    copy: "Exploratory writing on letting a model request knowledge while it is reasoning, instead of retrieving everything upfront.",
  },
  {
    icon: Gauge,
    title: "Rate-distortion framing",
    kicker: "Measured tradeoffs",
    copy: "A practical way to talk about reconstruction quality, observed bitrate, decode cost, and where the method is useful.",
  },
  {
    icon: BookOpen,
    title: "Research writing",
    kicker: "Public notes",
    copy: "Plain-language posts that explain what we are studying, why it matters, and how the experiments are moving.",
  },
];

export function ValuesSection() {
  return (
    <section className="border-border/70 bg-secondary/[0.28] relative overflow-hidden border-y py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <RevealOnScroll className="max-w-3xl">
          <p className="text-primary mb-5 text-xs font-medium tracking-[0.24em] uppercase">
            Research directions
          </p>
          <h2 className="text-3xl leading-tight font-extralight tracking-tight md:text-5xl">
            Representation, retrieval, and memory.
          </h2>
          <p className="text-muted-foreground mt-5 max-w-2xl text-base leading-relaxed md:text-lg">
             We study small mechanisms that affect how models hold
            information, ask for context, and reconstruct text.
          </p>
        </RevealOnScroll>

        <div className="divide-border/70 border-border/70 mt-14 divide-y border-y md:mt-20">
          {workstreams.map(({ icon: Icon, title, kicker, copy }, index) => (
            <RevealOnScroll
              key={title}
              animation={index % 2 === 0 ? "fade-left" : "fade-right"}
              delay={index * 90}
            >
              <div className="grid grid-cols-12 items-start gap-5 py-7 md:gap-8 md:py-10">
                <div className="col-span-12 flex items-center gap-4 md:col-span-4">
                  <div className="border-border/70 bg-background/70 flex h-12 w-12 items-center justify-center border">
                    <Icon className="text-primary h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase">
                      {kicker}
                    </p>
                    <h3 className="mt-1 text-2xl font-light tracking-tight">
                      {title}
                    </h3>
                  </div>
                </div>

                <p className="text-muted-foreground col-span-12 max-w-3xl text-base leading-relaxed md:col-span-6 md:col-start-6 md:text-lg">
                  {copy}
                </p>

                <span className="text-foreground/[0.12] col-span-12 self-start text-right text-4xl font-extralight md:col-span-1 md:col-start-12">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
