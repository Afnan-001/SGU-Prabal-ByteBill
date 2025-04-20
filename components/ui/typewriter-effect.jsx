"use client";

import React, { useEffect, useState } from "react";

export const TypewriterEffect = ({ words, speed = 100, loop = true }) => {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [currentClass, setCurrentClass] = useState("");

  useEffect(() => {
    const currentWordObj = words[wordIndex];
    const currentWord = currentWordObj.text;
    const className = currentWordObj.className || "";

    const timeout = setTimeout(() => {
      if (deleting) {
        setDisplayText(currentWord.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        setDisplayText(currentWord.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        setCurrentClass(className);
      }

      if (!deleting && charIndex === currentWord.length) {
        setTimeout(() => setDeleting(true), 1000);
      } else if (deleting && charIndex === 0) {
        setDeleting(false);
        setCurrentClass("");
        setWordIndex((prev) => (loop ? (prev + 1) % words.length : Math.min(prev + 1, words.length - 1)));
      }
    }, deleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, loop]);

  return (
    <span className="text-white font-semibold text-lg md:text-xl">
      <span className={currentClass}>{displayText}</span>
      <span className="animate-blink">|</span>
    </span>
  );
};