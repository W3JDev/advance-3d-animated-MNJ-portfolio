import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ColorTheme {
  background: string;
  text: string;
  accent: string;
}

interface ScrollColorThemeProps {
  children: React.ReactNode;
  themes: ColorTheme[];
  className?: string;
}

export function ScrollColorTheme({ children, themes, className = '' }: ScrollColorThemeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const themeIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, themes.length - 1]
  );

  const backgroundColor = useTransform(
    themeIndex,
    themes.map((_, i) => i),
    themes.map(theme => theme.background)
  );

  const textColor = useTransform(
    themeIndex,
    themes.map((_, i) => i),
    themes.map(theme => theme.text)
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      {children}
    </motion.div>
  );
}