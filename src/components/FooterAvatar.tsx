"use client";

import React, { useState, useEffect } from 'react';
import styles from './FooterAvatar.module.css';

export default function FooterAvatar() {
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

  return (
    <div className={styles.pikaContainer}>
      <div className={styles.pikaImage}>
        <img
          src={eyesOpen ? "/character_eyes_open.png" : "/character_eyes_closed.png"}
          alt="Chatbot Avatar"
          className={styles.pikaImg}
        />
      </div>
    </div>
  );
}