
import React, { useState, useEffect } from 'react';

function QuoteOfDay() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Fetch Random Quote from Free API
  const fetchNewQuote = async () => {
    setLoading(true);
    setError('');
    setCopied(false);

    try {
      const response = await fetch(
        'https://dummyjson.com/quotes/random'
      );

      if (!response.ok) {
        throw new Error('Unable to fetch quote.');
      }

      const data = await response.json();

      if (!data.quote || !data.author) {
        throw new Error('Invalid quote response.');
      }

      setQuote(data.quote);
      setAuthor(data.author);

    } catch (error) {
      console.error('Quote API Error:', error);

      setQuote(
        'Success is not final, failure is not fatal: it is the courage to continue that counts.'
      );

      setAuthor('Winston Churchill');
      setError('Unable to load a live quote. Showing a sample quote.');
    } finally {
      setLoading(false);
    }
  };

  // Load Quote on Component Mount
  useEffect(() => {
    fetchNewQuote();
  }, []);

  // Copy Quote
  const copyQuote = async () => {
    try {
      const text = `"${quote}" - ${author}`;

      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();

        const success = document.execCommand('copy');
        textarea.remove();

        if (!success) {
          throw new Error('Copy failed');
        }
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

    } catch (error) {
      console.error('Copy Error:', error);
      alert('Unable to copy quote. Please copy manually.');
    }
  };

  return (
    <div
      style={{
        maxWidth: '480px',
        margin: '0 auto',
        padding: '25px',
        backgroundColor: '#0f172a',
        borderRadius: '24px',
        border: '2px solid #eab308',
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <h3 style={{
        color: '#facc15',
        margin: '0 0 5px 0'
      }}>
        Quote of the Day 💡✨
      </h3>

      <p style={{
        margin: '0 0 20px 0',
        fontSize: '11px',
        color: '#64748b',
        fontWeight: 'bold',
        textTransform: 'uppercase'
      }}>
        Daily Motivation • Live Free API
      </p>

      {/* Quote Display */}
      <div style={{
        backgroundColor: '#020617',
        padding: '25px 20px',
        borderRadius: '16px',
        border: '1px solid #1e293b',
        minHeight: '140px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        {loading ? (
          <span style={{
            color: '#94a3b8',
            fontSize: '14px'
          }}>
            ⏳ Loading fresh quote...
          </span>
        ) : (
          <>
            <p style={{
              fontSize: '17px',
              fontStyle: 'italic',
              color: '#fef08a',
              lineHeight: '1.6',
              margin: '0 0 12px 0'
            }}>
              "{quote}"
            </p>

            <strong style={{
              color: '#38bdf8',
              fontSize: '13px'
            }}>
              — {author}
            </strong>
          </>
        )}
      </div>

      {error && (
        <p style={{
          color: '#fbbf24',
          fontSize: '12px',
          marginBottom: '15px'
        }}>
          {error}
        </p>
      )}

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '10px'
      }}>
        <button
          onClick={fetchNewQuote}
          disabled={loading}
          style={{
            flex: 2,
            padding: '12px',
            backgroundColor: '#eab308',
            color: '#000',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? '⏳ Loading...' : '🔄 New Quote'}
        </button>

        <button
          onClick={copyQuote}
          disabled={loading || !quote}
          style={{
            flex: 1,
            padding: '12px',
            backgroundColor: '#1e293b',
            color: '#fff',
            border: '1px solid #334155',
            borderRadius: '10px',
            fontWeight: 'bold',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          {copied ? '✅ Copied' : '📋 Copy'}
        </button>
      </div>
    </div>
  );
}

export default QuoteOfDay;
