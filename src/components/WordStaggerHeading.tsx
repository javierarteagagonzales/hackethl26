"use client";

import { motion, cubicBezier } from "framer-motion";

interface WordStaggerHeadingProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  delay?: number;
  staggerDuration?: number;
}

const customEase = cubicBezier(0.22, 1, 0.36, 1);

const wordVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: customEase,
    },
  },
};

export function WordStaggerHeading({
  children,
  className = "",
  as = "h2",
  delay = 0,
  staggerDuration = 0.05,
}: WordStaggerHeadingProps) {
  const words = children.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDuration,
        delayChildren: delay,
      },
    },
  };

  const headingContent = (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      {words.map((w, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mr-[0.25em]"
        >
          {w}
        </motion.span>
      ))}
    </motion.div>
  );

  // Return appropriate semantic heading element
  if (as === "h1") return <h1 className={className}>{headingContent}</h1>;
  if (as === "h3") return <h3 className={className}>{headingContent}</h3>;
  if (as === "h4") return <h4 className={className}>{headingContent}</h4>;
  if (as === "h5") return <h5 className={className}>{headingContent}</h5>;
  if (as === "h6") return <h6 className={className}>{headingContent}</h6>;

  return <h2 className={className}>{headingContent}</h2>;
}
