"use client";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/918527378555"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed left-4 bottom-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 cursor-pointer"
      style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.25)" }}
    >
      <img
        src="/whatsapp-icon.svg"
        alt="WhatsApp"
        className="w-8 h-8"
      />
    </a>
  );
}
