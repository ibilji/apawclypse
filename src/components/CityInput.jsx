

import React, { useState } from "react";
import "./CityInput.css";
import funFacts from "./funfacts";
import { useLanguage } from "../LanguageContext";
import LanguageSelector from "./LanguageSelector";
import translations from "../translations";

export default function CityInput({ onSubmit, loading }) {
  const [city, setCity] = useState("");
  const { language } = useLanguage();
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];

  function t(text) {
    return translations[text]?.[language] || text;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) onSubmit(city.trim());
  };

  return (
    <div>
      <LanguageSelector />
      <h1 className="head">Apawcalypse</h1>
      <form className="city-form" onSubmit={handleSubmit}>
        <h1>{t("Enter a City Name")}</h1>
        <input
          type="text"
          placeholder={t("e.g. Mumbai")}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={loading}
          required
          autoFocus
        />
        <button className="submit" type="submit" disabled={loading}>
          {loading ? t("Analysing...") : t("Analyse")}
        </button>
      </form>

      {loading && (
        <div className="loading-box">
          <img src="/earth2.png" alt="Loading..." className="spinner-img" />
          <p className="fun-fact">{randomFact}</p>
        </div>
      )}
    </div>
  );
}

