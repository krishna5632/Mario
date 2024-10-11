"use client"
import React, { useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import styles from '../Mario-Page/mario.module.css';  

function Mariopages() {
  useEffect(() => {
  
    
    gsap.fromTo(`.${styles.marioman}`,
      { y:40 }, 
      { 
        y: 0, 
       
        duration: 0.75,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      }
    );

    gsap.fromTo(`.${styles.turtle}`,
      { x: 50 },
      { 
        x: 0, 
       
        duration: 0.75,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      }
    );
    gsap.fromTo(`.${styles.UP}`,
      { x:10,y:-100 },
      { 
        x: 60, 
        y:-200,
        scale: 1.5,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power3.inOut"
      }
    );

  }, []);

  return (
    <div className="Main-container relative h-screen w-731px bg-black">
      <div className="absolute bottom-0 right-0 mr-0 mb-0">
        <Image src="/mario-removebg-preview.png" width={800} height={500} alt="mario background" />
        <div>
          <div className={`${styles.marioMan} max-w-max w-auto absolute`}>
            <Image src="/marioman-removebg-preview.png" width={60} height={60} alt="marioman" className={styles.marioman} />
            <Image src="/turtle-removebg-preview (1).png" width={50} height={45} alt="turtle" className={styles.turtle} />
            <Image src="/1up-removebg-preview.png" width={50} height={50} alt="UP" className={styles.UP} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mariopages;
