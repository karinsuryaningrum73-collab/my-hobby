import React, { useCallback, useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Star,
  Volume2,
  XCircle,
} from 'lucide-react';
import { HOBBIES, HobbyId, HobbyItem, QuizPrompt } from '../data/hobbies';
import { HobbyIllustration } from './HobbyIllustration';
import { ConfettiBurst } from './ConfettiBurst';
import { playClick, playCorrect, playStar, playWrong } from '../utils/soundEffects';
import { speakEnglish, stopSpeaking } from '../utils/speech';

interface QuizQuestion {
  target: HobbyItem;
  prompt: QuizPrompt;
  options: HobbyItem[];
}

interface ListeningQuizModeProps {
  onBack: () => void;
  onEarnStar: (questionKey: string) => void;
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function generateQuizQuestions(): QuizQuestion[] {
  const shuffledTargets = shuffleArray(HOBBIES);
  return shuffledTargets.map((target) => {
    const distractors = shuffleArray(HOBBIES.filter((h) => h.id !== target.id)).slice(0, 2);
    const options = shuffleArray([target, ...distractors]);
    const prompt =
      target.quizPrompts[Math.floor(Math.random() * target.quizPrompts.length)];
    return { target, prompt, options };
  });
}

export const ListeningQuizMode: React.FC<ListeningQuizModeProps> = ({
  onBack,
  onEarnStar,
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => generateQuizQuestions());
  const [questionIndex, setQuestionIndex] = useState(0);
  const [stars, setStars] = useState(0);
  const [wrongIds, setWrongIds] = useState<Set<HobbyId>>(new Set());
  const [shakingId, setShakingId] = useState<HobbyId | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentQuestion = questions[questionIndex];

  const playQuestionAudio = useCallback(
    (rate = 0.84) => {
      if (!currentQuestion) return;
      speakEnglish(currentQuestion.prompt.en, {
        rate,
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    },
    [currentQuestion]
  );

  // Automatically play spoken sentence when entering a new question (without showing text!)
  useEffect(() => {
    if (quizFinished) return;
    const timer = setTimeout(() => {
      playQuestionAudio(0.84);
    }, 280);
    return () => {
      clearTimeout(timer);
      stopSpeaking();
    };
  }, [questionIndex, quizFinished, playQuestionAudio]);

  const handleOptionClick = (option: HobbyItem) => {
    if (isSolved || wrongIds.has(option.id)) return;

    if (option.id === currentQuestion.target.id) {
      playCorrect();
      setIsSolved(true);
      setShowConfetti(true);

      // Award star if solved cleanly on first try
      if (wrongIds.size === 0) {
        setStars((prev) => prev + 1);
        onEarnStar(`quiz-${questionIndex}-${currentQuestion.target.id}`);
      }

      setTimeout(() => setShowConfetti(false), 1600);
    } else {
      playWrong();
      setShakingId(option.id);
      setWrongIds((prev) => {
        const next = new Set(prev);
        next.add(option.id);
        return next;
      });
      setTimeout(() => setShakingId(null), 500);
    }
  };

  const handleNextQuestion = () => {
    playClick();
    stopSpeaking();
    if (questionIndex + 1 >= questions.length) {
      playStar();
      setQuizFinished(true);
      setShowConfetti(true);
    } else {
      setQuestionIndex((prev) => prev + 1);
      setWrongIds(new Set());
      setIsSolved(false);
      setShowConfetti(false);
    }
  };

  const handleRestartQuiz = () => {
    playClick();
    stopSpeaking();
    setQuestions(generateQuizQuestions());
    setQuestionIndex(0);
    setStars(0);
    setWrongIds(new Set());
    setIsSolved(false);
    setQuizFinished(false);
    setShowConfetti(false);
  };

  if (quizFinished) {
    return (
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="relative rounded-3xl bg-white border-2 border-amber-300 shadow-[0_8px_0_#F59E0B] p-8 sm:p-10 text-center overflow-hidden">
          <ConfettiBurst active={showConfetti} />

          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Star className="w-12 h-12 fill-amber-400 text-amber-500" />
            <Star className="w-16 h-16 fill-amber-400 text-amber-500 -mt-3" />
            <Star className="w-12 h-12 fill-amber-400 text-amber-500" />
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
            {stars >= 6 ? 'Super Star! Amazing Job!' : 'Great Effort! Keep Practicing!'}
          </h1>
          <p className="text-slate-600 text-lg mt-2">
            Kamu menyelesaikan semua {questions.length} soal Listening Quiz!
          </p>

          <div className="my-7 inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-amber-50 border-2 border-amber-300">
            <Star className="w-8 h-8 fill-amber-400 text-amber-500" />
            <span className="font-display text-3xl font-extrabold text-amber-900 tabular-nums">
              {stars} / {questions.length} Bintang
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={handleRestartQuiz}
              className="btn-tactile w-full sm:w-auto min-h-[56px] px-7 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-display font-bold text-lg shadow-[0_5px_0_#0284C7] inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Main Lagi</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playClick();
                onBack();
              }}
              className="btn-tactile w-full sm:w-auto min-h-[56px] px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-800 font-display font-bold text-lg shadow-[0_4px_0_#CBD5E1] inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali ke Menu</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Top Quiz Bar with Progress & Star Score */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
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
              3. Listening Quiz
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              Dengarkan suaranya, lalu pilih gambar hobi yang cocok!
            </p>
          </div>
        </div>

        {/* Quiz Score & Question Progress */}
        <div className="flex items-center gap-5 bg-white border-2 border-slate-200 rounded-2xl px-5 py-2.5 shadow-sm">
          <span className="text-sm sm:text-base font-bold text-slate-700 tabular-nums">
            Soal {questionIndex + 1} dari {questions.length}
          </span>
          <span className="text-slate-300" aria-hidden="true">|</span>
          <div className="flex items-center gap-1.5 font-display text-lg font-extrabold text-amber-700 tabular-nums">
            <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
            <span>{stars}</span>
          </div>
        </div>
      </div>

      {/* Audio Prompt Stage (Text hidden until answered!) */}
      <div className="relative rounded-3xl bg-white border-2 border-sky-200 shadow-[0_7px_0_#BAE6FD] p-6 sm:p-8 mb-7 overflow-hidden">
        <ConfettiBurst active={showConfetti} />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${
                isSpeaking ? 'bg-sky-500 text-white' : 'bg-sky-100 text-sky-700'
              }`}
            >
              {isSpeaking ? (
                <div className="flex items-center gap-1 h-7" aria-label="Sedang memutar suara">
                  <span className="w-1.5 h-6 bg-white rounded-full anim-sound-bar" />
                  <span
                    className="w-1.5 h-7 bg-white rounded-full anim-sound-bar"
                    style={{ animationDelay: '0.15s' }}
                  />
                  <span
                    className="w-1.5 h-5 bg-white rounded-full anim-sound-bar"
                    style={{ animationDelay: '0.3s' }}
                  />
                </div>
              ) : (
                <Volume2 className="w-8 h-8" />
              )}
            </div>

            <div>
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900">
                {isSolved
                  ? `“${currentQuestion.prompt.en}”`
                  : isSpeaking
                    ? 'Dengarkan baik-baik...'
                    : 'Pilih satu gambar hobi sesuai suara!'}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-1">
                {isSolved
                  ? `Arti: ${currentQuestion.prompt.id}`
                  : 'Teks sengaja disembunyikan agar kamu berlatih mendengarkan.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                playClick();
                playQuestionAudio(0.84);
              }}
              className="btn-tactile min-h-[52px] px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-display font-bold text-base sm:text-lg shadow-[0_4px_0_#0284C7] inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Volume2 className="w-5 h-5" />
              <span>Ulangi Suara</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playClick();
                playQuestionAudio(0.64);
              }}
              className="btn-tactile min-h-[52px] px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm sm:text-base border-2 border-slate-200 cursor-pointer whitespace-nowrap"
            >
              Suara Pelan
            </button>
          </div>
        </div>
      </div>

      {/* 3 SVG Animated Choice Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {currentQuestion.options.map((option) => {
          const isWrong = wrongIds.has(option.id);
          const isCorrectSolved = isSolved && option.id === currentQuestion.target.id;
          const isShaking = shakingId === option.id;

          return (
            <button
              key={option.id}
              type="button"
              disabled={isSolved || isWrong}
              onClick={() => handleOptionClick(option)}
              className={`btn-tactile rounded-3xl p-5 border-3 transition-all flex flex-col items-center text-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 ${
                isShaking ? 'anim-shake' : ''
              } ${
                isCorrectSolved
                  ? 'bg-emerald-50 border-emerald-500 ring-4 ring-emerald-200 shadow-[0_6px_0_#10B981]'
                  : isWrong
                    ? 'bg-rose-50/70 border-rose-300 opacity-65 cursor-not-allowed'
                    : 'bg-white border-slate-200 hover:border-sky-400 shadow-[0_6px_0_#CBD5E1] hover:-translate-y-1 cursor-pointer'
              }`}
            >
              <div className="w-full rounded-2xl bg-slate-50/80 p-2 mb-4">
                <HobbyIllustration hobbyId={option.id} className="w-full h-44" />
              </div>

              {/* Show status or subtle label after interaction */}
              {isCorrectSolved ? (
                <div className="flex items-center gap-2 text-emerald-800 font-display font-extrabold text-xl">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <span>Benar! {option.englishName}</span>
                </div>
              ) : isWrong ? (
                <div className="flex items-center gap-2 text-rose-700 font-bold text-base">
                  <XCircle className="w-5 h-5" />
                  <span>Bukan {option.englishName}</span>
                </div>
              ) : (
                <span className="font-display font-bold text-lg text-slate-800">
                  Pilih Gambar Ini
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback Banner & Next Button */}
      {wrongIds.size > 0 && !isSolved && (
        <div className="mt-6 p-4 rounded-2xl bg-orange-50 border-2 border-orange-300 text-orange-950 font-semibold text-center">
          Belum tepat! Klik <strong>Ulangi Suara</strong> dan coba pilih gambar lainnya ya.
        </div>
      )}

      {isSolved && (
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-3xl bg-emerald-50 border-2 border-emerald-300">
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 fill-amber-400 text-amber-500 shrink-0" />
            <div>
              <p className="font-display text-xl font-extrabold text-emerald-900">
                {wrongIds.size === 0 ? 'Hebat! +1 Bintang untukmu!' : 'Bagus! Kamu berhasil menemukannya!'}
              </p>
              <p className="text-emerald-800 text-sm sm:text-base">
                {currentQuestion.prompt.en} — {currentQuestion.prompt.id}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleNextQuestion}
            className="btn-tactile w-full sm:w-auto min-h-[54px] px-7 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-display font-bold text-lg shadow-[0_5px_0_#047857] inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span>
              {questionIndex + 1 >= questions.length ? 'Lihat Hasil Akhir' : 'Soal Berikutnya'}
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </section>
  );
};
