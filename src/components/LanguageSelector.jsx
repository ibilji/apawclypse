import React from "react";
import { useLanguage } from "../LanguageContext";
import "./LanguageSelector.css";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const handleChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <select value={language} onChange={handleChange} className="language-dropdown submit">
      <option value="en">English</option>
      <option value="hi">Hindi</option>
      <option value="es">Spanish</option>
      <option value="fr">French</option>
      <option value="de">German</option>
      <option value="zh">Chinese</option>
    </select>
  );
}
