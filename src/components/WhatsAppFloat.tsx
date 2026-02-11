import Link from "next/link";

const message =
  "Hello Arc 11 Architect, I would like to discuss a project. Location: ____ , Project type: ____ , Budget: ____ , Timeline: ____.";

const whatsappUrl =
  "https://api.whatsapp.com/send/?phone=918527378555&text=" +
  encodeURIComponent(message) +
  "&type=phone_number&app_absent=0";

export default function WhatsAppFloat() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-3 rounded-full border border-[var(--line)] bg-white/90 px-4 py-3 text-xs uppercase tracking-[0.25em] text-[var(--foreground)] shadow-[var(--shadow)] backdrop-blur transition hover:translate-y-[-2px]"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M20.5 11.8a8.4 8.4 0 0 1-11.6 7.8L4 20l.5-4.7a8.4 8.4 0 1 1 16-3.5Z" />
            <path d="M8.2 8.5c.2-.5.4-.6.7-.6h.6c.2 0 .4 0 .5.3l.8 1.7c.1.2.1.4 0 .6l-.3.5c-.1.2-.1.4 0 .6.4.8 1.2 1.6 2 2 .2.1.4.1.6 0l.5-.3c.2-.1.4-.1.6 0l1.7.8c.3.1.3.3.3.5v.6c0 .3-.1.5-.6.7-.4.2-1.8.7-3.3.2-1.5-.5-3.6-2.5-4.1-4.1-.5-1.5 0-2.9.2-3.3Z" />
          </svg>
        </span>
        <span className="hidden sm:inline">WhatsApp</span>
      </Link>
    </div>
  );
}
