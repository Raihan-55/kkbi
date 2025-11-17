import { Home, Search, BookText, User } from "lucide-react";
import logoUrl from "/LOGORN.png";

function Navbar({ currentPage, setCurrentPage }) {
  return (
    <div>
      {/* Navbar Desktop */}
      <nav className="hidden md:flex items-center justify-between px-8 py-4 bg-white">
        {/* Logo kiri */}
        <div className="flex items-center gap-2">
          <img src="/LOGORN.png" alt="Logo" className="w-10 h-10" />
          <span className="text-xl font-semibold">Kamus Kecil Bahasa Indonesia</span>
        </div>

        {/* Menu kanan */}
        <div className="flex gap-6">
          <button onClick={() => setCurrentPage("search")} className="hover:text-blue-600 transition">
            Cari
          </button>

          <button onClick={() => setCurrentPage("list")} className="hover:text-blue-600 transition">
            Koleksi
          </button>

          <button onClick={() => setCurrentPage("profile")} className="hover:text-blue-600 transition">
            Profil
          </button>
        </div>
      </nav>

      {/* Navbar Mobile */}
      <nav className="md:hidden top-0 left-0 right-0 bg-white border-b shadow p-3 flex items-center z-50">
        <img src="/LOGORN.png" alt="Logo" className="w-10 h-10" />
        <span className="ml-2 font-semibold text-lg">Kamus Kecil Bahasa Indonesia</span>
      </nav>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.1)] border-t p-2 flex justify-around">
        {/* PAGE SEARCH */}
        <button onClick={() => setCurrentPage("search")} className={`flex flex-col items-center ${currentPage === "search" ? "text-blue-600" : "text-gray-600"}`}>
          <Search size={24} />
          <span className="text-xs mt-1">Cari</span>
        </button>

        {/* PAGE LIST */}
        <button onClick={() => setCurrentPage("list")} className={`flex flex-col items-center ${currentPage === "list" ? "text-blue-600" : "text-gray-600"}`}>
          <BookText size={24} />
          <span className="text-xs mt-1">Koleksi</span>
        </button>

        {/* PAGE PROFILE */}
        <button onClick={() => setCurrentPage("profile")} className={`flex flex-col items-center ${currentPage === "profile" ? "text-blue-600" : "text-gray-600"}`}>
          <User size={24} />
          <span className="text-xs mt-1">Profil</span>
        </button>
      </nav>
    </div>
  );
}

export default Navbar;
