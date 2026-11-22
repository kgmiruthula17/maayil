export function AnnouncementBar() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-burgundy via-[#380b15] to-burgundy px-4 py-2 text-center text-[11px] uppercase tracking-[0.24em] text-gold-shimmer border-b border-gold/30 shadow-xs">
      <span className="inline-flex items-center gap-2.5">
        <span className="text-gold text-[9px] animate-pulse">✦</span>
        <span>Handcrafted Ethnic Elegance · Complimentary Shipping Over ₹1,999</span>
        <span className="text-gold text-[9px] animate-pulse">✦</span>
      </span>
    </div>
  );
}
