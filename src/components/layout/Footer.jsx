import { FaYoutube } from "react-icons/fa";

export default function Footer() {
  const links = ["ABOUT US", "CONTACT US", "FAQ'S", "SERVICES", "QUICK LINKS"];

  return (
    <footer className="bg-[#0f2742] text-white text-center">
      {/* Links */}
      <div className="divide-y divide-white/10">
        {links.map((item) => (
          <div key={item} className="py-6 text-sm tracking-[0.2em]">
            {item}
          </div>
        ))}
      </div>

      {/* Social icons */}
      {/* Social icons */}
      <div className="flex justify-center gap-8 py-10">
        <img
          src="/img/youtube.jpeg"
          alt="Instagram"
          className="w-14 h-14 rounded-full bg-white p-3 cursor-pointer hover:scale-110 transition"
        />

        <img
          src="/img/facebook.jpeg"
          alt="Facebook"
          className="w-14 h-14 rounded-full bg-white p-3 cursor-pointer hover:scale-110 transition"
        />

        <img
          src="/img/insta.jpeg"
          alt="YouTube"
          className="w-14 h-14 rounded-full bg-white p-3 cursor-pointer hover:scale-110 transition"
        />
      </div>

      {/* Copyright */}
      <div className="text-xs tracking-[0.25em] text-white/80">
        @2012 ABC WAS PRI.
      </div>

      <div className="mt-4 text-xs tracking-[0.25em] text-white/80">
        PRIVACY + TERMS
      </div>

      {/* Brand */}
      <div className="mt-10 pb-8 flex justify-center">
        <img src="/img/Lebah.png" alt="Lebah" className="h-8 object-contain" />
      </div>
    </footer>
  );
}
