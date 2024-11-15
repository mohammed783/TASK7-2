import React, { useState, useEffect } from 'react';
import './Main.css'; 

const CounterComponent = () => {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('white');

  const handleIncrement = () => {
    if (count < 1000) {
      setCount(prevCount => {
        const newCount = prevCount + increment;
        checkForPopups(newCount);
        return newCount;
      });
    }
  };

  const handleDecrement = () => {
    setCount(prevCount => {
      const newCount = Math.max(prevCount - 100, 0);
      checkForPopups(newCount);
      return newCount;
    });
  };

  const checkForPopups = (newCount) => {
    if (newCount % 10 === 0) {
      setShowPopup(true);
      setBackgroundColor(newCount >= 1000 ? 'lightcoral' : 'lightblue');
    }
    if (newCount >= 10 && newCount < 100) {
      setIncrement(10);
    } else if (newCount >= 100 && newCount < 1000) {
      setIncrement(100);
    } else if (newCount >= 1000) {
      setIncrement(0);
    }
  };

  useEffect(() => {
    setShowPopup(true);
  }, []);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <div className="counter-container" style={{ backgroundColor }}>
      <h1 className="counter-title">Counter: {count}</h1>
      <button className="increment-button" onClick={handleIncrement} disabled={count >= 1000}>
        Increment
      </button>
      {count >= 1000 && (
        <button className="decrement-button" onClick={handleDecrement}>
          Decrement by 100
        </button>
      )}
      {showPopup && (
        <div className="popup">
          {count === 0 ? "Welcome to the Counter!" : Count reached : ${count}}
        </div>
      )}
    </div>
  );
};

export default CounterComponent;
