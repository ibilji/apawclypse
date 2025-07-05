import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import rip from '../assets/rip.png';
import ghostcat from '../assets/ghostcat.png';

const RipScene = ({ onComplete }) => {
  const [showGhost, setShowGhost] = useState(false);
  const [fadeToBlack, setFadeToBlack] = useState(false);

  useEffect(() => {
    const ghostTimer = setTimeout(() => setShowGhost(true), 3000);
    const fadeTimer = setTimeout(() => setFadeToBlack(true), 7000);
    const endTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 8500);

    return () => {
      clearTimeout(ghostTimer);
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        backgroundColor: '#000',
        height: '100vh',
        color: '#fff',
        fontFamily: 'monospace',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 🧠 8 Lives Left Text */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute',
          top: '110px',
          fontSize: '2.2rem',
          zIndex: 3,
        }}
      >
        8 Lives Left
      </motion.div>

      {/* 🪦 RIP Tomb */}
      <motion.img
        src={rip}
        alt="RIP"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          width: '450px',
          zIndex: 2,
        }}
      />

      {/* 👻 Ghost Cat Floating */}
      {showGhost && (
        <motion.img
          src={ghostcat}
          alt="Ghost Cat"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -220 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          style={{
            width: '180px',
            position: 'absolute',
            bottom: '140px',
            zIndex: 1,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.6))',
          }}
        />
      )}

      {/* 🕳️ Faster Fade-to-Black Overlay */}
      <AnimatePresence>
        {fadeToBlack && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }} 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#000',
              zIndex: 10,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default RipScene;
