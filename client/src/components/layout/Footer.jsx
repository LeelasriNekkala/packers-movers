function Footer() {
  return (
    <footer className="bg-black text-gray-300 text-center py-6 mt-auto">
      <div className="text-sm tracking-wide">
        HOME | ABOUT US | SERVICES | PRICES | NEWS | SUPPORT | CONTACTS
      </div>

      <div className="mt-2 text-xs">
        © {new Date().getFullYear()} Packers & Movers. All rights reserved.
      </div>

      {/* Bottom Green Line */}
      <div className="h-0.5 bg-cyan-400 w-full max-w-6xl mx-auto mt-4"></div>
    </footer>
  );
}

export default Footer;
