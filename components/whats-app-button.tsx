"use client";

type WhatsAppButtonProps = {
  message?: string;
};

export function WhatsAppButton({
  message = "Hello LABEL JIYA, I would like to know more about your designer suits.",
}: WhatsAppButtonProps) {
  const phoneNumber = "916360833532";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-3 bg-[#292522] px-8 py-4 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-[#4a4039]"
    >
      {/* WhatsApp Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.49 0 .16 5.33.16 11.88c0 2.09.55 4.13 1.59 5.93L.06 24l6.33-1.66a11.86 11.86 0 0 0 5.65 1.43h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.24-6.15-3.41-8.41ZM12.05 21.7h-.01a9.82 9.82 0 0 1-5.01-1.37l-.36-.21-3.76.99 1-3.66-.23-.38a9.82 9.82 0 0 1-1.51-5.19C2.17 6.46 6.6 2.03 12.05 2.03c2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.43 9.88-9.88 9.88Zm5.42-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.51s1.08 2.91 1.23 3.11c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
      </svg>

      Chat on WhatsApp
    </a>
  );
}