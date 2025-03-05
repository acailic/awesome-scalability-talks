import React, { useState, useEffect } from 'react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

interface TextToSpeechProps {
  text: string;
}

export function TextToSpeech({ text }: TextToSpeechProps) {
  const [speed, setSpeed] = useState(1.6);
  const [pitch, setPitch] = useState(1.0);
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
      const englishVoices = availableVoices.filter(v => v.lang.startsWith('en'));

      const preferredVoices = englishVoices.filter(v =>
        v.name.toLowerCase().includes('female') ||
        v.name.toLowerCase().includes('zira') ||
        v.name.toLowerCase().includes('samantha') ||
        v.name.toLowerCase().includes('karen')
      );

      setVoices(englishVoices);

      const initialVoice = preferredVoices[0] || englishVoices[0];
      setSelectedVoice(initialVoice?.voiceURI || '');
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

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVoiceURI = e.target.value;
    setSelectedVoice(newVoiceURI);
    stop();
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
              onChange={handleVoiceChange}
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
