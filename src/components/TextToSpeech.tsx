import React from 'react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

interface TextToSpeechProps {
  text: string;
}

export function TextToSpeech({ text }: TextToSpeechProps) {
  const { speak, stop, pause, resume, isPlaying, isPaused } = useTextToSpeech({
    rate: 1.6,
    pitch: 1,
    volume: 1,
    lang: 'en-US'
  });

  const handleTogglePlay = () => {
    if (isPlaying) {
      if (isPaused) {
        resume();
      } else {
        pause();
      }
    } else {
      speak(text);
    }
  };

  const handleStop = () => {
    stop();
  };

  return (
    <div className="text-to-speech">
      <button
        className={`text-to-speech__button ${isPlaying ? 'text-to-speech__button--active' : ''}`}
        onClick={handleTogglePlay}
        title={isPlaying ? (isPaused ? 'Resume' : 'Pause') : 'Read Aloud'}
      >
        {isPlaying ? (
          isPaused ? (
            <span>▶️ Resume</span>
          ) : (
            <span>⏸️ Pause</span>
          )
        ) : (
          <span>🔊 Read Aloud</span>
        )}
      </button>
      {isPlaying && (
        <button
          className="text-to-speech__button text-to-speech__button--stop"
          onClick={handleStop}
          title="Stop"
        >
          <span>⏹️ Stop</span>
        </button>
      )}
    </div>
  );
}

export default TextToSpeech;
