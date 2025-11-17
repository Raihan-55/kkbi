import { useState } from "react";
import { DaftarKata } from "../data/kamus";

function generateId(letter, index) {
  return `${letter}${String(index + 1).padStart(3, "0")}`;
}

// Tambahkan ID dinamis ke semua kata saat file di-load
const wordsArrayWithId = Object.values(DaftarKata.words).map((wordObj, index) => {
  // Ambil huruf pertama sebagai prefix
  const firstLetter = wordObj.word[0].toUpperCase();
  return {
    id: generateId(firstLetter, index),
    ...wordObj,
  };
});

export default function ListHurufPage() {
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [selectedWord, setSelectedWord] = useState(null);

  const wordsArray = wordsArrayWithId;

  const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    setSelectedWord(null);
  };

  const handleWordClick = (wordObj) => {
    setSelectedWord(wordObj);
  };

  const filteredWords = selectedLetter === null ? [] : wordsArray.filter((w) => w.word[0].toUpperCase() === selectedLetter);
  const sortedWords = filteredWords.sort((a, b) => a.word.localeCompare(b.word));
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Grid Huruf – hanya tampil jika BELUM memilih kata */}
      {selectedWord === null && (
        <div className="grid grid-cols-6 gap-2 mb-6">
          {alphabet.map((letter) => (
            <button
              key={letter}
              className={`py-2 border rounded text-center hover:text-blue-600 transition ${selectedLetter === letter ? "text-blue-600" : ""}`}
              onClick={() => {
                setSelectedLetter(letter);
                setSelectedWord(null);
              }}
            >
              {letter}
            </button>
          ))}
        </div>
      )}

      {/* Daftar Kata */}
      {selectedWord === null && (
        <div className="border rounded-xl p-6 shadow">
          <h2 className="text-xl mb-4">Kata berawalan {selectedLetter}</h2>

          {filteredWords.length === 0 && <p>Tidak ada kata berawalan huruf ini.</p>}

          <ul className="list-disc ml-6 space-y-2">
            {sortedWords.map((wordObj) => (
              <li key={wordObj.id} className="cursor-pointer underline hover:text-blue-600 gap-1" onClick={() => setSelectedWord(wordObj)}>
                {wordObj.word}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Detail Kata */}
      {selectedWord && (
        <div>
          <button className="mb-4 px-4 py-2 border rounded" onClick={() => setSelectedWord(null)}>
            Kembali ke daftar kata
          </button>

          <h2 className="text-3xl font-bold mb-1 tracking-wide">{selectedWord.word}</h2>

          <p className="text-gray-500 text-lg mb-4 italic">{selectedWord.pronunciation}</p>

          <p className="mb-6 flex items-center gap-3">
            <span className="font-semibold italic text-gray-700">{selectedWord.part_of_speech}</span>
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
