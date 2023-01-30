import React from "react";
import style from "./load.module.css";

export default function Load() {
  return (
    <div className={style.loadingContainer}>
      <img
        src="https://media.giphy.com/media/DKkcZVDYkS6KDa6WDK/giphy.gif"
        alt="loading"
      />
      <p></p>
    </div>
  );
}
