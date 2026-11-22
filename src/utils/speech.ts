// Web Speech API utilities: Text-to-Speech (TTS) and Speech Recognition (STT)

export function isTTSSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function stopSpeaking(): void {
  if (!isTTSSupported()) return;
  window.speechSynthesis.cancel();
}

function pickBestEnglishVoice(): SpeechSynthesisVoice | null {
  if (!isTTSSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const preferredKeywords = ['Natural', 'Google US English', 'Samantha', 'Daniel', 'Karen', 'Alex'];
  for (const kw of preferredKeywords) {
    const match = voices.find(
      (v) => v.lang.startsWith('en') && v.name.toLowerCase().includes(kw.toLowerCase())
    );
    if (match) return match;
  }

  return (
    voices.find((v) => v.lang === 'en-US') ||
    voices.find((v) => v.lang === 'en-GB') ||
    voices.find((v) => v.lang.startsWith('en')) ||
    null
  );
}

export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}

export function speakEnglish(text: string, options: SpeakOptions = {}): void {
  if (!isTTSSupported()) {
    options.onError?.();
    return;
  }

  const { rate = 0.85, pitch = 1.05, onStart, onEnd, onError } = options;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = rate;
  utterance.pitch = pitch;

  const voice = pickBestEnglishVoice();
  if (voice) {
    utterance.voice = voice;
  }

  utterance.onstart = () => {
    onStart?.();
  };
  utterance.onend = () => {
    onEnd?.();
  };
  utterance.onerror = () => {
    onError?.();
  };

  window.speechSynthesis.speak(utterance);
}

// Speech Recognition types
export interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

export interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

export interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

export interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

export interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

export interface BrowserSpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

export function getSpeechRecognitionConstructor(): (new () => BrowserSpeechRecognition) | null {
  if (typeof window === 'undefined') return null;
  const win = window as unknown as {
    SpeechRecognition?: new () => BrowserSpeechRecognition;
    webkitSpeechRecognition?: new () => BrowserSpeechRecognition;
  };
  return win.SpeechRecognition || win.webkitSpeechRecognition || null;
}

export function isSpeechRecognitionSupported(): boolean {
  return getSpeechRecognitionConstructor() !== null;
}

export interface WordMatchResult {
  word: string;
  matched: boolean;
}

export interface PronunciationEvaluation {
  isSuccess: boolean;
  score: number; // 0 to 1
  bestTranscript: string;
  wordResults: WordMatchResult[];
  missedWords: string[];
}

const SYNONYM_EQUIVALENTS: Record<string, string[]> = {
  i: ['eye', 'ai'],
  like: ['likes', 'liked', 'light', 'life'],
  swimming: ['swim', 'swiming'],
  reading: ['read', 'reeding'],
  a: ['uh', 'the', 'ah'],
  book: ['books', 'look'],
  playing: ['play', 'laying'],
  football: ['soccer', 'footbal', 'ball'],
  singing: ['sing', 'singer'],
  dancing: ['dance', 'dansing'],
  drawing: ['draw', 'drawings'],
  cycling: ['cycle', 'biking', 'bicycle', 'bike'],
  cooking: ['cook', 'cooks'],
};

function normalizeWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, ' ')
    .replace(/\bi'm\b/g, 'i am')
    .split(/\s+/)
    .filter(Boolean);
}

function isWordClose(target: string, spokenWords: string[]): boolean {
  if (spokenWords.includes(target)) return true;

  const alts = SYNONYM_EQUIVALENTS[target] || [];
  if (spokenWords.some((sw) => alts.includes(sw))) return true;

  // Allow slight Levenshtein distance <= 1 for words >= 4 chars (child accent forgiveness)
  if (target.length >= 4) {
    for (const sw of spokenWords) {
      if (Math.abs(sw.length - target.length) <= 2 && levenshtein(target, sw) <= 1) {
        return true;
      }
      if (sw.startsWith(target.slice(0, 4)) && target.length >= 5) {
        return true;
      }
    }
  }
  return false;
}

function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[a.length][b.length];
}

export function evaluatePronunciation(
  targetSentence: string,
  transcriptCandidates: string[]
): PronunciationEvaluation {
  const targetRawWords = targetSentence.split(/\s+/).filter(Boolean);
  const targetCleanWords = normalizeWords(targetSentence);

  let bestEval: PronunciationEvaluation | null = null;

  const candidates = transcriptCandidates.length > 0 ? transcriptCandidates : [''];

  for (const candidate of candidates) {
    const spokenWords = normalizeWords(candidate);
    const wordResults: WordMatchResult[] = targetRawWords.map((raw, idx) => {
      const clean = targetCleanWords[idx] || raw.toLowerCase();
      return {
        word: raw,
        matched: isWordClose(clean, spokenWords),
      };
    });

    const matchedCount = wordResults.filter((w) => w.matched).length;
    const score = targetRawWords.length > 0 ? matchedCount / targetRawWords.length : 0;
    const missedWords = wordResults.filter((w) => !w.matched).map((w) => w.word);

    // Key hobby word (usually the last 1-2 words) must also be matched for full success
    const lastWordMatched = wordResults[wordResults.length - 1]?.matched ?? false;
    const isSuccess = score >= 0.75 && lastWordMatched;

    const current: PronunciationEvaluation = {
      isSuccess,
      score,
      bestTranscript: candidate,
      wordResults,
      missedWords,
    };

    if (!bestEval || current.score > bestEval.score || (current.isSuccess && !bestEval.isSuccess)) {
      bestEval = current;
    }
  }

  return (
    bestEval || {
      isSuccess: false,
      score: 0,
      bestTranscript: '',
      wordResults: targetRawWords.map((w) => ({ word: w, matched: false })),
      missedWords: targetRawWords,
    }
  );
}
