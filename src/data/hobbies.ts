export type HobbyId =
  | 'swimming'
  | 'reading'
  | 'football'
  | 'singing'
  | 'dancing'
  | 'drawing'
  | 'cycling'
  | 'cooking';

export interface QuizPrompt {
  en: string;
  id: string;
}

export interface HobbyItem {
  id: HobbyId;
  englishName: string;
  indonesianName: string;
  learnSentence: string;
  learnSentenceId: string;
  speakingTarget: string;
  speakingHintId: string;
  quizPrompts: QuizPrompt[];
  cardBg: string;
  cardBorder: string;
  accentText: string;
  buttonBg: string;
}

export const HOBBIES: HobbyItem[] = [
  {
    id: 'swimming',
    englishName: 'Swimming',
    indonesianName: 'Berenang',
    learnSentence: 'I like swimming.',
    learnSentenceId: 'Saya suka berenang.',
    speakingTarget: 'I like swimming',
    speakingHintId: 'Saya suka berenang',
    quizPrompts: [
      { en: 'He likes swimming.', id: 'Dia (laki-laki) suka berenang.' },
      { en: 'I like swimming.', id: 'Saya suka berenang.' },
      { en: 'She likes swimming.', id: 'Dia (perempuan) suka berenang.' },
    ],
    cardBg: 'bg-sky-50',
    cardBorder: 'border-sky-300',
    accentText: 'text-sky-700',
    buttonBg: 'bg-sky-500 hover:bg-sky-600',
  },
  {
    id: 'reading',
    englishName: 'Reading a book',
    indonesianName: 'Membaca buku',
    learnSentence: 'I like reading a book.',
    learnSentenceId: 'Saya suka membaca buku.',
    speakingTarget: 'I like reading a book',
    speakingHintId: 'Saya suka membaca buku',
    quizPrompts: [
      { en: 'She likes reading a book.', id: 'Dia (perempuan) suka membaca buku.' },
      { en: 'I like reading a book.', id: 'Saya suka membaca buku.' },
      { en: 'He likes reading a book.', id: 'Dia (laki-laki) suka membaca buku.' },
    ],
    cardBg: 'bg-amber-50',
    cardBorder: 'border-amber-300',
    accentText: 'text-amber-800',
    buttonBg: 'bg-amber-500 hover:bg-amber-600',
  },
  {
    id: 'football',
    englishName: 'Playing football',
    indonesianName: 'Bermain sepak bola',
    learnSentence: 'I like playing football.',
    learnSentenceId: 'Saya suka bermain sepak bola.',
    speakingTarget: 'I like playing football',
    speakingHintId: 'Saya suka bermain sepak bola',
    quizPrompts: [
      { en: 'He likes playing football.', id: 'Dia (laki-laki) suka bermain sepak bola.' },
      { en: 'They like playing football.', id: 'Mereka suka bermain sepak bola.' },
      { en: 'I like playing football.', id: 'Saya suka bermain sepak bola.' },
    ],
    cardBg: 'bg-emerald-50',
    cardBorder: 'border-emerald-300',
    accentText: 'text-emerald-800',
    buttonBg: 'bg-emerald-500 hover:bg-emerald-600',
  },
  {
    id: 'singing',
    englishName: 'Singing',
    indonesianName: 'Menyanyi',
    learnSentence: 'I like singing.',
    learnSentenceId: 'Saya suka menyanyi.',
    speakingTarget: 'I like singing',
    speakingHintId: 'Saya suka menyanyi',
    quizPrompts: [
      { en: 'She likes singing.', id: 'Dia (perempuan) suka menyanyi.' },
      { en: 'I like singing.', id: 'Saya suka menyanyi.' },
      { en: 'He likes singing.', id: 'Dia (laki-laki) suka menyanyi.' },
    ],
    cardBg: 'bg-rose-50',
    cardBorder: 'border-rose-300',
    accentText: 'text-rose-700',
    buttonBg: 'bg-rose-500 hover:bg-rose-600',
  },
  {
    id: 'dancing',
    englishName: 'Dancing',
    indonesianName: 'Menari',
    learnSentence: 'I like dancing.',
    learnSentenceId: 'Saya suka menari.',
    speakingTarget: 'I like dancing',
    speakingHintId: 'Saya suka menari',
    quizPrompts: [
      { en: 'She likes dancing.', id: 'Dia (perempuan) suka menari.' },
      { en: 'They like dancing.', id: 'Mereka suka menari.' },
      { en: 'I like dancing.', id: 'Saya suka menari.' },
    ],
    cardBg: 'bg-orange-50',
    cardBorder: 'border-orange-300',
    accentText: 'text-orange-800',
    buttonBg: 'bg-orange-500 hover:bg-orange-600',
  },
  {
    id: 'drawing',
    englishName: 'Drawing',
    indonesianName: 'Menggambar',
    learnSentence: 'I like drawing.',
    learnSentenceId: 'Saya suka menggambar.',
    speakingTarget: 'I like drawing',
    speakingHintId: 'Saya suka menggambar',
    quizPrompts: [
      { en: 'She likes drawing.', id: 'Dia (perempuan) suka menggambar.' },
      { en: 'He likes drawing.', id: 'Dia (laki-laki) suka menggambar.' },
      { en: 'I like drawing.', id: 'Saya suka menggambar.' },
    ],
    cardBg: 'bg-teal-50',
    cardBorder: 'border-teal-300',
    accentText: 'text-teal-800',
    buttonBg: 'bg-teal-500 hover:bg-teal-600',
  },
  {
    id: 'cycling',
    englishName: 'Cycling',
    indonesianName: 'Bersepeda',
    learnSentence: 'I like cycling.',
    learnSentenceId: 'Saya suka bersepeda.',
    speakingTarget: 'I like cycling',
    speakingHintId: 'Saya suka bersepeda',
    quizPrompts: [
      { en: 'He likes cycling.', id: 'Dia (laki-laki) suka bersepeda.' },
      { en: 'I like cycling.', id: 'Saya suka bersepeda.' },
      { en: 'She likes cycling.', id: 'Dia (perempuan) suka bersepeda.' },
    ],
    cardBg: 'bg-cyan-50',
    cardBorder: 'border-cyan-300',
    accentText: 'text-cyan-800',
    buttonBg: 'bg-cyan-500 hover:bg-cyan-600',
  },
  {
    id: 'cooking',
    englishName: 'Cooking',
    indonesianName: 'Memasak',
    learnSentence: 'I like cooking.',
    learnSentenceId: 'Saya suka memasak.',
    speakingTarget: 'I like cooking',
    speakingHintId: 'Saya suka memasak',
    quizPrompts: [
      { en: 'She likes cooking.', id: 'Dia (perempuan) suka memasak.' },
      { en: 'He likes cooking.', id: 'Dia (laki-laki) suka memasak.' },
      { en: 'I like cooking.', id: 'Saya suka memasak.' },
    ],
    cardBg: 'bg-yellow-50',
    cardBorder: 'border-yellow-300',
    accentText: 'text-yellow-800',
    buttonBg: 'bg-yellow-500 hover:bg-yellow-600',
  },
];
