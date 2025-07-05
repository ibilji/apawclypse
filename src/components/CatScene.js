import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import cat from '../assets/cat.png';
import explosion from '../assets/explosion.png';

const CatScene = ({ onComplete }) => {
  const [showExplosion, setShowExplosion] = useState(false);
  const [showWhiteFlash, setShowWhiteFlash] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [showLifeLost, setShowLifeLost] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleInteraction = () => {
      setUserInteracted(true);
      window.removeEventListener('click', handleInteraction);
    };
    window.addEventListener('click', handleInteraction);
    return () => window.removeEventListener('click', handleInteraction);
  }, []);

  useEffect(() => {
    if (!userInteracted) return;

    const meowAudio = document.getElementById('meow-audio');
    if (meowAudio) {
      meowAudio.currentTime = 0;
      meowAudio.volume = 0.8;
      meowAudio.play();
    }

    const crashTimer = setTimeout(() => {
      setShowExplosion(true);
      setShowWhiteFlash(true);
      setShowLifeLost(true);

      controls.start({
        x: [0, -10, 10, -8, 8, -5, 5, -2, 2, 0],
        transition: { duration: 1.2 },
      });

      const boomAudio = document.getElementById('boom-audio');
      if (boomAudio) {
        boomAudio.currentTime = 0;
        boomAudio.volume = 0;
        boomAudio.play();

        let vol = 0;
        const fade = setInterval(() => {
          if (vol < 1) {
            vol += 0.05;
            boomAudio.volume = Math.min(vol, 1);
          } else {
            clearInterval(fade);
          }
        }, 100);
      }

      setTimeout(() => setShowWhiteFlash(false), 800);
    }, 4000);

    setTimeout(() => setShowLifeLost(false), 5000);
    setTimeout(() => setFadeOut(true), 5200);
    setTimeout(() => onComplete(), 6000);

    return () => {
      clearTimeout(crashTimer);
    };
  }, [userInteracted, onComplete, controls]);

  const stars = Array.from({ length: 60 }, (_, i) => (
    <div
      key={i}
      style={{
        position: 'absolute',
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: '2px',
        height: '2px',
        backgroundColor: 'white',
        borderRadius: '50%',
        opacity: 0.6,
      }}
    />
  ));

  const smoke = Array.from({ length: 10 }, (_, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0.6, y: 0 }}
      animate={{ opacity: 0, y: -50 }}
      transition={{ duration: 2, delay: i * 0.1 }}
      style={{
        width: '15px',
        height: '15px',
        backgroundColor: '#ccc',
        borderRadius: '50%',
        position: 'absolute',
        left: `${25 + Math.random() * 10}%`,
        bottom: '80px',
        zIndex: 5,
        filter: 'blur(4px)',
        opacity: 0.3,
      }}
    />
  ));

  if (!userInteracted) {
    return (
      <div
        style={{
          background: '#000',
          height: '100vh',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.5rem',
        }}
      >
        Click anywhere to start!
      </div>
    );
  }

  return (
    <motion.div
      animate={controls}
      style={{
        background: '#000',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        transition: 'opacity 1.5s ease',
        opacity: fadeOut ? 0 : 1,
      }}
    >
      <audio id="boom-audio" src="/sounds/boom.mp3" preload="auto" />
      <audio id="meow-audio" src="/sounds/meow.mp3" preload="auto" />

      {stars}

      <motion.img
        src={cat}
        alt="Cat"
        initial={{ x: '-30%' }}
        animate={{ x: '40%' }}
        transition={{ duration: 3, ease: 'linear' }}
        style={{
          position: 'absolute',
          bottom: '40px',
          height: '230px',
          zIndex: 2,
        }}
      />

      {/* ☄️ Meteor (NO trail) */}
      <motion.div
        initial={{ y: -100, scale: 0.8 }}
        animate={{ y: 520, scale: 1.1 }}
        transition={{ duration: 2.5, delay: 1.5 }}
        style={{
          position: 'absolute',
          top: 0,
          left: '30%',
          zIndex: 3,
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: '#444',
          boxShadow: '0 0 20px 10px #ccc',
        }}
      />

      {showExplosion && (
        <motion.img
          src={explosion}
          alt="Explosion"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.8, opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'absolute',
            bottom: '50px',
            left: '20%',
            height: '220px',
            zIndex: 4,
            pointerEvents: 'none',
          }}
        />
      )}

      {showExplosion && smoke}

      {showWhiteFlash && (
        <motion.div
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            width: '100%',
            height: '100%',
            zIndex: 6,
            pointerEvents: 'none',
          }}
        />
      )}

      {showLifeLost && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute',
            top: '40%',
            width: '100%',
            textAlign: 'center',
            fontSize: '3rem',
            color: 'white',
            zIndex: 10,
            fontFamily: 'monospace',
            pointerEvents: 'none',
          }}
        >
          1 Life Lost
        </motion.div>
      )}
    </motion.div>
  );
};

export default CatScene;
