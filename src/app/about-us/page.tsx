import { Code, Shield, Database, Cpu, Users, ArrowRight } from "lucide-react";
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
              text="WHO ARE WE?"
              className="text-5xl leading-[0.9] font-extralight tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
              staggerDelay={0.04}
              enableGlitch
            />

            <RevealOnScroll animation="fade-up" delay={400}>
              <p className="text-muted-foreground mt-8 max-w-2xl text-xl leading-relaxed font-light md:mt-12 md:text-2xl">
                A technology research lab from Abuja, Nigeria, building software
                that puts humans first.
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
                A small team of{" "}
                <span className="font-light italic">engineers</span>
              </h2>
              <div className="text-muted-foreground space-y-6">
                <p className="text-base leading-relaxed md:text-lg">
                  We work across web development, cybersecurity, and software
                  infrastructure. Our backgrounds cover frontend design, backend
                  systems, security tooling, and data processing.
                </p>
                <p className="text-base leading-relaxed md:text-lg">
                  Collectively, we&apos;ve built and maintained products ranging
                  from user-facing web apps to national-scale systems for
                  e-commerce and security.
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
                  { icon: Code, label: "React & TypeScript" },
                  { icon: Shield, label: "Security Systems" },
                  { icon: Database, label: "Data Pipelines" },
                  { icon: Cpu, label: "Rust & Go" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="border-border/40 bg-card/30 group hover:border-primary/30 rounded-2xl border p-6 backdrop-blur-sm transition-colors"
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
      <section className="via-destructive/[0.02] relative overflow-hidden bg-gradient-to-b from-transparent to-transparent py-24 md:py-32">
        {/* Watermark */}
        <div className="watermark text-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-extralight select-none">
          WHY
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-8">
          <RevealOnScroll className="mx-auto mb-16 max-w-4xl text-center md:mb-24">
            <h2 className="text-3xl leading-tight font-extralight tracking-tight md:text-4xl lg:text-5xl xl:text-6xl">
              Technology no longer{" "}
              <span className="text-destructive/80 font-light italic">
                helps
              </span>{" "}
              humanity
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-12 gap-8 md:gap-12">
            <RevealOnScroll
              animation="fade-up"
              className="col-span-12 md:col-span-6"
            >
              <div className="border-border/40 bg-card/30 h-full rounded-2xl border p-8 backdrop-blur-sm">
                <h3 className="mb-4 text-xl font-light md:text-2xl">
                  The Promise
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Social media enabled connecting with people across the world.
                  AI and automation have the potential to ease the lives of
                  many. Technology promised great leaps in our standard of
                  living.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll
              animation="fade-up"
              delay={150}
              className="col-span-12 md:col-span-6"
            >
              <div className="border-destructive/20 bg-destructive/[0.02] h-full rounded-2xl border p-8 backdrop-blur-sm">
                <h3 className="mb-4 text-xl font-light md:text-2xl">
                  The Reality
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Endless tracking and surveillance. Misinformation at scale.
                  Misleading AI-generated content. Algorithms optimizing for
                  engagement over wellbeing. Technology creating new risks that
                  threaten our communities.
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
              It&apos;s clear that technology alone is not enough. We need to
              bring back what we&apos;ve lost.{" "}
              <span className="italic">We need to bring back humanity.</span>
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
                  <div className="border-border/40 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border text-lg font-light">
                    1
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-light">Human-Centered</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Starting with small projects where the human is the focus.
                      How they want to use it. How it affects their lives.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="border-border/40 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border text-lg font-light">
                    2
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-light">Mutual Value</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Providing value under conditions that feel mutually
                      beneficial. Good old trade and barter. No dark patterns.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="border-border/40 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border text-lg font-light">
                    3
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-light">Collaboration</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Networking with other professionals to collaborate on
                      solutions. Building together, not in isolation.
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Honesty Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <RevealOnScroll className="mx-auto max-w-3xl text-center">
            <div className="border-border/40 bg-card/30 rounded-3xl border p-8 backdrop-blur-sm md:p-12">
              <Users
                className="text-foreground/60 mx-auto mb-6 h-12 w-12"
                strokeWidth={1}
              />
              <p className="text-foreground/80 text-xl leading-relaxed font-light md:text-2xl">
                &ldquo;Nothing is set in stone. We honestly don&apos;t know what
                we are doing, but we want to try.&rdquo;
              </p>
              <p className="text-muted-foreground mt-6 text-sm">
                — The QRK Team
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-diagonal-bg relative overflow-hidden py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <RevealOnScroll className="mx-auto max-w-2xl space-y-8 text-center">
            <h2 className="text-3xl font-extralight tracking-tight md:text-4xl lg:text-5xl">
              Want to build with us?
            </h2>
            <p className="text-muted-foreground text-lg">
              We&apos;re always looking for collaborators who share our vision
              for human-centric technology.
            </p>
            <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
              <Button
                size="lg"
                className="cta-button-pulse px-8 py-6 text-base"
                asChild
              >
                <Link href="mailto:hello@qrk.ng">
                  Get in Touch
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
