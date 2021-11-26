import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Function will take in a newMode and a boolean. Will set state depending on the boolean (replace)
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    // If replace is true overwrite previous item in  history array with newMode otherwise add the mode to the array
    if (replace) {
      const copyForReplace = [...history];
      copyForReplace[copyForReplace.length - 1] = newMode;
      setHistory(copyForReplace);
    } else {
      setHistory((prev) => [...prev, mode]);
    }
  };
  // Function to go back to previous mode
  const back = () => {
    if (history.length <= 1) {
      return;
    }
    // Pop item off a copy of history, update history and update mode with last item in history array
    const copyHistory = [...history];
    copyHistory.pop();
    setHistory(copyHistory);
    setMode(copyHistory[copyHistory.length - 1]);
  };

  return { mode, transition, back };
};