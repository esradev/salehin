import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  XCircle,
} from 'lucide-react';
import { ROLE_THEMES } from '../theme/roleThemes';
import { QuizItem, UserProfile } from '../types';

interface QuizTakingPageProps {
  quiz: QuizItem;
  currentUser: UserProfile;
  onBack: () => void;
  onAwardPoints: (points: number) => void;
}

export const QuizTakingPage: React.FC<QuizTakingPageProps> = ({
  quiz,
  currentUser,
  onBack,
  onAwardPoints,
}) => {
  const theme = ROLE_THEMES[currentUser.role];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  const handleSelectAnswer = (qIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [qIndex]: optionIndex,
    });
  };

  const handleSubmit = () => {
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });
    const calculatedScore = Math.round((correctCount / quiz.questions.length) * 100);
    setQuizScore(calculatedScore);
    setQuizSubmitted(true);

    if (calculatedScore >= quiz.passedScore) {
      onAwardPoints(quiz.rewardPoints);
    }
  };

  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  const currentQ = quiz.questions[currentQuestionIndex];

  return (
    <div className="space-y-6 pb-16 text-right max-w-3xl mx-auto">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 bg-white px-3 py-1.5 rounded-lg border border-stone-200 transition-colors shadow-xs"
        >
          <ArrowRight size={15} />
          <span>بازگشت به مرکز آموزش</span>
        </button>

        <span className="text-xs text-stone-500 font-mono tabular-nums">
          آزمون: {quiz.category} · {quiz.durationMinutes} دقیقه
        </span>
      </div>

      {/* Quiz Banner */}
      <div className={`p-6 sm:p-7 rounded-2xl text-white bg-gradient-to-br ${theme.bannerGradient} border ${theme.bannerBorder} shadow-lg relative overflow-hidden`}>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-black/30 border border-white/20 text-xs font-semibold">
            <Trophy size={14} className={theme.accentText} />
            <span>آزمون سنجش دانایی و ارتقای شایستگی صالحین</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">{quiz.title}</h1>
          <p className="text-xs sm:text-sm text-stone-300">
            مخاطب دوره: <strong>{quiz.targetAudience}</strong>. گذراندن موفق این آزمون با حداقل نمره {quiz.passedScore}، دارای {quiz.rewardPoints} امتیاز در کارنامه شماست.
          </p>
        </div>
      </div>

      {/* Main Full Page Quiz Body */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
        {!quizSubmitted ? (
          <>
            {/* Progress Header */}
            <div className="space-y-2 pb-4 border-b border-stone-100">
              <div className="flex items-center justify-between text-xs text-stone-600 font-bold">
                <span>پرسش شماره {currentQuestionIndex + 1} از {quiz.questions.length}</span>
                <span className="font-mono tabular-nums">{quiz.rewardPoints} نمره پاداش شایستگی</span>
              </div>
              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1A3326] transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 leading-relaxed bg-stone-50 p-5 rounded-2xl border border-stone-200/80">
                {currentQ.question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectAnswer(currentQuestionIndex, optIdx)}
                      className={`w-full text-right p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#F2F7F4] border-[#1A3326] text-[#122219] ring-2 ring-[#1A3326]/20 font-bold shadow-xs'
                          : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-800'
                      }`}
                    >
                      <span>{opt}</span>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mr-4 ${
                          isSelected ? 'border-[#1A3326] bg-[#1A3326]' : 'border-stone-300'
                        }`}
                      >
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pagination / Submit Controls */}
            <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 text-xs font-bold text-stone-600 disabled:opacity-30 rounded-xl hover:bg-stone-100 transition-colors"
              >
                سوال قبلی
              </button>

              {currentQuestionIndex < quiz.questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#1A3326] hover:bg-[#122219] rounded-xl shadow-xs transition-all"
                >
                  سوال بعدی →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#C59B27] hover:bg-[#D4AF37] rounded-xl shadow-md transition-all active:scale-95"
                >
                  ثبت نهایی آزمون و مشاهده کارنامه
                </button>
              )}
            </div>
          </>
        ) : (
          /* Full Page Scorecard View */
          <div className="space-y-6 text-center py-4">
            <div className="w-20 h-20 rounded-full bg-amber-50 border-2 border-[#C59B27] flex items-center justify-center mx-auto text-[#8C6B13] shadow-md">
              <Trophy size={40} />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-stone-500 uppercase">کارنامه نهایی آزمون</span>
              <h2 className="text-3xl font-black text-stone-900 font-mono tabular-nums">
                نمره شما: {quizScore} از ۱۰۰
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 pt-1">
                {quizScore >= quiz.passedScore ? (
                  <span className="text-emerald-700 font-bold">
                    تبریک! شما این آزمون را با موفقیت پشت سر گذاشتید و {quiz.rewardPoints} امتیاز به کارنامه صالحین شما افزوده شد.
                  </span>
                ) : (
                  <span className="text-rose-700 font-bold">
                    نمره قبولی کسب نشد (حداقل نمره: {quiz.passedScore}). می‌توانید مجدداً با مطالعه مبحث در آزمون شرکت نمایید.
                  </span>
                )}
              </p>
            </div>

            {/* Question by Question Review */}
            <div className="text-right space-y-4 pt-6 border-t border-stone-200">
              <h3 className="text-sm font-bold text-stone-800">بررسی سوال به سوال و تشریح پاسخ‌ها:</h3>
              {quiz.questions.map((q, idx) => {
                const userChoice = selectedAnswers[idx];
                const isCorrect = userChoice === q.correctIndex;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border text-xs sm:text-sm space-y-2 ${
                      isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span>سوال {idx + 1}: {q.question}</span>
                      <span className={isCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                        {isCorrect ? '✓ پاسخ درست' : '✗ پاسخ نادرست'}
                      </span>
                    </div>
                    <p className="text-stone-700">
                      <strong>پاسخ صحیح:</strong> {q.options[q.correctIndex]}
                    </p>
                    <div className="text-stone-600 text-xs bg-white p-3 rounded-lg border border-stone-100 leading-relaxed">
                      💡 <strong>نکته و استدلال آموزشی:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-3 pt-6 border-t border-stone-100">
              <button
                onClick={handleRetake}
                className="px-5 py-2.5 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <RotateCcw size={14} />
                <span>شرکت مجدد در آزمون</span>
              </button>
              <button
                onClick={onBack}
                className="px-6 py-2.5 text-xs font-bold text-white bg-[#1A3326] hover:bg-[#122219] rounded-xl shadow-md transition-all"
              >
                بازگشت به مرکز آموزش
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
