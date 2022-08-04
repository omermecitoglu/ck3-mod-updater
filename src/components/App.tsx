import React, { useEffect, useState } from "react";

export default function App() {
  const [tick, setTick] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (tick === 100) {
        setTick(0);
      } else {
        setTick(tick + 1);
      }
    }, 100);
  
    return () => {
      clearTimeout(timer);
    }
  }, [tick, setTick]);
  
  return (
    <div>
      <progress value={tick} max="100">70 %</progress>
    </div>
  )
}
