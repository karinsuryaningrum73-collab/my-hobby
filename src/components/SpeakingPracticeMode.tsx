import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Mic,
  MicOff,
  RotateCcw,
  Star,
  Volume2,
} from 'lucide-react';
import { HOBBIES, HobbyId } from '../data/hobbies';
import { HobbyIllustration } from './HobbyIllustration';
import { ConfettiBurst } from './ConfettiBurst';
import { playClick, playStar, playStartMic, playWrong } from '../utils/soundEffects';
import {
  BrowserSpeechRecognition,
  PronunciationEvaluation,
  evaluatePronunciation,
  getSpeechRecognitionConstructor,
  speakEnglish,
  stopSpeaking,
} from '../utils/speech';

interface SpeakingPracticeModeProps {
  onBack: () => void;
  onEarnStar: (hobbyKey: string) => void;
}

export const SpeakingPracticeMode: React.FC<SpeakingPracticeModeProps> = ({
  onBack,
  onEarnStar,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpeakingExample, setIsSpeakingExample] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [evaluation, setEvaluation] = useState<PronunciationEvaluation | null>(null);
  const [micError, setMicError] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [completedHobbies, setCompletedHobbies] = useState<Set<HobbyId>>(new Set());
  const [manualInput, setManualInput] = useState('');

  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const sttSupported = getSpeechRecognitionConstructor() !== null;
  const currentHobby = HOBBIES[currentIndex];

  useEffect(() => {
    return () => {
      stopSpeaking();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const resetAttempt = () => {
    setEvaluation(null);
    setInterimTranscript('');
    setMicError(null);
    setShowConfetti(false);
    setManualInput('');
  };

  const selectHobby = (index: number) => {
    playClick();
    stopSpeaking();
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
    setCurrentIndex(index);
    resetAttempt();
  };

  const handleListenExample = () => {
    playClick();
    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
    }

    speakEnglish(currentHobby.speakingTarget, {
      rate: 0.82,
      onStart: () => setIsSpeakingExample(true),
      onEnd: () => setIsSpeakingExample(false),
      onError: () => setIsSpeakingExample(false),
    });
  };

  const handleEvaluationResult = (candidates: string[]) => {
    const result = evaluatePronunciation(currentHobby.speakingTarget, candidates);
    setEvaluation(result);

    if (result.isSuccess) {
      playStar();
      setShowConfetti(true);
      setCompletedHobbies((prev) => {
        const next = new Set(prev);
        next.add(currentHobby.id);
        return next;
      });
      onEarnStar(`speaking-${currentHobby.id}`);
      setTimeout(() => setShowConfetti(false), 1800);
    } else {
      playWrong();
    }
  };

  const handleStartMic = () => {
    if (isListening && recognitionRef.current) {
      playClick();
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
      return;
    }

    stopSpeaking();
    setIsSpeakingExample(false);
    resetAttempt();

    const SpeechRec = getSpeechRecognitionConstructor();
    if (!SpeechRec) {
      setMicError(
        'Browser ini tidak mendukung fitur mikrofon Speech Recognition. Silakan gunakan Google Chrome atau Microsoft Edge, atau ketik kalimatmu di bawah ini untuk latihan.'
      );
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 3;

      let gotFinal = false;

      recognition.onstart = () => {
        playStartMic();
        setIsListening(true);
        setMicError(null);
      };

      recognition.onresult = (event) => {
        let interim = '';
        const finalCandidates: string[] = [];

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            gotFinal = true;
            for (let a = 0; a < result.length; a++) {
              finalCandidates.push(result[a].transcript);
            }
          } else {
            interim += result[0].transcript;
          }
        }

        if (interim) {
          setInterimTranscript(interim);
        }

        if (gotFinal && finalCandidates.length > 0) {
          setInterimTranscript(finalCandidates[0]);
          handleEvaluationResult(finalCandidates);
        }
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setMicError(
            'Izin mikrofon ditolak. Klik ikon gembok/mikrofon di address bar browser dan pilih Izinkan (Allow), lalu coba lagi.'
          );
        } else if (event.error === 'no-speech') {
          setMicError('Suara belum terdengar. Dekatkan mikrofon dan ucapkan kalimatnya dengan jelas ya!');
        } else if (event.error !== 'aborted') {
          setMicError('Mikrofon mengalami gangguan sebentar. Yuk klik tombol Mulai Bicara lagi.');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
      setMicError('Tidak dapat memulai mikrofon. Pastikan izin mikrofon aktif di browser kamu.');
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    playClick();
    handleEvaluationResult([manualInput.trim()]);
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
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
              2. Speaking Practice
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-0.5">
              Dengarkan contohnya, lalu tekan tombol mikrofon dan ucapkan kalimat bahasa Inggrisnya!
            </p>
          </div>
        </div>

        <div className="text-sm font-semibold text-slate-600 tabular-nums whitespace-nowrap">
          Selesai: <strong className="text-emerald-700">{completedHobbies.size} / {HOBBIES.length}</strong> hobi
        </div>
      </div>

      {/* Hobby Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
        {HOBBIES.map((hobby, idx) => {
          const isCurrent = idx === currentIndex;
          const isDone = completedHobbies.has(hobby.id);
          return (
            <button
              key={hobby.id}
              type="button"
              onClick={() => selectHobby(idx)}
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer border-2 flex items-center gap-1.5 ${
                isCurrent
                  ? 'bg-sky-600 text-white border-sky-700 shadow-sm'
                  : isDone
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {isDone && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />}
              <span>{hobby.englishName}</span>
            </button>
          );
        })}
      </div>

      {/* Main Practice Stage */}
      <div className="relative rounded-3xl bg-white border-2 border-slate-200 shadow-[0_8px_0_#E2E8F0] p-6 sm:p-8 overflow-hidden">
        <ConfettiBurst active={showConfetti} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Left: Large Animated Hobby Character */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className={`w-full rounded-3xl p-4 border-2 ${currentHobby.cardBg} ${currentHobby.cardBorder}`}>
              <HobbyIllustration hobbyId={currentHobby.id} className="w-full h-52 sm:h-60" />
            </div>
          </div>

          {/* Right: Target Sentence & Big Mic Controls */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <p className="text-sm font-bold text-slate-500 mb-2">
                Ucapkan kalimat ini dalam bahasa Inggris:
              </p>

              <div className="rounded-2xl bg-slate-50 border-2 border-slate-200 p-5 mb-6">
                <p className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                  “{currentHobby.speakingTarget}.”
                </p>
                <p className="text-slate-600 text-base sm:text-lg font-medium mt-2">
                  Arti: {currentHobby.speakingHintId}
                </p>
              </div>
            </div>

            {/* Big Interactive Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleListenExample}
                className={`btn-tactile min-h-[64px] px-5 py-4 rounded-2xl border-2 font-display font-bold text-lg flex items-center justify-center gap-3 cursor-pointer ${
                  isSpeakingExample
                    ? 'bg-amber-100 border-amber-400 text-amber-900 shadow-[0_4px_0_#F59E0B]'
                    : 'bg-amber-400 hover:bg-amber-500 border-amber-500 text-slate-900 shadow-[0_5px_0_#D97706]'
                }`}
              >
                <Volume2 className={`w-6 h-6 shrink-0 ${isSpeakingExample ? 'animate-pulse' : ''}`} />
                <span className="whitespace-nowrap">
                  {isSpeakingExample ? 'Sedang Memutar...' : 'Dengarkan Contoh'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleStartMic}
                className={`btn-tactile min-h-[64px] px-5 py-4 rounded-2xl border-2 font-display font-bold text-lg flex items-center justify-center gap-3 cursor-pointer text-white ${
                  isListening
                    ? 'bg-rose-500 hover:bg-rose-600 border-rose-700 shadow-[0_5px_0_#BE123C] ring-4 ring-rose-200'
                    : 'bg-emerald-500 hover:bg-emerald-600 border-emerald-700 shadow-[0_5px_0_#047857]'
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-6 h-6 shrink-0 animate-pulse" />
                    <span className="whitespace-nowrap">Berhenti Bicara</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-6 h-6 shrink-0" />
                    <span className="whitespace-nowrap">Mulai Bicara</span>
                  </>
                )}
              </button>
            </div>

            {/* Active Listening Waveform */}
            {isListening && (
              <div className="mt-5 p-4 rounded-2xl bg-sky-50 border-2 border-sky-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 h-7" aria-hidden="true">
                    <span className="w-1.5 h-6 bg-sky-500 rounded-full anim-sound-bar" />
                    <span
                      className="w-1.5 h-7 bg-sky-600 rounded-full anim-sound-bar"
                      style={{ animationDelay: '0.15s' }}
                    />
                    <span
                      className="w-1.5 h-5 bg-sky-500 rounded-full anim-sound-bar"
                      style={{ animationDelay: '0.3s' }}
                    />
                    <span
                      className="w-1.5 h-7 bg-sky-600 rounded-full anim-sound-bar"
                      style={{ animationDelay: '0.45s' }}
                    />
                  </div>
                  <div>
                    <p className="font-bold text-sky-900 text-sm sm:text-base">
                      Sedang mendengarkan... Ayo ucapkan!
                    </p>
                    {interimTranscript && (
                      <p className="text-sky-700 text-sm italic">“{interimTranscript}”</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Mic Error / Browser Fallback */}
            {micError && (
              <div className="mt-5 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 text-sm font-medium">
                {micError}
              </div>
            )}

            {!sttSupported && (
              <form onSubmit={handleManualSubmit} className="mt-5 flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  placeholder={`Ketik kalimat: ${currentHobby.speakingTarget}`}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-300 text-slate-900 font-medium focus:outline-none focus:border-sky-500"
                />
                <button
                  type="submit"
                  className="btn-tactile px-5 py-3 rounded-xl bg-sky-600 text-white font-bold cursor-pointer"
                >
                  Cek Kalimat
                </button>
              </form>
            )}

            {/* Encouraging Evaluation Result */}
            {evaluation && !isListening && (
              <div
                className={`mt-5 rounded-2xl p-5 border-2 ${
                  evaluation.isSuccess
                    ? 'bg-emerald-50 border-emerald-300'
                    : 'bg-orange-50 border-orange-300'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {evaluation.isSuccess ? (
                      <>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          <Star className="w-6 h-6 fill-amber-400" />
                          <Star className="w-7 h-7 fill-amber-400" />
                          <Star className="w-6 h-6 fill-amber-400" />
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-extrabold text-emerald-800">
                          Great Job! Excellent!
                        </h3>
                      </>
                    ) : (
                      <h3 className="font-display text-xl font-extrabold text-orange-900">
                        Almost there! Let&apos;s try again.
                      </h3>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleStartMic}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-700 hover:text-slate-900 underline cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Coba Ucapkan Lagi</span>
                  </button>
                </div>

                {evaluation.bestTranscript && (
                  <p className="text-sm text-slate-700 mb-3">
                    Suaramu terdengar seperti:{' '}
                    <strong className="text-slate-900">“{evaluation.bestTranscript}”</strong>
                  </p>
                )}

                {/* Word-by-word pronunciation indicator */}
                <div className="flex flex-wrap items-center gap-2">
                  {evaluation.wordResults.map((wr, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-xl text-base font-bold border ${
                        wr.matched
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                          : 'bg-rose-100 border-rose-300 text-rose-900'
                      }`}
                    >
                      {wr.word} {wr.matched ? '✓' : '✕'}
                    </span>
                  ))}
                </div>

                {!evaluation.isSuccess && evaluation.missedWords.length > 0 && (
                  <p className="text-sm font-semibold text-orange-900 mt-3">
                    Kata yang perlu diucapkan lebih jelas:{' '}
                    <span className="underline">{evaluation.missedWords.join(', ')}</span>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Prev / Next Hobby Navigation */}
        <div className="mt-8 pt-5 border-t border-slate-200 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => selectHobby((currentIndex - 1 + HOBBIES.length) % HOBBIES.length)}
            className="btn-tactile inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Hobi Sebelumnya</span>
          </button>

          <span className="text-sm font-bold text-slate-500 tabular-nums">
            {currentIndex + 1} / {HOBBIES.length}
          </span>

          <button
            type="button"
            onClick={() => selectHobby((currentIndex + 1) % HOBBIES.length)}
            className="btn-tactile inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-[0_4px_0_#0369A1] cursor-pointer"
          >
            <span>Hobi Berikutnya</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
