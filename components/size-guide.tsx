"use client";

import { useState } from "react";

export function SizeGuide() {
  const [open, setOpen] = useState(false);

  const sizes = [
    { size: "XS", bust: '32"', waist: '26"', hip: '34"' },
    { size: "S", bust: '34"', waist: '28"', hip: '36"' },
    { size: "M", bust: '36"', waist: '30"', hip: '38"' },
    { size: "L", bust: '38"', waist: '32"', hip: '40"' },
    { size: "XL", bust: '40"', waist: '34"', hip: '42"' },
    { size: "XXL", bust: '42"', waist: '36"', hip: '44"' },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs underline underline-offset-4 hover:opacity-60"
      >
        Size Guide
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-[#faf8f5] p-6 md:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close size guide"
              className="absolute right-5 top-5 text-2xl hover:opacity-60"
            >
              ×
            </button>

            {/* Heading */}
            <div className="pr-8 text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-[#8b7355]">
                LABEL JIYA
              </p>

              <h2 className="mt-3 font-serif text-3xl">
                Size Guide
              </h2>

              <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#6c625a]">
                Use the following body measurements to find your
                closest size for our women&apos;s suits.
              </p>
            </div>

            {/* Size table */}
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[500px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[#d8cfc6]">
                    <th className="px-4 py-4 text-left text-xs uppercase tracking-[0.15em]">
                      Size
                    </th>

                    <th className="px-4 py-4 text-center text-xs uppercase tracking-[0.15em]">
                      Bust
                    </th>

                    <th className="px-4 py-4 text-center text-xs uppercase tracking-[0.15em]">
                      Waist
                    </th>

                    <th className="px-4 py-4 text-center text-xs uppercase tracking-[0.15em]">
                      Hip
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {sizes.map((item) => (
                    <tr
                      key={item.size}
                      className="border-b border-[#e5ded6]"
                    >
                      <td className="px-4 py-4 font-medium">
                        {item.size}
                      </td>

                      <td className="px-4 py-4 text-center text-[#625a53]">
                        {item.bust}
                      </td>

                      <td className="px-4 py-4 text-center text-[#625a53]">
                        {item.waist}
                      </td>

                      <td className="px-4 py-4 text-center text-[#625a53]">
                        {item.hip}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Measurement instructions */}
            <div className="mt-8 border-t border-[#e5ded6] pt-6">
              <h3 className="text-xs uppercase tracking-[0.2em]">
                How to Measure
              </h3>

              <div className="mt-4 space-y-3 text-sm leading-6 text-[#6c625a]">
                <p>
                  <strong className="text-[#292522]">
                    Bust:
                  </strong>{" "}
                  Measure around the fullest part of your bust.
                </p>

                <p>
                  <strong className="text-[#292522]">
                    Waist:
                  </strong>{" "}
                  Measure around your natural waistline.
                </p>

                <p>
                  <strong className="text-[#292522]">
                    Hip:
                  </strong>{" "}
                  Measure around the fullest part of your hips.
                </p>
              </div>
            </div>

            {/* Note */}
            <div className="mt-6 bg-[#eee8e1] p-4">
              <p className="text-xs leading-5 text-[#625a53]">
                These measurements are a general size guide.
                Actual fit may vary depending on the design and
                fabric. For help choosing your size, please contact
                LABEL JIYA.
              </p>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-8 w-full bg-[#292522] px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#4a4039]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}