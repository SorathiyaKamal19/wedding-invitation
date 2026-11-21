import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#270507] text-[#fff9ec] text-center px-4 font-crimson">
      <h1 className="font-playfair text-4xl text-gold mb-2">404</h1>
      <p className="text-lg text-[#fff9ec]/80 mb-6">The auspicious page you are looking for was not found.</p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full border border-gold/50 bg-[#8a5e17] text-[#fff9ec] font-josefin uppercase tracking-widest text-xs hover:bg-[#a5701e] transition-colors"
      >
        Return to Invitation
      </Link>
    </div>
  );
}
