"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './FooterAvatar.module.css';

export default function FooterAvatar() {
    const [eyesOpen, setEyesOpen] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setEyesOpen((prev) => !prev);
        }, 3000); // Blink every 3 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.avatarContainer}>
            <div className={styles.avatarImage}>
                <Image
                    src={eyesOpen ? '/normal.png' : '/closed.png'}
                    alt="AI Avatar"
                    width={150}
                    height={150}
                />
            </div>
            <div className={styles.dialogBox}>Hello there!</div>
        </div>
    );
}