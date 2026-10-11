
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function InaugurationPage() {
  const [opened, setOpened] = useState(false);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#faf6ee] px-5 py-12 text-center text-[#493721]">
      <div className="pointer-events-none absolute inset-4 border border-[#c5a46d]/60 sm:inset-8" />
      <div className="pointer-events-none absolute inset-6 border border-[#c5a46d]/25 sm:inset-11" />

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center">
        <Image
          src="/images/logo/label-jiya-logo.png"
          alt="LABEL JIYA"
          width={220}
          height={100}
          priority
          className="mb-8 h-auto w-44 object-contain sm:w-52"
        />

        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-[#9c7843]">
          A Special Beginning
        </p>

        <h1 className="font-serif text-4xl leading-tight sm:text-6xl">
          A New Chapter
          <span className="mt-2 block italic text-[#ad854b]">
            Begins
          </span>
        </h1>

        <div className="my-7 h-px w-24 bg-[#c5a46d]" />

        <p className="max-w-md text-sm leading-7 text-[#796952] sm:text-base">
          Celebrating the beginning of LABEL JIYA —
          a journey of elegance, beautiful craftsmanship
          and timeless Indian fashion.
        </p>

        <div className="relative mt-12 flex h-36 w-full max-w-lg items-center justify-center">
          <div className="absolute inset-x-0 top-1/2 h-5 -translate-y-1/2 bg-[#8d1425] shadow-md" />

          <div
            className={`absolute left-0 top-0 z-10 h-full w-1/2 origin-left bg-gradient-to-r from-[#6f0c1c] via-[#b51e32] to-[#8d1425] shadow-lg transition-transform duration-1000 ease-in-out ${
              opened ? "-translate-x-full -rotate-6 opacity-0" : ""
            }`}
          />

          <div
            className={`absolute right-0 top-0 z-10 h-full w-1/2 origin-right bg-gradient-to-l from-[#6f0c1c] via-[#b51e32] to-[#8d1425] shadow-lg transition-transform duration-1000 ease-in-out ${
              opened ? "translate-x-full rotate-6 opacity-0" : ""
            }`}
          />

          <div className="relative z-20 flex h-24 w-24 items-center justify-center rounded-full border border-[#d7b77c] bg-[#faf6ee] text-4xl shadow-xl">
            {opened ? "✨" : "✂️"}
          </div>
        </div>

        {!opened ? (
          <>
            <p className="mt-5 text-xs uppercase tracking-[0.25em] text-[#9c7843]">
              The Inauguration of LABEL JIYA
            </p>

            <button
              onClick={() => setOpened(true)}
              className="mt-8 bg-[#8d1425] px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg transition hover:bg-[#6f0c1c] focus:outline-none focus:ring-2 focus:ring-[#c5a46d] focus:ring-offset-2"
            >
              ✂ Cut the Ribbon
            </button>
          </>
        ) : (
          <div className="mt-7 animate-[fadeIn_1s_ease-out]">
            <p className="font-serif text-2xl italic text-[#9c7843] sm:text-3xl">
              The Journey Begins!
            </p>
            <p className="mt-3 text-sm text-[#796952]">
              With love, dreams and a touch of elegance.
            </p>

            <Link
              href="www.labeljiya.in"
              className="mt-8 inline-block bg-[#8d1425] px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg transition hover:bg-[#6f0c1c]"
            >
              Enter LABEL JIYA →
            </Link>
          </div>
        )}

        <p className="mt-12 text-[10px] uppercase tracking-[0.3em] text-[#a28b6c]">
          Made with love · LABEL JIYA
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
