
import React, { useState, useEffect } from 'react';

function IQTest() {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [timeLeft, setTimeLeft] = useState(20);

  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Decode HTML entities
  function decodeHtml(text) {
    const txt = document.createElement('textarea');
    txt.innerHTML = text;
    return txt.value;
  }

  // Shuffle Options
  function shuffleArray(array) {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffled[i], shuffled[j]] = [
        shuffled[j],
        shuffled[i]
      ];
    }

    return shuffled;
  }

  // Fetch Live IQ Questions
  async function fetchLiveIqQuestions() {
    setLoading(true);
    setError('');

    setQuestions([]);
    setCurrentIdx(0);
    setCorrectCount(0);
    setSelectedOption('');
    setTimeLeft(20);
    setIsFinished(false);

    try {
      const apiUrl =
        'https://opentdb.com/api.php?amount=10&category=19&type=multiple';

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        },
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error(
          `API Error: HTTP ${response.status}`
        );
      }

      // Read response as text first
      const responseText = await response.text();

      let data;

      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Invalid API Response:', responseText);

        throw new Error(
          'API returned HTML instead of JSON. Please check your internet connection or API access.'
        );
      }

      // Check API response
      if (data.response_code !== 0) {
        if (data.response_code === 1) {
          throw new Error('No questions found. Please try again.');
        }

        if (data.response_code === 5) {
          throw new Error('API rate limit reached. Please wait and retry.');
        }

        throw new Error(
          `Open Trivia API Error: ${data.response_code}`
        );
      }

      if (!data.results || data.results.length === 0) {
        throw new Error('No questions available.');
      }

      // Format Questions
      const formattedQuestions = data.results.map((item) => {
        const correctAnswer = decodeHtml(item.correct_answer);

        const allOptions = [
          ...item.incorrect_answers.map(decodeHtml),
          correctAnswer
        ];

        return {
          question: decodeHtml(item.question),
          correctAnswer: correctAnswer,
          options: shuffleArray(allOptions)
        };
      });

      setQuestions(formattedQuestions);

    } catch (err) {
      console.error('IQ API Error:', err);
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  // Load Questions Initially
  useEffect(() => {
    fetchLiveIqQuestions();
  }, []);

  // Move To Next Question
  function goToNext() {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption('');
      setTimeLeft(20);
    } else {
      setIsFinished(true);
    }
  }

  // Question Timer
  useEffect(() => {
    if (
      loading ||
      isFinished ||
      selectedOption ||
      questions.length === 0
    ) {
      return;
    }

    if (timeLeft === 0) {
      goToNext();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);

  }, [
    loading,
    isFinished,
    selectedOption,
    timeLeft,
    currentIdx,
    questions.length
  ]);

  // Automatically Move After Answer Selection
  useEffect(() => {
    if (!selectedOption) {
      return;
    }

    const nextTimer = setTimeout(() => {
      goToNext();
    }, 1100);

    return () => clearTimeout(nextTimer);

  }, [selectedOption, currentIdx]);

  // Handle Answer
  function handleOptionClick(option) {
    if (selectedOption || isFinished) {
      return;
    }

    setSelectedOption(option);

    if (option === questions[currentIdx].correctAnswer) {
      setCorrectCount((prev) => prev + 1);
    }
  }

  // Calculate Practice Score
  const iqScore = questions.length === 0
    ? 0
    : 75 + Math.round(
        (correctCount / questions.length) * 70
      );

  // Get Result Title
  function getIqTitle(score) {
    if (score >= 130) {
      return {
        text: '🧠 Genius / Gifted Mind',
        color: '#4ade80'
      };
    }

    if (score >= 110) {
      return {
        text: '🚀 Above Average IQ',
        color: '#38bdf8'
      };
    }

    if (score >= 90) {
      return {
        text: '👍 Normal / Average IQ',
        color: '#eab308'
      };
    }

    return {
      text: '📚 Keep Practicing Logic!',
      color: '#f87171'
    };
  }

  const iqBadge = getIqTitle(iqScore);
  const currentQuestion = questions[currentIdx];

  // Common Button Style
  const buttonStyle = {
    padding: '12px 28px',
    backgroundColor: '#8b5cf6',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 'bold',
    fontSize: '14px',
    cursor: 'pointer'
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '30px auto',
      padding: '25px',
      backgroundColor: '#0f172a',
      borderRadius: '24px',
      border: '2px solid #8b5cf6',
      color: '#fff',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>

      <h3 style={{
        color: '#a78bfa',
        margin: '0 0 5px 0'
      }}>
        Live API IQ Test 🧠⚡
      </h3>

      <p style={{
        margin: '0 0 20px 0',
        fontSize: '11px',
        color: '#64748b',
        fontWeight: 'bold',
        textTransform: 'uppercase'
      }}>
        Open Trivia Database - Mathematics & Logic
      </p>

      {/* Loading */}
      {loading ? (

        <div style={{
          padding: '50px 0',
          color: '#a78bfa',
          fontWeight: 'bold',
          fontSize: '14px'
        }}>
          ⏳ Downloading Fresh IQ Questions...
        </div>

      ) : error ? (

        /* API Error */
        <div style={{
          backgroundColor: '#020617',
          padding: '25px',
          borderRadius: '15px'
        }}>

          <div style={{ fontSize: '35px' }}>
            ⚠️
          </div>

          <p style={{
            color: '#f87171',
            fontSize: '14px'
          }}>
            {error}
          </p>

          <button
            onClick={fetchLiveIqQuestions}
            style={buttonStyle}
          >
            🔄 Retry API
          </button>

        </div>

      ) : isFinished ? (

        /* Final Result */
        <div style={{
          backgroundColor: '#020617',
          padding: '28px 20px',
          borderRadius: '18px',
          border: '2px solid #8b5cf6'
        }}>

          <div style={{
            fontSize: '50px',
            marginBottom: '8px'
          }}>
            🎓🧠
          </div>

          <div style={{
            fontSize: '12px',
            color: '#94a3b8',
            fontWeight: 'bold'
          }}>
            YOUR PRACTICE SCORE
          </div>

          <div style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: iqBadge.color,
            margin: '8px 0'
          }}>
            {iqScore}
          </div>

          <div style={{
            backgroundColor: '#0f172a',
            padding: '8px 14px',
            borderRadius: '20px',
            display: 'inline-block',
            fontSize: '13px',
            fontWeight: 'bold',
            color: iqBadge.color,
            marginBottom: '15px'
          }}>
            {iqBadge.text}
          </div>

          <p style={{
            fontSize: '14px',
            color: '#cbd5e1',
            marginBottom: '20px'
          }}>
            Correct Answers:{' '}
            <strong>
              {correctCount} / {questions.length}
            </strong>
          </p>

          <button
            onClick={fetchLiveIqQuestions}
            style={buttonStyle}
          >
            🔄 Start New IQ Test
          </button>

          <p style={{
            fontSize: '11px',
            color: '#64748b',
            marginTop: '15px'
          }}>
            This is a practice score, not a clinically
            validated IQ measurement.
          </p>

        </div>

      ) : (

        /* Question Screen */
        currentQuestion && (

          <div>

            {/* Question Number and Timer */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#020617',
              padding: '10px 15px',
              borderRadius: '12px',
              marginBottom: '18px',
              fontSize: '13px',
              fontWeight: 'bold'
            }}>

              <span style={{ color: '#94a3b8' }}>
                Question {currentIdx + 1} / {questions.length}
              </span>

              <span style={{
                color: timeLeft <= 5 ? '#ef4444' : '#eab308'
              }}>
                ⏱️ {timeLeft}s
              </span>

            </div>

            {/* Question Card */}
            <div style={{
              backgroundColor: '#020617',
              padding: '20px',
              borderRadius: '16px',
              border: '1px solid #1e293b',
              marginBottom: '18px',
              textAlign: 'left'
            }}>

              <h4 style={{
                margin: 0,
                fontSize: '16px',
                color: '#fff',
                lineHeight: '1.5'
              }}>
                {currentQuestion.question}
              </h4>

            </div>

            {/* Answer Options */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>

              {currentQuestion.options.map((option, idx) => {

                let btnBg = '#1e293b';

                if (selectedOption) {

                  if (option === currentQuestion.correctAnswer) {
                    btnBg = '#16a34a';
                  } else if (option === selectedOption) {
                    btnBg = '#dc2626';
                  }

                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(option)}
                    disabled={!!selectedOption}
                    style={{
                      padding: '13px 16px',
                      backgroundColor: btnBg,
                      color: '#fff',
                      border: '1px solid #334155',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      cursor: selectedOption ? 'default' : 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                  >
                    {idx + 1}. {option}
                  </button>
                );

              })}

            </div>

          </div>

        )

      )}

    </div>
  );
}

export default IQTest;
