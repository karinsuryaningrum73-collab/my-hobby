import React, { useEffect, useState } from 'react';
import { BookOpen, Headphones, Mic, Star, Volume2, VolumeX } from 'lucide-react';
import { HOBBIES } from './data/hobbies';
import { HobbyIllustration, Kelompok3Banner, MascotHero } from './components/HobbyIllustration';
import { LearnListenMode } from './components/LearnListenMode';
import { SpeakingPracticeMode } from './components/SpeakingPracticeMode';
import { ListeningQuizMode } from './components/ListeningQuizMode';
import {
  isSoundEffectsEnabled,
  playClick,
  setSoundEffectsEnabled,
} from './utils/soundEffects';
import { speakEnglish, stopSpeaking } from './utils/speech';

type AppMode = 'home' | 'learn' | 'speaking' | 'quiz';

export default function App() {
  const [mode, setMode] = useState<AppMode>('home');
  const [soundOn, setSoundOn] = useState(true);
  const [earnedKeys, setEarnedKeys] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('my-hobby-stars');
      return saved ? new Set(JSON.parse(saved) as string[]) : new Set();
    } catch {
      return new Set();
    }
  });
  const [heroSpeaking, setHeroSpeaking] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('my-hobby-stars', JSON.stringify(Array.from(earnedKeys)));
    } catch {
      // ignore storage errors
    }
  }, [earnedKeys]);

  const navigateTo = (nextMode: AppMode) => {
    playClick();
    stopSpeaking();
    setMode(nextMode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundEffectsEnabled(next);
    setSoundOn(next);
    if (next) {
      playClick();
    }
  };

  const handleEarnStar = (key: string) => {
    setEarnedKeys((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  };

  const handleSayHello = () => {
    playClick();
    speakEnglish("Hello friends! Let's learn about hobbies in English!", {
      rate: 0.85,
      onStart: () => setHeroSpeaking(true),
      onEnd: () => setHeroSpeaking(false),
      onError: () => setHeroSpeaking(false),
    });
  };

  // Warm up SpeechSynthesis voice list on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] text-slate-900">
      {/* Top Bar (3-zone layout) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b-2 border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Brand wordmark */}
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-sky-600 hover:text-sky-700 whitespace-nowrap shrink-0 cursor-pointer"
          >
            My Hobby
          </button>

          {/* Zone 2: Clean single-line navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-600">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors hover:text-sky-700 ${
                mode === 'home' ? 'text-sky-700 underline underline-offset-8 decoration-2' : ''
              }`}
            >
              Beranda
            </button>
            <button
              type="button"
              onClick={() => navigateTo('learn')}
              className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors hover:text-sky-700 ${
                mode === 'learn' ? 'text-sky-700 underline underline-offset-8 decoration-2' : ''
              }`}
            >
              1. Learn &amp; Listen
            </button>
            <button
              type="button"
              onClick={() => navigateTo('speaking')}
              className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors hover:text-emerald-700 ${
                mode === 'speaking' ? 'text-emerald-700 underline underline-offset-8 decoration-2' : ''
              }`}
            >
              2. Speaking Practice
            </button>
            <button
              type="button"
              onClick={() => navigateTo('quiz')}
              className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors hover:text-amber-700 ${
                mode === 'quiz' ? 'text-amber-700 underline underline-offset-8 decoration-2' : ''
              }`}
            >
              3. Listening Quiz
            </button>
          </nav>

          {/* Zone 3: Primary sound control + Star tally */}
          <div className="flex items-center gap-3 shrink-0">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 font-display font-extrabold text-amber-800 tabular-nums whitespace-nowrap"
              title="Total bintang yang sudah kamu kumpulkan"
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>{earnedKeys.size}</span>
            </div>

            <button
              type="button"
              onClick={handleToggleSound}
              aria-label={soundOn ? 'Matikan efek suara tombol' : 'Nyalakan efek suara tombol'}
              className="btn-tactile inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-sm font-bold whitespace-nowrap shrink-0 cursor-pointer"
            >
              {isSoundEffectsEnabled() && soundOn ? (
                <>
                  <Volume2 className="w-4 h-4 text-sky-600" />
                  <span className="hidden sm:inline">Suara Aktif</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-500" />
                  <span className="hidden sm:inline">Suara Mati</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {mode === 'home' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            {/* Hero Section */}
            <div className="rounded-3xl bg-gradient-to-br from-sky-50 via-white to-amber-50 border-2 border-sky-200 shadow-[0_8px_0_#BAE6FD] p-6 sm:p-10 mb-10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-4 flex flex-col items-center justify-center">
                  <Kelompok3Banner />
                  <MascotHero className="w-48 h-48 sm:w-52 sm:h-52" />
                </div>

                <div className="md:col-span-8 text-center md:text-left">
                  <p className="text-sm sm:text-base font-bold text-sky-700 mb-2">
                    Bahasa Inggris SD Kelas 3–5 · Listening &amp; Speaking
                  </p>
                  <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight [text-wrap:balance]">
                    My Hobby - English Fun Learning
                  </h1>
                  <p className="text-slate-600 text-base sm:text-lg mt-4 max-w-2xl leading-relaxed">
                    Ayo belajar kosakata hobi dalam bahasa Inggris dengan animasi bergerak,
                    latihan pengucapan memakai mikrofon, dan kuis mendengarkan yang seru!
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <button
                      type="button"
                      onClick={() => navigateTo('learn')}
                      className="btn-tactile min-h-[56px] px-7 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-display font-bold text-lg shadow-[0_5px_0_#0284C7] cursor-pointer whitespace-nowrap"
                    >
                      Mulai Belajar Sekarang
                    </button>

                    <button
                      type="button"
                      onClick={handleSayHello}
                      className="btn-tactile min-h-[56px] px-5 py-3.5 rounded-2xl bg-white hover:bg-amber-50 border-2 border-amber-300 text-slate-800 font-display font-bold text-base shadow-[0_4px_0_#FCD34D] inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
                    >
                      <Volume2 className={`w-5 h-5 text-amber-600 ${heroSpeaking ? 'animate-pulse' : ''}`} />
                      <span>{heroSpeaking ? 'Sedang menyapa...' : 'Dengar Sapaan'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Main Learning Mode Cards */}
            <div className="mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mb-5">
                Pilih Mode Belajar
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Mode 1 Card */}
                <button
                  type="button"
                  onClick={() => navigateTo('learn')}
                  className="btn-tactile text-left rounded-3xl bg-sky-50 hover:bg-sky-100/80 border-2 border-sky-300 shadow-[0_7px_0_#38BDF8] p-6 sm:p-7 flex flex-col justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300"
                >
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-sky-500 text-white flex items-center justify-center mb-5 shadow-sm">
                      <BookOpen className="w-8 h-8" />
                    </div>
                    <h3 className="font-display text-2xl font-extrabold text-sky-950">
                      1. Learn &amp; Listen
                    </h3>
                    <p className="text-slate-700 text-base mt-2 leading-relaxed">
                      Kenali 8 gambar hobi yang bergerak dan dengarkan cara membaca kalimatnya dalam bahasa Inggris.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-sky-200 font-display font-bold text-sky-700 text-lg">
                    Buka Kartu Hobi →
                  </div>
                </button>

                {/* Mode 2 Card */}
                <button
                  type="button"
                  onClick={() => navigateTo('speaking')}
                  className="btn-tactile text-left rounded-3xl bg-emerald-50 hover:bg-emerald-100/80 border-2 border-emerald-300 shadow-[0_7px_0_#34D399] p-6 sm:p-7 flex flex-col justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
                >
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mb-5 shadow-sm">
                      <Mic className="w-8 h-8" />
                    </div>
                    <h3 className="font-display text-2xl font-extrabold text-emerald-950">
                      2. Speaking Practice
                    </h3>
                    <p className="text-slate-700 text-base mt-2 leading-relaxed">
                      Latih keberanianmu berbicara! Ucapkan kalimat hobi ke mikrofon dan dapatkan bintang pujian.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-emerald-200 font-display font-bold text-emerald-700 text-lg">
                    Mulai Berbicara →
                  </div>
                </button>

                {/* Mode 3 Card */}
                <button
                  type="button"
                  onClick={() => navigateTo('quiz')}
                  className="btn-tactile text-left rounded-3xl bg-amber-50 hover:bg-amber-100/80 border-2 border-amber-300 shadow-[0_7px_0_#FBBF24] p-6 sm:p-7 flex flex-col justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300"
                >
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center mb-5 shadow-sm">
                      <Headphones className="w-8 h-8" />
                    </div>
                    <h3 className="font-display text-2xl font-extrabold text-amber-950">
                      3. Listening Quiz
                    </h3>
                    <p className="text-slate-700 text-base mt-2 leading-relaxed">
                      Dengarkan kalimat bahasa Inggris yang diputar, lalu tebak gambar hobi yang paling sesuai!
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-amber-200 font-display font-bold text-amber-800 text-lg">
                    Mainkan Kuis →
                  </div>
                </button>
              </div>
            </div>

            {/* Quick Animated Preview Strip of the 8 Hobbies */}
            <div className="rounded-3xl bg-white border-2 border-slate-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <h2 className="font-display text-xl font-extrabold text-slate-900">
                  8 Hobi yang Akan Kita Pelajari
                </h2>
                <p className="text-sm text-slate-500 font-medium">
                  Klik gambar mana saja untuk mendengarkan namanya
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {HOBBIES.map((hobby) => (
                  <button
                    key={hobby.id}
                    type="button"
                    onClick={() => {
                      playClick();
                      speakEnglish(hobby.englishName, { rate: 0.84 });
                    }}
                    className={`btn-tactile rounded-2xl p-2 border ${hobby.cardBg} ${hobby.cardBorder} hover:scale-[1.03] transition-transform text-center cursor-pointer`}
                  >
                    <HobbyIllustration hobbyId={hobby.id} className="w-full h-20" />
                    <span className={`block mt-1 font-display text-xs font-bold ${hobby.accentText} truncate`}>
                      {hobby.englishName}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {mode === 'learn' && <LearnListenMode onBack={() => navigateTo('home')} />}

        {mode === 'speaking' && (
          <SpeakingPracticeMode onBack={() => navigateTo('home')} onEarnStar={handleEarnStar} />
        )}

        {mode === 'quiz' && (
          <ListeningQuizMode onBack={() => navigateTo('home')} onEarnStar={handleEarnStar} />
        )}
      </main>

      {/* Clean Minimal Footer */}
      <footer className="py-5 px-4 text-center text-sm text-slate-500 border-t border-slate-200 bg-white">
        My Hobby - English Fun Learning · Media Pembelajaran Interaktif Siswa SD Kelas 3–5
      </footer>
    </div>
  );
}
