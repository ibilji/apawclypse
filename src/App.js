import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import CatScene from './components/CatScene';
import RipScene from './components/RipScene';
import HomePage from './components/HomePage';
import CityInput from './components/CityInput';
import Result from './components/Result';

function App() {
  const [step, setStep] = useState(0);
  const [resultData, setResultData] = useState(null);
  const navigate = useNavigate();

  const handleCatSceneComplete = () => setStep(1);
  const handleRipSceneComplete = () => setStep(2);

  const handleCitySubmit = async (city) => {
    try {
      const res = await fetch('http://localhost:5000/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city }),
      });
      const data = await res.json();
      setResultData(data);
      navigate('/result');
    } catch (error) {
      alert('Failed to fetch city data.');
    }
  };

  const handleBack = () => {
    setResultData(null);
    navigate('/city');
  };

  return (
    <Routes>
      {step === 0 && (
        <Route path="*" element={<CatScene onComplete={handleCatSceneComplete} />} />
      )}
      {step === 1 && (
        <Route path="*" element={<RipScene onComplete={handleRipSceneComplete} />} />
      )}
      {step === 2 && (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/city" element={<CityInput onSubmit={handleCitySubmit} />} />
          <Route path="/result" element={<Result data={resultData} onBack={handleBack} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
