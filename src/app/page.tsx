"use client";

import React, { useState, useEffect, useRef } from "react";
import { weddingData } from "@/data/weddingData";
import { OpeningCover } from "@/components/wedding/OpeningCover";
import { MusicPlayer, MusicPlayerHandle } from "@/components/wedding/MusicPlayer";
import { ScrollProgress } from "@/components/wedding/ScrollProgress";
import { EdgeBorders } from "@/components/wedding/EdgeBorders";
import { SkyParticles } from "@/components/wedding/SkyParticles";
import { HeroSection } from "@/components/wedding/HeroSection";
import { GajaSection } from "@/components/wedding/GajaSection";
import { FamilySection } from "@/components/wedding/FamilySection";
import { CountdownSection } from "@/components/wedding/CountdownSection";
import { CoupleSection } from "@/components/wedding/CoupleSection";
import { EventsSection } from "@/components/wedding/EventsSection";
import { StorySection } from "@/components/wedding/StorySection";
import { FilmSection } from "@/components/wedding/FilmSection";
import { GallerySection } from "@/components/wedding/GallerySection";
import { VenueSection } from "@/components/wedding/VenueSection";
import { RSVPSection } from "@/components/wedding/RSVPSection";
import { FooterSection } from "@/components/wedding/FooterSection";

export default function WeddingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const musicRef = useRef<MusicPlayerHandle | null>(null);

  const handleOpen = () => {
    setIsOpen(true);
    if (typeof document !== "undefined") {
      document.body.classList.add("is-open");
    }
    if (musicRef.current) {
      musicRef.current.playMusic();
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.add("is-open");
    }

    // Universal IntersectionObserver for all .reveal elements across the invitation
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );

      const targets = document.querySelectorAll(".reveal");
      targets.forEach((el) => observer?.observe(el));
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <>
      <OpeningCover onOpen={handleOpen} isOpen={isOpen} />

      <MusicPlayer ref={musicRef} />

      <ScrollProgress />

      <EdgeBorders />

      <SkyParticles />

      <main id="page">
        <HeroSection data={weddingData} />

        <GajaSection />

        <FamilySection data={weddingData} />

        <CountdownSection data={weddingData} />

        <CoupleSection data={weddingData} />

        <EventsSection data={weddingData} />

        <StorySection data={weddingData} />

        <FilmSection data={weddingData} />

        <GallerySection data={weddingData} />

        <VenueSection data={weddingData} />

        <RSVPSection data={weddingData} />

        <FooterSection data={weddingData} />
      </main>
    </>
  );
}
