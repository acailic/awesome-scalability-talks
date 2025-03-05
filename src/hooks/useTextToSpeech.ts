import { useState, useEffect, useCallback } from "react";

interface TextToSpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
}

export function useTextToSpeech(options: TextToSpeechOptions = {}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null
  );

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      console.error("Speech synthesis is not supported in this browser.");
      return;
    }

    // Cancel any ongoing speech when component unmounts
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setUtterance(null);
  }, []);

  const pause = useCallback(() => {
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isPlaying]);

  const resume = useCallback(() => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [isPaused]);

  const speak = useCallback(
    (text: string) => {
      if (!text) return;

      // Cancel any ongoing speech
      stop();

      // Create new utterance
      const newUtterance = new SpeechSynthesisUtterance(text);

      // Apply options
      newUtterance.rate = options.rate || 1;
      newUtterance.pitch = options.pitch || 1;
      newUtterance.volume = options.volume || 1;
      newUtterance.lang = options.lang || "en-US";

      // Handle events
      newUtterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setUtterance(null);
      };

      newUtterance.onerror = (event) => {
        console.error("Speech synthesis error:", event);
        setIsPlaying(false);
        setIsPaused(false);
        setUtterance(null);
      };

      // Start speaking
      setUtterance(newUtterance);
      setIsPlaying(true);
      window.speechSynthesis.speak(newUtterance);
    },
    [stop, options]
  );

  return {
    speak,
    stop,
    pause,
    resume,
    isPlaying,
    isPaused,
  };
}
