import { RevealOnScroll } from "./RevealOnScroll";

const principles = [
  "Start with small questions that can be tested clearly.",
  "Publish the reasoning, not just the result.",
  "Build from Abuja with a global research conversation in mind.",
];

export function MissionSection() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div className="bg-border/70 absolute top-10 left-1/2 -z-10 h-px w-screen -translate-x-1/2" />
      <div className="bg-border/70 absolute bottom-10 left-1/2 -z-10 h-px w-screen -translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-12 gap-8 md:gap-14">
          <RevealOnScroll
            animation="fade-left"
            className="col-span-12 lg:col-span-5"
          >
            <p className="text-primary mb-5 text-xs font-medium tracking-[0.24em] uppercase">
              Mission
            </p>
            <h2 className="text-3xl leading-[1.05] font-extralight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              We work on the parts of intelligence that are easy to overlook.
            </h2>
          </RevealOnScroll>

          <RevealOnScroll
            animation="fade-right"
            delay={120}
            className="col-span-12 lg:col-span-6 lg:col-start-7"
          >
            <div className="space-y-7">
              <p className="text-muted-foreground text-lg leading-relaxed md:text-xl">
                QRK is a small AI research lab in Abuja. We are interested in
                representation, retrieval, and the practical details that shape
                how models behave.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                Our current work includes DABE, a learned
                tokenizer-autoencoder, alongside notes on thought injection and
                model memory.
              </p>
            </div>
          </RevealOnScroll>
        </div>

        <div className="mt-16 grid gap-3 md:mt-24 md:grid-cols-3">
          {principles.map((principle, index) => (
            <RevealOnScroll key={principle} delay={index * 100}>
              <div className="border-border/70 bg-card/55 h-full border p-5 md:p-6">
                <span className="text-primary text-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-foreground/[0.84] mt-5 text-base leading-relaxed">
                  {principle}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
