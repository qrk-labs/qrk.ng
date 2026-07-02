import Link from "next/link";
import { ArrowRight, Mail, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "./RevealOnScroll";

export function CTASection() {
  return (
    <section className="cta-diagonal-bg relative overflow-hidden py-24 md:py-32">
      <div className="bg-border/70 absolute inset-x-0 top-0 h-px" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-12 gap-8 md:gap-12">
          <RevealOnScroll className="col-span-12 lg:col-span-7">
            <p className="text-primary mb-5 text-xs font-medium tracking-[0.24em] uppercase">
              Correspond
            </p>
            <h2 className="max-w-4xl text-3xl leading-[1.04] font-extralight tracking-tight md:text-5xl lg:text-6xl">
              Working on similar questions? We are open to correspondence.
            </h2>
          </RevealOnScroll>

          <RevealOnScroll
            animation="fade-right"
            delay={150}
            className="col-span-12 lg:col-span-5"
          >
            <div className="border-border/70 bg-card/75 border p-5 md:p-6">
              <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                We welcome correspondence from researchers and engineers working
                on representation, retrieval, tokenization, or model
                infrastructure.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Button size="lg" className="h-12 px-6 text-base" asChild>
                  <Link href="mailto:hello@qrk.ng">
                    <Mail className="h-4 w-4" />
                    Send a message
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary/30 bg-background/60 h-12 px-6 text-base"
                  asChild
                >
                  <Link href="/research">
                    <ScrollText className="h-4 w-4" />
                    Research archive
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
