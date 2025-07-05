import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [text, setText] = useState('');
  const fullText = 'APAWCALYPSE\nARE WE DOOMED?';
  const navigate = useNavigate();

  // Typing animation
  useEffect(() => {
    setText('');
    let i = 0;

    const typing = setInterval(() => {
      if (i <= fullText.length) {
        setText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 80);

    return () => clearInterval(typing);
  }, []);

  // Background music play
  useEffect(() => {
    const bgm = document.getElementById('bgm-audio');
    if (bgm) {
      bgm.volume = 0.5;
      bgm.play().catch(() => {});
    }
  }, []);

  const handleClick = () => {
    navigate('/city'); // Navigate to city input page
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        backgroundColor: '#111',
        color: 'white',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '40px',
      }}
    >
      {/* 🔊 BGM */}
      <audio id="bgm-audio" src="/sounds/bgm.mp3" loop preload="auto" />

      {/* Header */}
      <div>
        <h4 style={{ fontFamily: 'monospace', letterSpacing: '2px' }}>
          THE BYTE CLUB
        </h4>
      </div>

      {/* Title */}
      <div>
        <h1
          style={{
            fontSize: '3.5rem',
            fontWeight: 'lighter',
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace',
          }}
        >
          {text}
        </h1>
      </div>

      {/* Glowing Button */}
      <div style={{ textAlign: 'right', marginBottom: '100px' }}>
        <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
          }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: 'easeInOut',
          }}
          onClick={handleClick}
          style={{
            background: 'transparent',
            color: 'white',
            border: '1px solid white',
            padding: '10px 20px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontFamily: 'monospace',
            letterSpacing: '1px',
          }}
        >
          FIND OUT!
        </motion.button>
      </div>
    </motion.div>
  );
};

export default HomePage;
