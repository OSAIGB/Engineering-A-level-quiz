import React, { useState, useCallback } from 'react';
import { quizQuestions } from './constants/quizData';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import type { UserAnswer, Question } from './types';

type QuizState = 'welcome' | 'quiz' | 'results';

const App: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>('welcome');
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>(Array(quizQuestions.length).fill(null));
  const [score, setScore] = useState<number>(0);

  const handleStartQuiz = useCallback(() => {
    setQuizState('quiz');
  }, []);

  const calculateScore = (answers: UserAnswer[]) => {
    let correctAnswers = 0;
    quizQuestions.forEach((question: Question, index: number) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  };

  const handleSubmitQuiz = useCallback((finalAnswers: UserAnswer[]) => {
    setUserAnswers(finalAnswers);
    const finalScore = calculateScore(finalAnswers);
    setScore(finalScore);
    setQuizState('results');
  }, []);

  const handleRestartQuiz = useCallback(() => {
    setUserAnswers(Array(quizQuestions.length).fill(null));
    setScore(0);
    setQuizState('welcome');
  }, []);

  const renderScreen = () => {
    switch (quizState) {
      case 'welcome':
        return <WelcomeScreen onStart={handleStartQuiz} />;
      case 'quiz':
        return <QuizScreen questions={quizQuestions} onSubmit={handleSubmitQuiz} />;
      case 'results':
        return <ResultsScreen score={score} total={quizQuestions.length} onRestart={handleRestartQuiz} />;
      default:
        return <WelcomeScreen onStart={handleStartQuiz} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-900 font-sans flex items-center justify-center p-4">
      <main className="w-full max-w-4xl mx-auto">
        {renderScreen()}
      </main>
    </div>
  );
};

export default App;
