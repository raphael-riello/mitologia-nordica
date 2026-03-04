import { Link } from "wouter";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-4"
      >
        <span className="text-8xl block mb-6 text-gold/30">ᚱ</span>
        <h1 className="font-display text-5xl md:text-7xl text-foreground mb-2">404</h1>
        <p className="font-display text-lg text-gold uppercase tracking-widest mb-4">
          Perdido nos Nove Mundos
        </p>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          A página que você procura não foi encontrada. Talvez tenha sido levada por Loki,
          ou perdida nas brumas de Niflheim.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-gold text-black font-display text-xs uppercase tracking-widest hover:bg-gold-dark transition-colors"
        >
          Voltar ao Início
        </Link>
      </motion.div>
    </div>
  );
}
