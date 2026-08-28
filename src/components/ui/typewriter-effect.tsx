"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursorClassName?: string;
  onComplete?: () => void;
}

export function TypewriterText({
  text,
  speed = 40,
  delay = 200,
  className = "",
  cursorClassName = "text-zinc-200",
  onComplete,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const timeoutId = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;

      intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setIsTyping(false);
          if (onComplete) onComplete();
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {isTyping && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.7 }}
          className={`inline-block ml-0.5 font-bold ${cursorClassName}`}
        >
          |
        </motion.span>
      )}
    </span>
  );
}
