"use client";

import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";

export interface MusicPlayerHandle {
  playMusic: () => void;
  pauseMusic: () => void;
}

interface MusicPlayerProps {
  autoPlayOnReady?: boolean;
}

export const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(
  ({ autoPlayOnReady }, ref) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const play = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay policy may block without interaction
            setIsPlaying(false);
          });
      }
    };

    const pause = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    useImperativeHandle(ref, () => ({
      playMusic: play,
      pauseMusic: pause,
    }));

    const toggle = () => {
      if (isPlaying) {
        pause();
      } else {
        play();
      }
    };

    useEffect(() => {
      if (autoPlayOnReady) {
        play();
      }
    }, [autoPlayOnReady]);

    return (
      <>
        <button
          className={`music ${isPlaying ? "is-playing" : ""}`}
          id="music"
          type="button"
          aria-label={isPlaying ? "Pause music" : "Play music"}
          aria-pressed={isPlaying ? "true" : "false"}
          onClick={toggle}
        >
          <span className="eq" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
        </button>
        <audio
          ref={audioRef}
          id="audio"
          loop
          preload="auto"
          src="/assets/music.mp3"
        />
      </>
    );
  }
);

MusicPlayer.displayName = "MusicPlayer";

