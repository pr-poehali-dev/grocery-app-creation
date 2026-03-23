import { useState, useEffect, useCallback } from "react";
import { Page } from "@/App";
import Icon from "@/components/ui/icon";

type Props = {
  setPage: (p: Page) => void;
};

const DAILY_PUZZLES = [
  {
    letters: ["М", "О", "Л", "О", "К", "О", "Я", "Б"],
    words: ["МОЛОКО", "МОЛОК", "КОМ", "ОКО", "МОЛ", "ЛОМ", "БОК", "КОБ"],
    hint: "Продукты молочного отдела",
  },
  {
    letters: ["О", "В", "О", "Щ", "И", "С", "А", "Д"],
    words: ["ОВОЩИ", "ОВО", "СОД", "ВОД", "ОСА", "ВОС", "ДИВ"],
    hint: "Свежие и полезные",
  },
  {
    letters: ["Х", "Л", "Е", "Б", "С", "О", "Л", "Ь"],
    words: ["ХЛЕБ", "ЛОБ", "ЛЕС", "ЛОС", "БОЛ", "ЕЛЬ", "СОЛ"],
    hint: "Выпечка и специи",
  },
];

const BONUS_PER_WORD = 5;
const BONUS_COMPLETE = 27;

const getTodayPuzzleIdx = () => {
  const day = new Date().getDate();
  return day % DAILY_PUZZLES.length;
};

type GameState = "idle" | "playing" | "finished";

const GamePage = ({ setPage }: Props) => {
  const puzzle = DAILY_PUZZLES[getTodayPuzzleIdx()];
  const [selected, setSelected] = useState<number[]>([]);
  const [found, setFound] = useState<string[]>([]);
  const [shake, setShake] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const [state, setState] = useState<GameState>("idle");
  const [bonusEarned, setBonusEarned] = useState(0);
  const [alreadyPlayed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [hint, setHint] = useState(false);

  const currentWord = selected.map((i) => puzzle.letters[i]).join("");
  const validWords = puzzle.words.filter((w) => w.length >= 3);
  const maxWords = validWords.length;

  useEffect(() => {
    if (state !== "playing") return;
    if (timeLeft <= 0) {
      setState("finished");
      return;
    }
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [state, timeLeft]);

  const submitWord = useCallback(() => {
    if (currentWord.length < 3) return;
    if (found.includes(currentWord)) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setSelected([]);
      return;
    }
    if (validWords.includes(currentWord)) {
      const newFound = [...found, currentWord];
      setFound(newFound);
      const earned = BONUS_PER_WORD;
      setBonusEarned((p) => p + earned);
      setFlash(currentWord);
      setTimeout(() => setFlash(null), 1000);
      if (newFound.length >= maxWords) {
        setBonusEarned((p) => p + BONUS_COMPLETE);
        setState("finished");
      }
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
    setSelected([]);
  }, [currentWord, found, validWords, maxWords]);

  const toggleLetter = (idx: number) => {
    if (state !== "playing") return;
    setSelected((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const startGame = () => {
    setSelected([]);
    setFound([]);
    setBonusEarned(0);
    setTimeLeft(120);
    setState("playing");
    setHint(false);
  };

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");
  const progress = ((maxWords - (maxWords - found.length)) / maxWords) * 100;

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setPage("home")} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition-colors">
          <Icon name="ArrowLeft" size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-shop-dark">Ежедневная игра</h1>
          <p className="text-xs text-gray-400">Собери слова из букв — получи бонусы</p>
        </div>
        <div className="ml-auto text-right">
          <div className="text-xs text-gray-400">Приз за победу</div>
          <div className="font-black text-shop-green text-lg">+{BONUS_COMPLETE} ⭐</div>
        </div>
      </div>

      {state === "idle" && (
        <div className="animate-fade-in">
          {/* Info card */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 mb-5 text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-xl font-bold text-shop-dark mb-2">Найди все слова!</h2>
            <p className="text-gray-500 text-sm mb-4">
              Собирай слова из предложенных букв (от 3 букв). Тема: «{puzzle.hint}»
            </p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: "Слов", value: `${maxWords}`, emoji: "📝" },
                { label: "Время", value: "2 мин", emoji: "⏱️" },
                { label: "Бонусы", value: `${BONUS_COMPLETE}+`, emoji: "⭐" },
              ].map((s) => (
                <div key={s.label} className="bg-gray-50 rounded-2xl p-3">
                  <div className="text-xl mb-1">{s.emoji}</div>
                  <div className="font-black text-shop-dark">{s.value}</div>
                  <div className="text-xs text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>
            {alreadyPlayed ? (
              <div className="p-3 bg-shop-green-soft rounded-2xl text-sm text-shop-green font-semibold">
                ✅ Сегодня вы уже играли! Приходите завтра за новой игрой.
              </div>
            ) : (
              <button
                onClick={startGame}
                className="w-full py-3 bg-shop-red text-white rounded-xl font-bold text-lg hover:bg-shop-red-light transition-colors"
              >
                Играть
              </button>
            )}
          </div>

          {/* Rules */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-shop-dark mb-3 text-sm">Как играть</h3>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex gap-2"><span>1.</span><span>Нажимай на буквы, чтобы собрать слово</span></div>
              <div className="flex gap-2"><span>2.</span><span>Минимум 3 буквы в слове</span></div>
              <div className="flex gap-2"><span>3.</span><span>За каждое слово +{BONUS_PER_WORD} бонусов</span></div>
              <div className="flex gap-2"><span>4.</span><span>Найди все слова до конца времени — получи +{BONUS_COMPLETE} бонусов</span></div>
            </div>
          </div>
        </div>
      )}

      {state === "playing" && (
        <div className="animate-fade-in">
          {/* Timer + progress */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={16} className={timeLeft <= 30 ? "text-shop-red animate-pulse-soft" : "text-gray-400"} />
                <span className={`font-mono font-bold text-lg ${timeLeft <= 30 ? "text-shop-red" : "text-shop-dark"}`}>
                  {mins}:{secs}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-shop-dark">{found.length}/{maxWords} слов</span>
                <span className="text-sm font-bold text-shop-green">+{bonusEarned} ⭐</span>
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-shop-red to-shop-green rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Current word display */}
          <div className={`bg-white rounded-2xl border-2 ${shake ? "border-shop-red" : flash ? "border-shop-green" : "border-gray-200"} p-4 mb-4 text-center min-h-[60px] flex items-center justify-center transition-colors`}>
            {currentWord ? (
              <span className={`text-2xl font-black tracking-widest ${flash ? "text-shop-green" : "text-shop-dark"}`}>
                {flash ? `✓ ${flash}` : currentWord}
              </span>
            ) : (
              <span className="text-gray-300 text-sm">Нажимай на буквы...</span>
            )}
          </div>

          {/* Letter grid */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {puzzle.letters.map((letter, idx) => {
              const isSelected = selected.includes(idx);
              const selIdx = selected.indexOf(idx);
              return (
                <button
                  key={idx}
                  onClick={() => toggleLetter(idx)}
                  className={`relative h-16 rounded-2xl text-xl font-black transition-all duration-150 select-none ${
                    isSelected
                      ? "bg-shop-red text-white shadow-lg scale-95"
                      : "bg-white text-shop-dark border-2 border-gray-200 hover:border-shop-red hover:text-shop-red hover:scale-105"
                  }`}
                >
                  {letter}
                  {isSelected && (
                    <span className="absolute top-1 right-1.5 text-xs font-bold text-white/70">
                      {selIdx + 1}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mb-4">
            <button
              onClick={() => setSelected([])}
              className="flex-1 py-2.5 bg-gray-100 text-gray-600 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <Icon name="X" size={16} />
              Очистить
            </button>
            <button
              onClick={submitWord}
              disabled={currentWord.length < 3}
              className="flex-1 py-2.5 bg-shop-green text-white rounded-xl font-bold text-sm hover:bg-green-600 transition-colors disabled:opacity-40 flex items-center justify-center gap-1.5"
            >
              <Icon name="Check" size={16} />
              Проверить
            </button>
          </div>

          {/* Hint */}
          {!hint && (
            <button
              onClick={() => setHint(true)}
              className="w-full py-2 text-xs text-gray-400 hover:text-shop-red transition-colors"
            >
              💡 Подсказка (тема: {puzzle.hint})
            </button>
          )}
          {hint && (
            <p className="text-center text-xs text-gray-400 py-2">
              💡 Тема: <span className="font-semibold text-shop-dark">{puzzle.hint}</span>
            </p>
          )}

          {/* Found words */}
          {found.length > 0 && (
            <div className="mt-4 bg-white rounded-2xl border border-gray-100 p-4">
              <p className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wider">Найденные слова</p>
              <div className="flex flex-wrap gap-2">
                {found.map((w) => (
                  <span key={w} className="px-3 py-1 bg-shop-green-soft text-shop-green text-sm font-bold rounded-xl">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {state === "finished" && (
        <div className="animate-scale-in">
          <div className="bg-white rounded-3xl border border-gray-100 p-8 text-center">
            {found.length >= maxWords ? (
              <>
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="text-2xl font-bold text-shop-dark mb-1">Отлично!</h2>
                <p className="text-gray-500 mb-2">Ты нашёл все слова!</p>
              </>
            ) : (
              <>
                <div className="text-6xl mb-4">⏰</div>
                <h2 className="text-2xl font-bold text-shop-dark mb-1">Время вышло!</h2>
                <p className="text-gray-500 mb-2">Найдено {found.length} из {maxWords} слов</p>
              </>
            )}

            <div className="bg-shop-green-soft rounded-2xl p-5 mb-6">
              <div className="text-4xl font-black text-shop-green mb-1">+{bonusEarned} ⭐</div>
              <div className="text-sm text-shop-green">начислено бонусов</div>
            </div>

            {found.length > 0 && (
              <div className="mb-5 text-left">
                <p className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wider">Найденные слова</p>
                <div className="flex flex-wrap gap-2">
                  {found.map((w) => (
                    <span key={w} className="px-3 py-1 bg-shop-green-soft text-shop-green text-sm font-bold rounded-xl">
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <button
                onClick={() => setPage("bonuses")}
                className="w-full py-3 bg-shop-green text-white rounded-xl font-bold hover:bg-green-600 transition-colors"
              >
                Посмотреть бонусы
              </button>
              <button
                onClick={() => setPage("home")}
                className="w-full py-2.5 border border-gray-200 text-gray-500 rounded-xl text-sm font-medium hover:border-shop-red hover:text-shop-red transition-colors"
              >
                На главную
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              Новая игра будет доступна завтра 🌅
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
