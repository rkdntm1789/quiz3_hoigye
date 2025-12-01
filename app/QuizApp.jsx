// app/quiz/page.jsx
'use client';

import { useState } from 'react';
import { quizData } from './quizData';

export default function QuizPage() {
  const [curIndex, setCurIndex] = useState(0);
  const [userChoice, setUserChoice] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const curQ = quizData[curIndex];

  const handleChoice = (choice) => {
    setUserChoice(choice);
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const handleNext = () => {
    setUserChoice(null);
    setShowResult(false);
    setCurIndex((i) => Math.min(i + 1, quizData.length - 1));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">문제 {curQ.id}</h2>
      <p className="text-gray-800 mb-6">{curQ.question}</p>

      {curQ.choices.length === 0 ? (
        <button
          onClick={() => setShowResult(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          답 보기
        </button>
      ) : (
        <>
          {curQ.choices.map((c, idx) => (
            <label key={idx} className="block mb-3 cursor-pointer">
              <input
                type="radio"
                name="choice"
                value={c}
                checked={userChoice === c}
                onChange={() => handleChoice(c)}
                disabled={showResult}
                className="mr-2"
              />
              <span className="text-gray-700">{c}</span>
            </label>
          ))}
          {!showResult && (
            <button
              onClick={handleSubmit}
              disabled={userChoice === null}
              className={`px-4 py-2 rounded text-white transition ${
                userChoice
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              제출
            </button>
          )}
        </>
      )}

      {showResult && (
        <div className="mt-6 p-4 border border-gray-300 bg-white rounded">
          {curQ.choices.length === 0 ? (
            <p><strong>정답:</strong> {curQ.answer}</p>
          ) : userChoice === curQ.answer ? (
            <p className="text-green-600 font-medium">✅ 정답입니다!</p>
          ) : (
            <p className="text-red-600 font-medium">❌ 오답입니다. 정답은 아래와 같습니다.</p>
          )}
          {curQ.choices.length > 0 && (
            <p className="mt-2"><strong>정답:</strong> {curQ.answer}</p>
          )}
          <div className="mt-4">
            <strong>해설:</strong>
            <p className="mt-1 text-gray-700">{curQ.explanation}</p>
          </div>
          <button
            onClick={handleNext}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {curIndex + 1 < quizData.length ? '다음 문제' : '끝'}
          </button>
        </div>
      )}

      <div className="mt-6 text-sm text-gray-500">
        문제 {curIndex + 1} / {quizData.length}
      </div>
    </div>
  );
}
