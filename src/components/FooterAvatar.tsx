"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './FooterAvatar.module.css';

const MESSAGES = [
  "Hello there! You wanna know about Roshan?",
  "I know a guy who knows a guy and he knows Roshan"
];

export default function FooterAvatar() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const currentMessage = MESSAGES[currentMessageIndex];
    let charIndex = 0;

    // Start typing immediately when message changes
    const typingInterval = setInterval(() => {
      if (charIndex <= currentMessage.length) {
        setDisplayedText(currentMessage.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50); // Typing speed

    // Change message after display time
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
        <Image
          src="/imagebot.jpg"
          alt="Pika AI Avatar"
          width={120}
          height={120}
          className={styles.pikaImg}
          priority
        />
      </div>
      <div className={styles.dialogBox}>
        <div className={styles.dialogPointer}></div>
        <div className={styles.dialogText}>{displayedText}</div>
      </div>
    </div>
  );
}