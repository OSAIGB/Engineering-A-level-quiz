import React, { useState, useMemo } from 'react';
import Timer from './Timer';
import type { Question, UserAnswer } from '../types';

interface QuizScreenProps {
  questions: Question[];
  onSubmit: (answers: UserAnswer[]) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>(Array(questions.length).fill(null));

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  
  const answeredCount = useMemo(() => answers.filter(a => a !== null).length, [answers]);
  const progressPercentage = (answeredCount / totalQuestions) * 100;

  const handleSelectAnswer = (optionKey: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionKey;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  const handleTimeUp = () => {
    onSubmit(answers);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 md:p-8 shadow-2xl w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-cyan-400">{currentQuestion.category}</h2>
        <div className="flex items-center gap-4 bg-slate-900/50 px-4 py-2 rounded-lg">
           <Timer duration={3600} onTimeUp={handleTimeUp} />
           <div className="w-px h-6 bg-slate-600"></div>
           <span className="text-lg font-semibold text-slate-300">
             {answeredCount} / {totalQuestions}
           </span>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-slate-700 rounded-full h-2.5 mb-6">
        <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: `${progressPercentage}%`, transition: 'width 0.3s ease-in-out' }}></div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <p className="text-lg font-medium text-slate-300 mb-2">Question {currentQuestionIndex + 1} of {totalQuestions}</p>
        <p className="text-2xl font-semibold whitespace-pre-line">{currentQuestion.question}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {Object.entries(currentQuestion.options).map(([key, value]) => {
          const isSelected = answers[currentQuestionIndex] === key;
          return (
            <button
              key={key}
              onClick={() => handleSelectAnswer(key)}
              className={`text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                isSelected 
                  ? 'bg-indigo-600 border-indigo-400 ring-2 ring-indigo-400 text-white' 
                  : 'bg-slate-700/50 border-slate-600 hover:bg-slate-700 hover:border-slate-500'
              }`}
            >
              <span className={`font-bold mr-3 px-2 py-1 rounded ${isSelected ? 'text-indigo-600 bg-white' : 'text-slate-200 bg-slate-600'}`}>{key.toUpperCase()}</span>
              {value}
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button 
          onClick={handlePrev} 
          disabled={currentQuestionIndex === 0}
          className="bg-slate-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-500 disabled:bg-slate-800 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        {currentQuestionIndex === totalQuestions - 1 ? (
          <button 
            onClick={handleSubmit}
            className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-500 transition-colors"
          >
            Submit Quiz
          </button>
        ) : (
          <button 
            onClick={handleNext}
            className="bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-cyan-500 transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizScreen;
