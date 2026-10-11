"use client";

import Image from "next/image";
import { useState } from "react";

export default function InaugurationPage() {
  const [opening, setOpening] = useState(false);

  return (
    <main className="fixed inset-0 overflow-hidden bg-[#f8f3eb] text-[#30231f]">
      {/* Your live store behind the curtains */}
      <iframe
        src="https://www.labeljiya.in"
        title="LABEL JIYA online store"
        className="absolute inset-0 z-0 h-full w-full border-0 bg-white"
      />

      {/* Inauguration overlay */}
      <div
        className={`absolute inset-0 z-10 overflow-hidden transition-opacity duration-700 ${
          opening
            ? "pointer-events-none opacity-0 delay-[4000ms]"
            : "opacity-100"
        }`}
      >
        {/* Elegant background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#fffdf9_0%,#f4e8d8_75%,#e8d5bb_100%)]" />

        {/* Gold border */}
        <div className="pointer-events-none absolute inset-3 z-40 border border-[#b89560]/70 sm:inset-6" />
        <div className="pointer-events-none absolute inset-5 z-40 border border-[#b89560]/30 sm:inset-9" />

        {/* Fireworks */}
        <span className="firework left-[6%] top-[8%]">✦</span>
        <span className="firework right-[7%] top-[10%]">✧</span>
        <span className="firework bottom-[12%] left-[8%]">✧</span>
        <span className="firework bottom-[14%] right-[8%]">✦</span>

        {/* Main content */}
        <section className="absolute inset-0 z-50 flex items-center justify-center overflow-y-auto px-8 py-12">
          <div className="my-auto w-full max-w-xl rounded-sm border border-[#b89560]/70 bg-[#fffdf9]/95 px-6 py-8 shadow-2xl sm:px-12 sm:py-10">
            <div className="flex justify-center">
              <Image
                src="/images/logo/label-jiya-logo.png"
                alt="LABEL JIYA"
                width={220}
                height={100}
                priority
                className="h-auto w-40 object-contain sm:w-52"
              />
            </div>

            <div className="mx-auto my-5 h-px w-24 bg-[#b89560]" />

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#79552e]">
              A Special Beginning
            </p>

            <h1 className="mt-5 font-serif text-4xl font-medium leading-tight text-[#54212a] sm:text-6xl">
              A New Chapter
              <span className="mt-2 block text-5xl italic text-[#a47b43] sm:text-7xl">
                Begins
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-md text-base leading-7 text-[#493a32] sm:text-lg">
              Celebrating the beginning of LABEL JIYA — a journey of elegance,
              beautiful craftsmanship and timeless Indian fashion.
            </p>

            <div className="my-7 flex items-center justify-center gap-7 text-3xl">
              <span className="sparkle">🪔</span>
              <span>🌹</span>
              <span className="sparkle">🪔</span>
            </div>

            {!opening ? (
              <button
                type="button"
                onClick={() => {
                  setOpening(true);
                  setTimeout(() => {
                    window.location.href = "https://www.labeljiya.in";
                  }, 4000);
                }}
                className="relative z-[60] w-full cursor-pointer border-2 border-[#c8a46c] bg-[#762331] px-5 py-5 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-xl transition hover:bg-[#571923] focus:outline-none focus:ring-4 focus:ring-[#c8a46c] sm:text-base"
              >
                ✂ CUT THE RIBBON ✂
              </button>
            ) : (
              <p className="text-xl font-semibold text-[#762331]">
                Welcome to LABEL JIYA!
              </p>
            )}

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#79552e]">
              The Inauguration of LABEL JIYA
            </p>
          </div>
        </section>

        {/* Left curtain */}
        <div className={`curtain curtain-left ${opening ? "left-open" : ""}`}>
          <span className="curtain-emblem">✦</span>
        </div>

        {/* Right curtain */}
        <div className={`curtain curtain-right ${opening ? "right-open" : ""}`}>
          <span className="curtain-emblem">✦</span>
        </div>

        {/* Falling petals */}
        {Array.from({ length: 18 }, (_, i) => (
          <span
            key={i}
            className="petal"
            style={{
              left: `${(i * 31 + 7) % 100}%`,
              animationDelay: `${(i % 7) * 0.6}s`,
            }}
          >
            {i % 2 === 0 ? "🌹" : "✨"}
          </span>
        ))}
      </div>

      <style jsx>{`
        .curtain {
          position: absolute;
          top: 0;
          bottom: 0;
          z-index: 20;
          width: 51%;
          pointer-events: none;
          background: repeating-linear-gradient(
            90deg,
            #4d1420 0%,
            #762331 12%,
            #8b3040 24%,
            #5d1928 36%,
            #762331 48%
          );
          box-shadow: 0 0 30px #32101880;
          transition: transform 4s cubic-bezier(0.7, 0, 0.2, 1);
        }

        .curtain-left {
          left: 0;
          border-right: 3px solid #c8a46c;
        }

        .curtain-right {
          right: 0;
          border-left: 3px solid #c8a46c;
          background: repeating-linear-gradient(
            270deg,
            #4d1420 0%,
            #762331 12%,
            #8b3040 24%,
            #5d1928 36%,
            #762331 48%
          );
        }

        .left-open {
          transform: translateX(-105%);
        }

        .right-open {
          transform: translateX(105%);
        }

        .curtain-emblem {
          position: absolute;
          top: 50%;
          left: 50%;
          color: #e4c58d;
          font-size: 38px;
          transform: translate(-50%, -50%);
        }

        .firework {
          position: absolute;
          z-index: 5;
          color: #a77b3d;
          font-size: 44px;
          text-shadow: 0 0 14px #e5c58a;
          animation: sparkle 1.5s ease-in-out infinite alternate;
        }

        .sparkle {
          animation: sparkle 1s ease-in-out infinite alternate;
        }

        .petal {
          position: absolute;
          top: -30px;
          z-index: 40;
          pointer-events: none;
          animation: fall 7s linear infinite;
        }

        @keyframes sparkle {
          from {
            opacity: 0.55;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1.12);
          }
        }

        @keyframes fall {
          to {
            transform: translateY(110vh) rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .curtain {
            transition-duration: 0.1s;
          }

          .firework,
          .sparkle,
          .petal {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}