"use client";

import { useState, useEffect, useRef } from "react";
import { FiSearch, FiMic } from "react-icons/fi";
import HeroBanner from "./HeroBanner";
import { FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/navigation";

const placeholderText = "Search for Shirts";

export default function Hero({ activeTab, setActiveTab }) {
  const [query, setQuery] = useState("");
  const [isUserTyping, setIsUserTyping] = useState(false);

  const [placeholder, setPlaceholder] = useState("");
  const timerRef = useRef(null);
  const clickSoundRef = useRef(null);

  const recognitionRef = useRef(null);
  const router = useRouter();
  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/products?search=${encodeURIComponent(query)}`);
  };

  const handleMicClick = () => {
    // 🔊 Play click sound
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(() => {});
    }

    // Stop typing animation
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice search not supported in this browser");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setPlaceholder("Listening...");
    };

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setQuery(spokenText);
      setIsUserTyping(true);
    };

    recognition.onend = () => {
      // 🎯 RESET PLACEHOLDER WHEN MIC STOPS
      if (!query) {
        setIsUserTyping(false); // restart animation
        setPlaceholder("");
      }
    };

    recognition.onerror = () => {
      // 🎯 RESET PLACEHOLDER ON ERROR
      setIsUserTyping(false);
      setPlaceholder("");
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  useEffect(() => {
    if (isUserTyping) return; // STOP animation if user types

    let index = 0;

    const type = () => {
      if (isUserTyping) return;

      if (index < placeholderText.length) {
        setPlaceholder(placeholderText.slice(0, index + 1));
        index++;
        timerRef.current = setTimeout(type, 300);
      } else {
        timerRef.current = setTimeout(() => {
          setPlaceholder("");
          index = 0;
          type();
        }, 1200);
      }
    };

    type();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isUserTyping]);
  useEffect(() => {
    clickSoundRef.current = new Audio("/sounds/pop.mp3");
    clickSoundRef.current.volume = 0.4; // soft = luxury
  }, []);

  return (
    <section className="bg-white pt-6">
      {/* Search bar */}
      <div className="px-4 mb-5 mt-4">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />

          <input
            value={query}
            onChange={(e) => {
              setIsUserTyping(true);
              setQuery(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            onFocus={() => setIsUserTyping(true)}
            placeholder={placeholder}
            className="
    w-full rounded-full border px-12 py-3 pr-14
    text-sm font-semibold text-black
    focus:outline-none
    placeholder:font-normal placeholder:text-gray-500
    caret-black
  "
          />

          {/* RIGHT ICON */}
          {query ? (
            <FiArrowRight
              onClick={handleSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2
      text-black cursor-pointer
      transition active:scale-90"
            />
          ) : (
            <FiMic
              className="absolute right-4 top-1/2 -translate-y-1/2
      text-gray-900 cursor-pointer
      active:scale-90 transition"
              onClick={handleMicClick}
            />
          )}
        </div>
      </div>

      {/* Men | Women */}
      {/* Men | Women */}
      <div className="relative flex justify-center items-center mb-3">
        <div className="flex gap-16 text-sm tracking-widest relative">
          {/* Animated underline */}
          <span
            className={`absolute -bottom-2 h-[2px] w-10 bg-black
  transition-transform duration-300 ease-in-out
  ${activeTab === "men" ? "translate-x-0" : "translate-x-[112px]"}`}
          />

          <button
            onClick={() => setActiveTab("men")}
            className={
              activeTab === "men" ? "text-black font-semibold" : "text-gray-400"
            }
          >
            MEN
          </button>

          <button
            onClick={() => setActiveTab("women")}
            className={
              activeTab === "women"
                ? "text-black font-semibold"
                : "text-gray-400"
            }
          >
            WOMEN
          </button>
        </div>
      </div>

      {/* Blue strip */}
      <div className="w-full bg-[#fffff] py-3">
        <HeroBanner activeTab={activeTab} />
      </div>
    </section>
  );
}
