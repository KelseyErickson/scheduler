import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);

    if (replace) {
      const copyForReplace = [...history];
      copyForReplace[copyForReplace.length - 1] = newMode;
      setHistory(copyForReplace);
      
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  };

  const back = () => {
    if (history.length <= 1) {
      return;
    }

    const copyHistory = [...history];
    copyHistory.pop();
    setHistory(copyHistory);
    setMode(copyHistory[copyHistory.length - 1]);
  };

  return { mode, transition, back };
}
