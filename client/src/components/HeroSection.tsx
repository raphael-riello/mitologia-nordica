import { motion } from "framer-motion";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  image: string;
  compact?: boolean;
  children?: React.ReactNode;
}

export default function HeroSection({ title, subtitle, image, compact = false, children }: HeroSectionProps) {
  return (
    <section className={`relative overflow-hidden ${compact ? "h-[280px] md:h-[340px]" : "h-[480px] md:h-[560px]"}`}>
      <div className="absolute inset-0">
        <img src={image} alt="" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />
      </div>
      <div className="relative h-full container flex flex-col justify-end pb-10 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground text-gold-glow mb-3">
            {title}
          </h1>
          {subtitle && (
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  );
}
