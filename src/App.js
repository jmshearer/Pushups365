import React from 'react';
import './App.scss';
import { ActivityCounter } from './Include/ActivityCounter.js';


function App() {
  return (
    <ActivityCounter
      id="Pushups"
      emoji="💪"
      number="DayOfYear"
      multiplier="1"
      every="DayOfYear"
    />
  );
}

export default App;
