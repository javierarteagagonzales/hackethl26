import { motion } from "framer-motion";
import Image from "next/image";

interface GallerySectionProps {
  t: any;
  isDark?: boolean;
}

export function GallerySection({ t, isDark }: GallerySectionProps) {
  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-surface">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-purple-500">
              {t("edition2025.gallery_title") || "Galería 2025"}
            </span>
          </h2>
          <p className="text-xl text-fg/70">
            {t("edition2025.gallery_desc") || "Revive los mejores momentos del evento. (Dimensiones recomendadas: 800x600px o ratio 4:3)"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="aspect-[4/3] bg-bg border border-border rounded-xl overflow-hidden flex items-center justify-center group relative cursor-pointer"
            >
              <Image 
                src={`/2025/fotos/foto${i}.webp`} 
                alt={`Hackathon ETH Lima 2025 Foto ${i}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a href="/2025" className="inline-flex items-center gap-2 text-brand-accent hover:text-brand-accent/80 transition-colors font-semibold">
            {t("edition2025.view_full") || "Ver Edición 2025 completa →"}
          </a>
        </div>
      </div>
    </section>
  );
}
