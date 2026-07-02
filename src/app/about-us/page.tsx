import { Code, Database, Cpu, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  RevealOnScroll,
  SplitText,
  FloatingShapes,
} from "@/components/landing";

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center overflow-hidden pt-20">
        <FloatingShapes />

        <div className="relative z-10 container mx-auto px-4 md:px-8">
          <div className="max-w-5xl">
            <SplitText
              text="ABOUT QRK"
              className="text-5xl leading-[0.9] font-extralight tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
              staggerDelay={0.04}
              enableGlitch
            />

            <RevealOnScroll animation="fade-up" delay={400}>
              <p className="text-muted-foreground mt-8 max-w-2xl text-xl leading-relaxed font-light md:mt-12 md:text-2xl">
                An AI research lab from Abuja, Nigeria, working on learned
                tokenization, retrieval during reasoning, and model
                representation.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* The Team Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-12 gap-8 md:gap-16">
            <RevealOnScroll
              animation="fade-left"
              className="col-span-12 lg:col-span-6"
            >
              <h2 className="mb-8 text-3xl leading-tight font-extralight tracking-tight md:text-4xl lg:text-5xl">
                A small team working on{" "}
                <span className="font-light">language model research</span>
              </h2>
              <div className="text-muted-foreground space-y-6">
                <p className="text-base leading-relaxed md:text-lg">
                  We work across machine learning, NLP, data engineering, and
                  software infrastructure. Our current public work is focused on
                  representation, retrieval, and tokenization.
                </p>
                <p className="text-base leading-relaxed md:text-lg">
                  The archive includes DABE, a tokenizer-autoencoder manuscript,
                  plus writing about model memory and retrieval.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll
              animation="fade-right"
              delay={150}
              className="col-span-12 lg:col-span-5 lg:col-start-8"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Code, label: "Model Research" },
                  { icon: Database, label: "DABE & Tokenization" },
                  { icon: Cpu, label: "Retrieval Notes" },
                  { icon: Users, label: "Research Writing" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="group border-border/70 bg-card/55 hover:border-primary/40 hover:bg-card/75 border p-6 transition-colors"
                  >
                    <Icon
                      className="text-foreground/60 group-hover:text-foreground/80 mb-3 h-8 w-8 transition-colors"
                      strokeWidth={1}
                    />
                    <span className="text-muted-foreground text-sm">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="via-primary/[0.04] relative overflow-hidden bg-gradient-to-b from-transparent to-transparent py-24 md:py-32">
        {/* Watermark */}
        <div className="watermark text-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-extralight select-none">
          WHY
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-8">
          <RevealOnScroll className="mx-auto mb-16 max-w-4xl text-center md:mb-24">
            <h2 className="text-3xl leading-tight font-extralight tracking-tight md:text-4xl lg:text-5xl xl:text-6xl">
              We like small questions with sharp edges.
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-12 gap-8 md:gap-12">
            <RevealOnScroll
              animation="fade-up"
              className="col-span-12 md:col-span-6"
            >
              <div className="border-border/70 bg-card/55 h-full border p-8">
                <h3 className="mb-4 text-xl font-light md:text-2xl">
                  The question
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  How should a model remember detail without treating every
                  token as equally important?
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll
              animation="fade-up"
              delay={150}
              className="col-span-12 md:col-span-6"
            >
              <div className="border-primary/30 bg-primary/[0.07] h-full border p-8">
                <h3 className="mb-4 text-xl font-light md:text-2xl">
                  The habit
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Start with the mechanism, test it in a controlled setting,
                  write down what happened, then widen the question.
                </p>
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll
            animation="fade-up"
            delay={300}
            className="mt-12 md:mt-16"
          >
            <p className="text-foreground/80 mx-auto max-w-3xl text-center text-xl font-light md:text-2xl">
              That is the shape of the work: patient experiments, public notes,
              and enough detail for other people to follow the thread.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-12 items-center gap-8 md:gap-16">
            <RevealOnScroll
              animation="fade-left"
              className="col-span-12 lg:col-span-5"
            >
              <h2 className="text-3xl leading-tight font-extralight tracking-tight md:text-4xl lg:text-5xl">
                Our approach
              </h2>
              <div className="from-chart-2 to-chart-2/20 mt-6 h-1 w-20 rounded-full bg-gradient-to-r" />
            </RevealOnScroll>

            <RevealOnScroll
              animation="fade-right"
              delay={150}
              className="col-span-12 lg:col-span-6 lg:col-start-7"
            >
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="border-border/70 flex h-12 w-12 flex-shrink-0 items-center justify-center border text-lg font-light">
                    1
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-light">
                      Study Mechanisms
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Focus on small parts of model behavior that can be
                      described, tested, and improved.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="border-border/70 flex h-12 w-12 flex-shrink-0 items-center justify-center border text-lg font-light">
                    2
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-light">Write Clearly</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Pair technical work with explanations that make the idea
                      easier to inspect.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="border-border/70 flex h-12 w-12 flex-shrink-0 items-center justify-center border text-lg font-light">
                    3
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-light">
                      Build From Abuja
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Add a different vantage point to the research
                      conversation, shaped by where we work and who we work
                      around.
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <RevealOnScroll className="mx-auto max-w-3xl text-center">
            <div className="border-border/70 bg-card/55 border p-8 md:p-12">
              <Users
                className="text-foreground/60 mx-auto mb-6 h-12 w-12"
                strokeWidth={1}
              />
              <p className="text-foreground/80 text-xl leading-relaxed font-light md:text-2xl">
                &ldquo;We study mechanisms that are small enough to isolate and
                significant enough to matter.&rdquo;
              </p>
              <p className="text-muted-foreground mt-6 text-sm">The QRK Team</p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-diagonal-bg relative overflow-hidden py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <RevealOnScroll className="mx-auto max-w-2xl space-y-8 text-center">
            <h2 className="text-3xl font-extralight tracking-tight md:text-4xl lg:text-5xl">
              Reach out
            </h2>
            <p className="text-muted-foreground text-lg">
              If the research overlaps with something you are studying or
              building, send us a note.
            </p>
            <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
              <Button
                size="lg"
                className="cta-button-pulse px-8 py-6 text-base"
                asChild
              >
                <Link href="mailto:hello@qrk.ng">
                  Send a message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-base"
                asChild
              >
                <Link href="https://github.com/qrk-labs" target="_blank">
                  View Our Work
                </Link>
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
}
