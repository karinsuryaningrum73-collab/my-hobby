import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, Gauge, Volume2 } from 'lucide-react';
import { HOBBIES, HobbyId, HobbyItem } from '../data/hobbies';
import { HobbyIllustration } from './HobbyIllustration';
import { playClick } from '../utils/soundEffects';
import { isTTSSupported, speakEnglish, stopSpeaking } from '../utils/speech';

interface LearnListenModeProps {
  onBack: () => void;
  onListenComplete?: (hobbyId: HobbyId) => void;
}

export const LearnListenMode: React.FC<LearnListenModeProps> = ({
  onBack,
  onListenComplete,
}) => {
  const [activeId, setActiveId] = useState<HobbyId | null>(null);
  const [heardIds, setHeardIds] = useState<Set<HobbyId>>(new Set());
  const [speedMode, setSpeedMode] = useState<'normal' | 'slow'>('normal');
  const ttsAvailable = isTTSSupported();

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const handleCardClick = (hobby: HobbyItem) => {
    playClick();
    setActiveId(hobby.id);
    setHeardIds((prev) => {
      const next = new Set(prev);
      next.add(hobby.id);
      return next;
    });
    onListenComplete?.(hobby.id);

    const rate = speedMode === 'slow' ? 0.66 : 0.84;
    const textToSpeak = `${hobby.englishName}. ${hobby.learnSentence}`;

    speakEnglish(textToSpeak, {
      rate,
      onStart: () => setActiveId(hobby.id),
      onEnd: () => setActiveId((curr) => (curr === hobby.id ? null : curr)),
      onError: () => setActiveId((curr) => (curr === hobby.id ? null : curr)),
    });
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-start sm:items-center gap-4">
          <button
            type="button"
            onClick={() => {
              playClick();
              stopSpeaking();
              onBack();
            }}
            className="btn-tactile inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white border-2 border-slate-200 shadow-[0_4px_0_#CBD5E1] hover:bg-slate-50 text-slate-700 font-semibold whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </button>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
              1. Learn &amp; Listen
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-0.5">
              Klik kartu hobi untuk melihat gerakan dan mendengarkan cara mengucapkannya.
            </p>
          </div>
        </div>

        {/* Speed & Progress Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-semibold text-slate-600 tabular-nums">
            Sudah didengar: <strong className="text-sky-700">{heardIds.size} / {HOBBIES.length}</strong>
          </span>

          <div
            className="inline-flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-xl"
            role="group"
            aria-label="Kecepatan Suara"
          >
            <Gauge className="w-4 h-4 text-slate-500 ml-2 mr-1" />
            <button
              type="button"
              onClick={() => {
                playClick();
                setSpeedMode('normal');
              }}
              className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                speedMode === 'normal'
                  ? 'bg-white text-sky-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Normal
            </button>
            <button
              type="button"
              onClick={() => {
                playClick();
                setSpeedMode('slow');
              }}
              className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                speedMode === 'slow'
                  ? 'bg-white text-sky-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pelan
            </button>
          </div>
        </div>
      </div>

      {!ttsAvailable && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-900 text-sm font-medium">
          Browser ini belum mendukung pemutar suara otomatis (Web Speech API). Gunakan Chrome atau Edge terbaru agar suara bahasa Inggris terdengar jelas.
        </div>
      )}

      {/* 8 Hobby Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {HOBBIES.map((hobby) => {
          const isSpeaking = activeId === hobby.id;
          const isHeard = heardIds.has(hobby.id);

          return (
            <button
              key={hobby.id}
              type="button"
              onClick={() => handleCardClick(hobby)}
              className={`btn-tactile group text-left rounded-3xl p-4 border-2 transition-all cursor-pointer flex flex-col justify-between focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 ${
                isSpeaking
                  ? 'bg-white border-sky-500 ring-4 ring-sky-200 shadow-[0_6px_0_#0EA5E9] -translate-y-1'
                  : `${hobby.cardBg} ${hobby.cardBorder} shadow-[0_5px_0_rgba(15,23,42,0.12)] hover:-translate-y-0.5`
              }`}
            >
              <div>
                {/* Animated SVG Container */}
                <div className="relative rounded-2xl bg-white/80 p-2 mb-3 overflow-hidden">
                  <HobbyIllustration hobbyId={hobby.id} className="w-full h-36" />

                  {isHeard && !isSpeaking && (
                    <span
                      className="absolute top-2 right-2 text-emerald-600"
                      title="Sudah didengar"
                    >
                      <CheckCircle2 className="w-6 h-6 fill-emerald-100" />
                    </span>
                  )}
                </div>

                {/* English & Indonesian Text */}
                <h2 className={`font-display text-xl font-extrabold ${hobby.accentText}`}>
                  {hobby.englishName}
                </h2>
                <p className="text-slate-800 font-semibold text-base mt-1">
                  “{hobby.learnSentence}”
                </p>
                <p className="text-slate-600 text-sm mt-1">
                  {hobby.indonesianName} · {hobby.learnSentenceId}
                </p>
              </div>

              {/* Audio Action Footer */}
              <div className="mt-4 pt-3 border-t border-slate-900/10 flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-2 text-sm font-bold ${
                    isSpeaking ? 'text-sky-600' : hobby.accentText
                  }`}
                >
                  <Volume2 className={`w-5 h-5 ${isSpeaking ? 'animate-pulse' : ''}`} />
                  <span>{isSpeaking ? 'Sedang berbicara...' : 'Klik untuk dengar'}</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
