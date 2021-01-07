import React, { useState, useEffect } from "react";

const ScoreBar = ({ value = 0 }) => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    let sc = 50 + value / 12;
    sc = sc < 0.5 ? 0.5 : sc;
    sc = sc > 99.5 ? 99.5 : sc;
    setScore(sc);
  }, [value, setScore]);

  return (
    <div className="score-bar-container">
      <div className="score-bar">
        <div
          className="score-bar-count"
          style={{
            height: `${score}%`,
          }}
        />
      </div>
      <div className="score-bar-zero" />
    </div>
  );
};

export default ScoreBar;
