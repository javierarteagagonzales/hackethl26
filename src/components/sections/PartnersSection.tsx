"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Partner {
  name: string;
  logo: string;
  ext: string;
  /** "cover" = imagen llena la caja, "dark" = object-contain con fondo negro */
  display?: "cover" | "dark";
}

const ECOSYSTEM: Partner[] = [{ name: "Q3 Labs", logo: "q3labs", ext: "svg" }];

const MEDIA: Partner[] = [
  { name: "Mercurio Legacy", logo: "mercurio-legacy", ext: "svg", display: "cover" },
  { name: "Cryptomorfosis", logo: "cryptomorfosis", ext: "png", display: "cover" },
];

const COMMUNITY: Partner[] = [
  { name: "ETH Bolivia", logo: "ethbolivia", ext: "png" },
  { name: "ETH Ecuador", logo: "eth-ecuador", ext: "png" },
  { name: "W3G", logo: "w3g", ext: "png" },
  { name: "Startups Perú", logo: "StartupsPeru", ext: "png" },
  { name: "Zaja Labs", logo: "zajalabs", ext: "png" },
];

const ALLIED: Partner[] = [
  { name: "Patronato", logo: "patronato", ext: "png" },
  { name: "Rust Perú", logo: "rust-peru", ext: "png" },
  { name: "Blockchain UPC", logo: "blobkchain-upc", ext: "jpeg", display: "dark" },
];

/** Logo cubre toda la caja (mercurio, cryptomorfosis) */
function CoverCard({ partner }: { partner: Partner }) {
  return (
    <motion.div
      title={partner.name}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-44 h-28 rounded-2xl border border-white/10 overflow-hidden shadow-sm hover:shadow-xl hover:border-white/20 transition-all duration-300 cursor-default relative"
    >
      <Image
        src={`/assets/pa/${partner.logo}.${partner.ext}`}
        alt={partner.name}
        fill
        className="object-cover"
        sizes="176px"
      />
    </motion.div>
  );
}

/** Logo con fondo negro, imagen contenida a la altura de la caja (blockchain-upc) */
function DarkCard({ partner }: { partner: Partner }) {
  return (
    <motion.div
      title={partner.name}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="h-20 px-6 rounded-2xl border border-white/10 overflow-hidden shadow-sm hover:shadow-xl hover:border-white/20 transition-all duration-300 cursor-default bg-black flex items-center justify-center relative"
    >
      <Image
        src={`/assets/pa/${partner.logo}.${partner.ext}`}
        alt={partner.name}
        width={160}
        height={64}
        className="h-full w-auto object-contain py-2"
        sizes="160px"
      />
    </motion.div>
  );
}

/** Logo transparente sobre fondo blanco (mayoría) */
function LogoCard({ partner, imgSize = "h-14" }: { partner: Partner; imgSize?: string }) {
  return (
    <motion.div
      title={partner.name}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.08, y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex items-center justify-center rounded-2xl border border-white/15 bg-white/90 hover:bg-white hover:border-white/30 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300 cursor-default p-4"
    >
      <Image
        src={`/assets/pa/${partner.logo}.${partner.ext}`}
        alt={partner.name}
        width={120}
        height={80}
        className={`${imgSize} w-auto object-contain transition-transform duration-300 hover:scale-105`}
        sizes="120px"
      />
    </motion.div>
  );
}

function PartnerCardRouter({ partner, imgSize = "h-14" }: { partner: Partner; imgSize?: string }) {
  if (partner.display === "cover") return <CoverCard partner={partner} />;
  if (partner.display === "dark") return <DarkCard partner={partner} />;
  return <LogoCard partner={partner} imgSize={imgSize} />;
}

function Block({
  label,
  accent,
  border,
  bg,
  children,
}: {
  label: string;
  accent: string;
  border: string;
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`rounded-3xl border ${border} ${bg} p-6 md:p-8`}
    >
      <p
        className={`font-mono text-[10px] uppercase tracking-[0.22em] ${accent} mb-6 flex items-center gap-2`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse inline-block" />
        {label}
      </p>
      {children}
    </motion.div>
  );
}

export function PartnersSection({ t }: { t: (key: string) => string }) {
  return (
    <section id="partners" className="py-24 border-t border-border relative z-10">
      <div className="absolute top-0 left-6 md:left-12 lg:left-16 h-12 w-[1px] bg-gradient-to-b from-transparent to-cyan/40 hidden md:block" />

      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-cyan/20 bg-cyan/5 backdrop-blur-sm shrink-0">
              <div className="w-3 h-3 rounded-full bg-cyan animate-pulse" />
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              {t("partners.title")}{" "}
              <span className="text-gradient-sunset font-extrabold">{t("partners.accent")}</span>
            </h2>
          </div>
          <p className="text-fg/60 text-lg max-w-2xl mx-auto font-light">
            {t("partners.description")}
          </p>
        </div>

        {/* PARTNERS */}
        <div className="space-y-5 mb-5">
          {/* Ecosystem */}
          <Block
            label={t("partners.ecosystem")}
            accent="text-coral"
            border="border-coral/25"
            bg="bg-gradient-to-r from-coral/8 via-surface/5 to-orange/5"
          >
            <div className="flex justify-center">
              <PartnerCardRouter partner={ECOSYSTEM[0]} imgSize="h-20" />
            </div>
          </Block>

          {/* Media */}
          <Block
            label={t("partners.media")}
            accent="text-cyan/80"
            border="border-cyan/20"
            bg="bg-gradient-to-r from-cyan/6 via-surface/5 to-teal/4"
          >
            <div className="flex flex-wrap justify-center gap-4">
              {MEDIA.map((p) => (
                <PartnerCardRouter key={p.name} partner={p} imgSize="h-14" />
              ))}
            </div>
          </Block>

          {/* Community */}
          <Block
            label={t("partners.community")}
            accent="text-teal/80"
            border="border-teal/20"
            bg="bg-gradient-to-r from-teal/6 via-surface/5 to-cyan/4"
          >
            <div className="flex flex-wrap justify-center gap-4">
              {COMMUNITY.map((p) => (
                <PartnerCardRouter key={p.name} partner={p} imgSize="h-12" />
              ))}
            </div>
          </Block>
        </div>

        {/* ALIADOS */}
        <Block
          label={t("partners.allied_label")}
          accent="text-orange/80"
          border="border-orange/20"
          bg="bg-gradient-to-r from-orange/6 via-surface/5 to-surface/5"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {ALLIED.map((p) => (
              <PartnerCardRouter key={p.name} partner={p} imgSize="h-12" />
            ))}
          </div>
        </Block>
      </div>
    </section>
  );
}
