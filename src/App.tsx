import { useState , useEffect, useRef } from 'react';
import { useLocalStorage } from 'react-use';
import './App.css';

import type {Flag} from './types.ts';
import {retrieveFlags} from './services/flagService.ts';

import LoadingSpinner from './components/ui/LoadingSpinner';
import ScrollIntoViewOnKeyboard from './components/ui/ScrollIntoViewOnKeyboard.tsx';
import StartScreen from './components/StartScreen.tsx';
import FinalScoreScreen from './components/FinalScoreScreen.tsx';
import FlagGuessingContainer from './components/FlagGussing/FlagGuessingContainer.tsx';
import InfoWindowContainer from './components/InfoWindow/InfoWindowContainer.tsx';


function App() {

  const [step, setStep] = useState<"loading"|"start"|"guess"|"showScore">("loading");
  const [flags, setFlags] = useState<Flag[]|null>(null);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useLocalStorage<number>("highScore", 0);

  const quizContainerRef = useRef<HTMLDivElement>(null);

  
  // Load the flag data when starting the app:
  useEffect(() => {
    const loadFlags = async () => {
      try {
        const newFlags = await retrieveFlags();
        setFlags(newFlags);
        setStep("start");
      } catch(error) {
        console.error("Error loading flags:", error);
      }
    };
    loadFlags();
  }, [])

  // When starting a game: Shuffle flags and go to next step:
  const handleStartGuessing = () => {
    // Shuffle all flags using Fisher–Yates:
    setFlags((flags) => {
      if (flags !== null){
        const copiedFlags = [...flags];
        for (let i = copiedFlags.length - 1; i > 0; i--) { // iterate through all elements back to front
          const j = Math.floor(Math.random() * (i + 1)); // randomly choose other unshuffled index j
          [copiedFlags[i], copiedFlags[j]] = [copiedFlags[j], copiedFlags[i]]; // swap
        }
        return copiedFlags;
      }
      return null;
    });

    setStep("guess");
  };

  // After a game: Update high score and go to next step:
  const handleEndGuessing = () => {
    if (!highScore || score > highScore) setHighScore(score);
    setStep("showScore");
  };

  return (
    <>
    <ScrollIntoViewOnKeyboard targetRef={quizContainerRef} />
    <InfoWindowContainer />
    <div id="quizContainer" ref={quizContainerRef}>
      {step == "loading" && (
        <p><LoadingSpinner /><br/>loading...</p>
      )}
      {step == "start" && (
        <StartScreen onStart={handleStartGuessing}/>
      )}
      {step == "guess" && (
        <FlagGuessingContainer scoreState={[score, setScore]} flags={flags} onEndGuessing={handleEndGuessing} />
      )}
      {step == "showScore" && (
        <FinalScoreScreen finalScore={score} highScore={highScore} onStart={handleStartGuessing}/>
      )}
    </div>
    </>
    
  );
}

export default App;
