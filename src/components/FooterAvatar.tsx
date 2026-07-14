"use client";

import React, { useState, useEffect } from 'react';
import styles from './FooterAvatar.module.css';

const MESSAGES = [
  "Hello there! You wanna know about Roshan?",
  "I know a guy who knows a guy and he knows Roshan"
];

export default function FooterAvatar() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [eyesOpen, setEyesOpen] = useState(true);

  // Blinking animation
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    let openTimeout: NodeJS.Timeout;

    const triggerBlink = () => {
      // Random interval between 3 and 6 seconds
      const nextBlinkIn = Math.random() * (6000 - 3000) + 3000;

      blinkTimeout = setTimeout(() => {
        // Close eyes
        setEyesOpen(false);

        // Keep closed for 120-150ms
        const closedDuration = Math.random() * (150 - 120) + 120;
        openTimeout = setTimeout(() => {
          // Open eyes
          setEyesOpen(true);
          // Schedule next blink
          triggerBlink();
        }, closedDuration);

      }, nextBlinkIn);
    };

    triggerBlink();

    return () => {
      clearTimeout(blinkTimeout);
      clearTimeout(openTimeout);
    };
  }, []);

  // Dialogue typing animation
  useEffect(() => {
    const currentMessage = MESSAGES[currentMessageIndex];
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex <= currentMessage.length) {
        setDisplayedText(currentMessage.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    const messageTimer = setTimeout(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % MESSAGES.length);
      setDisplayedText('');
    }, 6000);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(messageTimer);
    };
  }, [currentMessageIndex]);

  return (
    <div className={styles.pikaContainer}>
      <div className={styles.pikaImage}>
        <img
          src={eyesOpen ? "/character_eyes_open.png" : "/character_eyes_closed.png"}
          alt="Chatbot Avatar"
          width={120}
          height={120}
          className={styles.pikaImg}
        />
      </div>
      <div className={styles.dialogBox}>
        <div className={styles.dialogPointer}></div>
        <div className={styles.dialogText}>{displayedText}</div>
      </div>
    </div>
  );
}