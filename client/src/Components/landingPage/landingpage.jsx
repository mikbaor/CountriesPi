import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./Landingpage.module.css";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <h1>WORLD COUNTRIES</h1>
      <button onClick={() => navigate("/home")}>LETS GO</button>
    </div>
  );
}