import React from "react";
import "./Result.css";
import { useLanguage } from "../LanguageContext";
import LanguageSelector from "./LanguageSelector";
import translations from "../translations";

export default function Result({ data, onBack }) {
  const { language } = useLanguage();

  function t(text) {
    return translations[text]?.[language] || text;
  }

  // ✅ Prevent crash when data is null/undefined
  if (!data) {
    return (
      <div className="result-container">
        <LanguageSelector />
        <h2>{t("Loading or No data found")}</h2>
        <button className="submit try" onClick={onBack}>
          {t("Try Another City")}
        </button>
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="result-container error">
        <LanguageSelector />
        <h2>
          {t("Error: City not found")} :( <br /> {t("But here's a cute cat :)")}
        </h2>
        <img src={data.cat} alt="Cute cat fallback" className="cat-image" />
        <button className="submit try" onClick={onBack}>
          {t("Try Another City")}
        </button>
      </div>
    );
  }

  const { city, country, weather, air_quality, covid, threat } = data;
  const levelClass = threat?.level?.toLowerCase?.() || "";

  function handleSpeak() {
    const synth = window.speechSynthesis;
    synth.cancel(); // Stop any previous speech

    const text = `
      ${t("Threat Report for")} ${city}, ${country}.
      ${t("Weather")}: ${weather.temperature} degrees Celsius, feels like ${weather.feels_like}.
      ${t("Condition")}: ${weather.condition}. ${t("Humidity")}: ${weather.humidity} percent.
      ${t("Air Quality")}: AQI ${air_quality.aqi}, ${t("Main Pollutant")}: ${air_quality.main_pollutant}.
      ${t("COVID Stats")}: ${t("Active Cases")}: ${covid.active}, ${t("New Cases Today")}: ${covid.cases}, ${t("Deaths Today")}: ${covid.deaths}, ${t("Critical Cases")}: ${covid.critical}, ${t("Total Cases")}: ${covid.total}.
      ${t("Threat Level")}: ${threat.level}, score: ${threat.score}.
      ${t("Tips")}: ${threat.tips.join(". ")}
    `;

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = language === "en" ? "en-US" : "hi-IN"; // Extend if more languages added
    utter.rate = 1;
    synth.speak(utter);
  }

  return (
    <div className={`result-container ${levelClass}`}>
      <LanguageSelector />
      <button className="back-btn submit" onClick={onBack}>
        ← {t("Back")}
      </button>
      <div className="heading-row">
        <h1>
          {t("Threat Report for")} {city}, {country}
        </h1>
        <button className="tts-button" onClick={handleSpeak}>
          🔊 {t("Read Aloud")}
        </button>
      </div>

      <section className="info-cards">
        <div className="card">
          <h3>{t("Weather")}</h3>
          <p>{t("Temperature")}: {weather.temperature}°C</p>
          <p>{t("Feels Like")}: {weather.feels_like}°C</p>
          <p>{t("Condition")}: {weather.condition}</p>
          <p>{t("Humidity")}: {weather.humidity}%</p>
        </div>

        <div className="card">
          <h3>{t("Air Quality")}</h3>
          <p>AQI: {air_quality.aqi}</p>
          <p>{t("Main Pollutant")}: {air_quality.main_pollutant}</p>
        </div>

        <div className="card cov">
          <h3>{t("COVID Stats")}</h3>
          <p>{t("Active Cases")}: {covid.active.toLocaleString()}</p>
          <p>{t("New Cases Today")}: {covid.cases.toLocaleString()}</p>
          <p>{t("Deaths Today")}: {covid.deaths.toLocaleString()}</p>
          <p>{t("Critical Cases")}: {covid.critical.toLocaleString()}</p>
          <p>{t("Total Cases")}: {covid.total.toLocaleString()}</p>
        </div>
      </section>

      <section className={`threat-level cov ${levelClass}`}>
        <h2>
          {t("Threat Level")}: {threat.level} ({threat.score})
        </h2>
        <ul className="tips-list">
          {threat.tips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
