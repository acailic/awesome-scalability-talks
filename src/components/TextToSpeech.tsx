import React, { useState, useEffect } from 'react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

interface TextToSpeechProps {
  text: string;
}

export function TextToSpeech({ text }: TextToSpeechProps) {
  const [speed, setSpeed] = useState(1.5);
  const [pitch, setPitch] = useState(0.9);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');

  const { speak, stop, pause, resume, isPlaying, isPaused } = useTextToSpeech({
    rate: speed,
    pitch: pitch,
    volume: 0.9,
    voiceURI: selectedVoice,
    lang: 'en-US'
  });

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices.filter(v => v.lang === 'en-US'));
      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices.find(v => v.name.includes('Natural'))?.voiceURI || availableVoices[0].voiceURI);
      }
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

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

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseFloat(e.target.value));
  };

  const handlePitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPitch(parseFloat(e.target.value));
  };

  return (
    <div className="text-to-speech">
      <div className="text-to-speech-controls">
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

        <div className="text-to-speech-sliders">
          <label>
            Voice:
            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              disabled={isPlaying}
            >
              {voices.map(voice => (
                <option key={voice.voiceURI} value={voice.voiceURI}>
                  {voice.name.replace('Microsoft ', '').replace('Desktop', '')}
                </option>
              ))}
            </select>
          </label>

          <label>
            Speed: {speed}x
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={speed}
              onChange={handleSpeedChange}
            />
          </label>

          <label>
            Pitch: {pitch}x
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={pitch}
              onChange={handlePitchChange}
            />
          </label>
        </div>

        {isPlaying && (
          <button
            className="text-to-speech__button text-to-speech__button--stop"
            onClick={stop}
            title="Stop"
          >
            <span>⏹️ Stop</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default TextToSpeech;
