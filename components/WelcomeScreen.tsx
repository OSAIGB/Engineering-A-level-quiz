import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 text-center shadow-2xl animate-fade-in">
      <h1 className="text-4xl font-bold text-cyan-400 mb-4">Engineering Quiz Challenge</h1>
      <p className="text-slate-300 text-lg mb-6 max-w-2xl mx-auto">
        Test your knowledge across core engineering subjects. You will have <strong>1 hour</strong> to answer <strong>40 questions</strong> covering Chemistry, Mathematics, Physics, and English.
      </p>
      <p className="text-slate-400 mb-8">Good luck, future engineer!</p>
      <button
        onClick={onStart}
        className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-xl hover:bg-cyan-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500/50"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default WelcomeScreen;
