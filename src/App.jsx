import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "motion/react";
import Cover from "./components/Cover";
import SidePanel from "./components/SidePanel";
import Hero from "./components/Hero";
import Couple from "./components/Couple";
import Countdown from "./components/Countdown";
import Events from "./components/Events";
import Gallery from "./components/Gallery";
import Gift from "./components/Gift";
import Rsvp from "./components/Rsvp";
import Footer from "./components/Footer";
import MusicToggle from "./components/MusicToggle";
import { getGuestName } from "./lib/guest";
import { useMusic } from "./hooks/useMusic";
import OurStory from "./components/OurStory";

export default function App() {
  const guest = useMemo(getGuestName, []);
  const [opened, setOpened] = useState(false);
  const music = useMusic();

  // Kunci gulir selama sampul masih menutup undangan
  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  const open = () => {
    setOpened(true);
    window.scrollTo(0, 0);
    music.play(); // diizinkan browser karena dipicu sentuhan pengguna
  };

  return (
    <>
      <AnimatePresence>
        {!opened && <Cover guest={guest} onOpen={open} />}
      </AnimatePresence>

      <div className="min-h-dvh lg:grid lg:grid-cols-[minmax(0,1fr)_30rem]">
        <SidePanel />
        <main className="bg-surface lg:border-l lg:border-line">
          <Hero />
          <Couple />
          <OurStory />
          <Countdown />
          <Events />
          <Gallery />
          <Gift />
          <Rsvp guest={guest} />
          <Footer />
        </main>
      </div>

      {opened && music.available && (
        <MusicToggle playing={music.playing} onToggle={music.toggle} />
      )}
    </>
  );
}
