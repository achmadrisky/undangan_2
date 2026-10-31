import { useCallback, useEffect, useRef, useState } from "react";
import { invitation } from "../data/invitation";

export function useMusic() {
  const src = invitation.music.src;
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!src) return undefined;
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = "none";
    const onError = () => {
      setFailed(true);
      setPlaying(false);
    };
    audio.addEventListener("error", onError);
    audioRef.current = audio;
    return () => {
      audio.removeEventListener("error", onError);
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  const play = useCallback(async () => {
    try {
      await audioRef.current?.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
  }, []);

  const toggle = useCallback(
    () => (playing ? pause() : play()),
    [playing, play, pause],
  );

  return { available: Boolean(src) && !failed, playing, play, toggle };
}
