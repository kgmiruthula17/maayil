// Brand glyphs are inlined: lucide-react no longer ships brand icons.
type P = { className?: string };

export const InstagramIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const WhatsAppIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
    <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.3l-4.5 1.2z" strokeLinejoin="round" />
    <path d="M9 8.5c.3 2.7 2.8 5.2 5.5 5.5l1.2-1.2-2-1-.9.7c-.8-.4-1.5-1.1-1.9-1.9l.7-.9-1-2L9 8.5z" fill="currentColor" stroke="none" />
  </svg>
);
