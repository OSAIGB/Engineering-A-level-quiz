import React from 'react';

interface ResultsScreenProps {
  score: number;
  total: number;
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ score, total, onRestart }) => {
  const percentage = Math.round((score / total) * 100);

  const getFeedback = () => {
    if (percentage >= 90) return { message: "Outstanding!", color: "text-green-400" };
    if (percentage >= 75) return { message: "Excellent Work!", color: "text-cyan-400" };
    if (percentage >= 50) return { message: "Good Effort!", color: "text-yellow-400" };
    return { message: "Keep Practicing!", color: "text-orange-400" };
  };

  const feedback = getFeedback();

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 text-center shadow-2xl animate-fade-in">
      <h2 className="text-3xl font-bold text-slate-200 mb-4">Quiz Completed!</h2>
      <p className={`text-4xl font-bold mb-4 ${feedback.color}`}>{feedback.message}</p>
      <p className="text-slate-300 text-lg mb-6">Your final score is:</p>
      <div className="mb-8">
        <span className="text-7xl font-bold text-cyan-400">{score}</span>
        <span className="text-3xl text-slate-400"> / {total}</span>
      </div>
      <p className="text-2xl font-semibold text-slate-200 mb-8">({percentage}%)</p>
      <button
        onClick={onRestart}
        className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-xl hover:bg-cyan-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500/50"
      >
        Try Again
      </button>
    </div>
  );
};

export default ResultsScreen;
