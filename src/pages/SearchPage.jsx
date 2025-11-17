import { useState, useEffect, useMemo } from "react";
import { DaftarKata } from "../data/kamus";

// Fungsi generateId
function generateId(letter, index) {
  return `${letter}${String(index + 1).padStart(3, "0")}`;
}

// Tambahkan ID ke semua kata
const wordsArrayWithId = Object.values(DaftarKata.words).map((wordObj, index) => {
  const firstLetter = wordObj.word[0].toUpperCase();
  return {
    id: generateId(firstLetter, index),
    ...wordObj
  };
});

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedWord, setSelectedWord] = useState(null);

  const wordsArray = wordsArrayWithId;

  // Set default kata "kamus"
  useEffect(() => {
    const defaultWord = wordsArray.find((w) => w.word.toLowerCase() === "kamus");
    setSelectedWord(defaultWord);
  }, [wordsArray]);

  // Filter otomatis setiap query berubah
  const filteredWords = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q === "") return [];

    const matched = wordsArray.filter((w) =>
      w.word.toLowerCase().includes(q)
    );

    // Urutkan: exact match di atas, sisanya di bawah
    matched.sort((a, b) => {
      const aExact = a.word.toLowerCase() === q;
      const bExact = b.word.toLowerCase() === q;

      if (aExact && !bExact) return -1; // a duluan
      if (!aExact && bExact) return 1;  // b duluan
      return a.word.localeCompare(b.word); // selebihnya urut alfabet
    });

    return matched;
  }, [query, wordsArray]);

  // Set selectedWord otomatis tiap query/filteredWords berubah
  useEffect(() => {
    const trimmed = query.trim();

    // Kalau query kosong, kembali ke default "kamus"
    if (trimmed === "") {
      const defaultWord = wordsArray.find((w) => w.word.toLowerCase() === "kamus");
      setSelectedWord(defaultWord);
      return;
    }

    // Kalau ada hasil, ambil yang pertama (yang sudah kita pastikan
    // menjadikan exact match "hari" di atas "dahar")
    if (filteredWords.length > 0) {
      setSelectedWord(filteredWords[0]);
    } else {
      setSelectedWord(null);
    }
  }, [query, filteredWords, wordsArray]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    // Tidak perlu setSelectedWord di sini,
    // sudah di-handle oleh useEffect di atas
  };

  const handleSelectWord = (wordObj) => {
    setSelectedWord(wordObj);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari kata..."
          value={query}
          onChange={handleSearch}
          className="w-full px-4 py-3 border rounded-xl focus:outline-none"
        />
      </div>

      {/* Hasil Pencarian */}
      {query.trim() !== "" && (
        <div className="mb-6 bg-white border rounded-xl p-4 shadow">
          <h3 className="font-semibold mb-2">Hasil Pencarian:</h3>

          {filteredWords.length === 0 ? (
            <p className="text-gray-500">Tidak ditemukan.</p>
          ) : (
            <ul className="space-y-2">
              {filteredWords.map((wordObj) => (
                <li
                  key={wordObj.id}
                  className="cursor-pointer underline hover:text-blue-600"
                  onClick={() => handleSelectWord(wordObj)}
                >
                  {wordObj.word}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Detail Kata */}
      {selectedWord && (
        <div className="bg-white border rounded-xl p-6 shadow-md">
          <h2 className="text-3xl font-bold mb-1 tracking-wide">{selectedWord.word}</h2>
          <p className="text-gray-500 text-lg mb-4 italic">{selectedWord.pronunciation}</p>

          <p className="mb-6 flex items-center gap-3">
            <span className="font-semibold italic text-gray-700">
              {selectedWord.part_of_speech}
            </span>
            <span className="flex-1 border-b border-gray-300"></span>
          </p>

          <section className="mb-5">
            <h3 className="font-semibold text-lg mb-2 text-gray-700">Makna</h3>
            <ul className="list-disc ml-6 space-y-1 text-gray-800 leading-relaxed">
              {selectedWord.meanings.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </section>

          <section className="mb-5">
            <h3 className="font-semibold text-lg mb-2 text-gray-700">Sinonim</h3>
            <ul className="list-disc ml-6 space-y-1 text-gray-800 leading-relaxed">
              {selectedWord.synonyms.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2 text-gray-700">Contoh Kalimat</h3>
            <ul className="list-disc ml-6 space-y-1 text-gray-800 leading-relaxed">
              {selectedWord.examples.map((ex, i) => (
                <li key={i}>{ex}</li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
