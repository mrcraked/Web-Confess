"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CrushConfession() {
  const [stage, setStage] = useState('initial');

  const handleAccept = async () => {
    try {
      const response = await fetch('http://api.noryouhost.online/accept.php', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: 'Accepted Bro good job'
        })
      });
      
      if (response.ok) {
        setStage('accepted');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeny = async () => {
    try {
      await fetch('http://api.noryouhost.online/deny.php', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: 'Fail!'
        })
      });
      
      setStage('denied');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    let timeoutId;
    if (stage === 'denied') {
      timeoutId = setTimeout(() => {
        window.location.href = 'https://www.youtube.com/watch?v=xFHNWJVsjmY';
      }, 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [stage]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <AnimatePresence>
        {stage === 'initial' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center p-8 bg-white rounded-xl shadow-lg cursor-pointer"
            onClick={() => setStage('confession')}
          >
            <h2 className="text-2xl font-bold text-gray-800">
              I want to tell you something...
            </h2>
          </motion.div>
        )}

        {stage === 'confession' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center p-8 bg-white rounded-xl shadow-lg"
          >
            <h2 className="text-3xl font-bold text-pink-600 mb-6">
              Will you be my girlfriend ? 💕
            </h2>
            
            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAccept}
                className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
              >
                Accept 💖
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDeny}
                className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
              >
                Deny 😢
              </motion.button>
            </div>
          </motion.div>
        )}

        {stage === 'accepted' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center p-8 bg-white rounded-xl shadow-lg"
          >
            <h2 className="text-3xl font-bold text-green-600 mb-6">
              Really? Don't you already deny it?
            </h2>
            <p className="text-xl text-gray-700">
             only sunday will understand you 😉
            </p>
          </motion.div>
        )}

        {stage === 'denied' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-center p-8 bg-white rounded-xl shadow-lg"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 100 100" 
                className="w-32 h-32"
              >
                <motion.path
                  d="M50 20 L20 50 L50 80 L80 50 Z"
                  fill="none"
                  stroke="red"
                  strokeWidth="5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.line
                  x1="20"
                  y1="50"
                  x2="80"
                  y2="50"
                  stroke="red"
                  strokeWidth="5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
              </motion.svg>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-3xl font-bold text-red-600 mb-4"
            >
              Ah, I already know that answer 💔
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="text-xl text-gray-700"
            >
              Redirecting to YouTube in 5 seconds...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}