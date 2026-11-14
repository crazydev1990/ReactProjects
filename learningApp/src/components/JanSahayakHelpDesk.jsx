
import React, { useEffect, useRef, useState } from 'react';

function JanSahayakHelpDesk() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [mode, setMode] = useState('chat');
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const requestLock = useRef(false);
  const lastRequestTime = useRef(0);

  const API_KEY = 'YOUR_LLM7_API_KEY';

  const colors = {
    background: dark ? '#111827' : '#f8fafc',
    sidebar: dark ? '#0b1220' : '#ffffff',
    card: dark ? '#1f2937' : '#ffffff',
    text: dark ? '#f9fafb' : '#172033',
    muted: dark ? '#9ca3af' : '#64748b',
    border: dark ? '#374151' : '#e2e8f0',
    input: dark ? '#1f2937' : '#ffffff',
    primary: '#2563eb',
    hover: dark ? '#273449' : '#f1f5f9'
  };

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem('jansahayak_history') || '[]'
      );
      setHistory(Array.isArray(saved) ? saved : []);
    } catch {
      setHistory([]);
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    localStorage.setItem(
      'jansahayak_history',
      JSON.stringify(history)
    );
  }, [history]);

  const wait = ms =>
    new Promise(resolve => setTimeout(resolve, ms));

  async function callLLM7(prompt, context = '', previousMessages = []) {
    if (!API_KEY || API_KEY === '63wfLE5s37W6r9kMZR82QCtGf24SIGrdhxnBUX50M9yRkkSsU/8oSyjjo2SB6wZpZEyxJb+vqQrd0F88ji0fx1F7zDHv3kw5Sv/wzG8C8eszLSxE42w+EYuOW2bLhNnkb51CkMVc11eHzmI496Q=') {
      throw new Error('Please add your LLM7 API key in the component.');
    }

    const elapsed = Date.now() - lastRequestTime.current;
    const minimumInterval = 1100;

    if (elapsed < minimumInterval) {
      await wait(minimumInterval - elapsed);
    }

    const apiMessages = [
      {
        role: 'system',
        content:
          'You are JanSahayak, a helpful Indian public assistance AI. ' +
          'Answer in simple Gujarati by default. ' +
          'Use clear headings and numbered steps when useful. ' +
          'For government information, explain eligibility, documents, ' +
          'application process and official sources when known. ' +
          'Never invent phone numbers, government schemes, laws or URLs. ' +
          'Clearly mention when information needs official verification.'
      },
      ...previousMessages.slice(-8).map(item => ({
        role: item.role,
        content: item.content
      })),
      {
        role: 'user',
        content: `${context}\n\n${prompt}`
      }
    ];

    let attempt = 0;
    const maxAttempts = 2;

    while (attempt < maxAttempts) {
      attempt++;
      lastRequestTime.current = Date.now();

      const response = await fetch(
        'https://api.llm7.io/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
          },
          body: JSON.stringify({
            model: 'default',
            messages: apiMessages,
            max_tokens: 1500,
            temperature: 0.7,
            stream: false
          })
        }
      );

      if (response.status === 429) {
        const retryHeader = response.headers.get('Retry-After');
        const retrySeconds = Number(retryHeader) || 4;

        if (attempt < maxAttempts) {
          await wait(Math.min(Math.max(retrySeconds, 4), 15) * 1000);
          continue;
        }

        throw new Error(
          'LLM7 rate limit reached. Please wait and try again later. ' +
          'Check your API token usage and account limits.'
        );
      }

      if (response.status === 401 || response.status === 403) {
        throw new Error(
          'API authentication failed. Please check your LLM7 API key.'
        );
      }

      if (!response.ok) {
        const details = await response.text();
        throw new Error(
          `LLM7 API Error ${response.status}: ${details.slice(0, 300)}`
        );
      }

      const data = await response.json();
      const answer = data.choices?.[0]?.message?.content;

      if (!answer) {
        throw new Error('The AI returned an empty response.');
      }

      return answer;
    }

    throw new Error('Unable to get an AI response.');
  }

  async function searchWeb(query) {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Tavily-Access-Mode': 'keyless'
      },
      body: JSON.stringify({
        query,
        topic: 'general',
        search_depth: 'basic',
        max_results: 6,
        include_answer: true,
        include_raw_content: false
      })
    });

    if (!response.ok) {
      throw new Error(
        `Web search service error: ${response.status}.`
      );
    }

    const data = await response.json();

    return {
      answer: data.answer || '',
      results: (data.results || []).map(item => ({
        title: item.title || 'Search Result',
        url: item.url || '',
        content: item.content || '',
        source: item.url
          ? new URL(item.url).hostname
          : 'Web'
      }))
    };
  }

  function saveHistory(updatedMessages) {
    if (!updatedMessages.length) return;

    const firstUserMessage = updatedMessages.find(
      item => item.role === 'user'
    );

    if (!firstUserMessage) return;

    const entry = {
      id: Date.now(),
      title: firstUserMessage.content.slice(0, 55),
      messages: updatedMessages,
      date: new Date().toISOString()
    };

    setHistory(previous => [
      entry,
      ...previous.filter(item => item.id !== entry.id)
    ]);
  }

  async function sendMessage() {
    const text = question.trim();

    if (!text || loading || requestLock.current) return;

    requestLock.current = true;
    setLoading(true);
    setError('');
    setQuestion('');

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: text
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    try {
      let answer = '';
      let sources = [];

      if (mode === 'search') {
        try {
          const searchData = await searchWeb(text);
          sources = searchData.results;

          const searchContext = [
            searchData.answer,
            ...sources.map(
              (item, index) =>
                `${index + 1}. ${item.title}\n${item.content}\n${item.url}`
            )
          ].join('\n\n');

          if (sources.length > 0 || searchData.answer) {
            answer = await callLLM7(
              text,
              `Use these web search results to answer the question. ` +
              `Do not invent information. Mention uncertainty when needed.\n\n${searchContext}`,
              messages.map(item => ({
                role: item.role,
                content: item.content
              }))
            );
          } else {
            throw new Error('No web search results were found.');
          }
        } catch (searchError) {
          if (searchError.message.includes('LLM7')) {
            throw searchError;
          }

          if (searchError.message.includes('rate limit')) {
            throw searchError;
          }

          answer =
            'Web search could not be completed. Please try again later. ' +
            'You can switch to AI Chat mode to ask your question.';
        }
      } else {
        answer = await callLLM7(
          text,
          '',
          messages.map(item => ({
            role: item.role,
            content: item.content
          }))
        );
      }

      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: answer,
        sources
      };

      const finalMessages = [...updatedMessages, assistantMessage];

      setMessages(finalMessages);
      saveHistory(finalMessages);
    } catch (err) {
      setError(err.message || 'Something went wrong.');

      setMessages(previous => [
        ...previous,
        {
          id: Date.now() + 2,
          role: 'assistant',
          content: `Error: ${err.message || 'Unable to process your request.'}`,
          isError: true
        }
      ]);
    } finally {
      setLoading(false);
      requestLock.current = false;
      inputRef.current?.focus();
    }
  }

  function newChat() {
    if (messages.length > 0) {
      saveHistory(messages);
    }

    setMessages([]);
    setQuestion('');
    setError('');
  }

  function openHistory(item) {
    setMessages(item.messages || []);
    setError('');
  }

  function deleteHistory(id) {
    setHistory(previous =>
      previous.filter(item => item.id !== id)
    );
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      setError('Unable to copy text. Please copy it manually.');
    }
  }

  function startVoiceInput() {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('Voice input is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'gu-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);

    recognition.onresult = event => {
      const transcript = event.results[0][0].transcript;
      setQuestion(previous =>
        previous ? `${previous} ${transcript}` : transcript
      );
    };

    recognition.onerror = () => {
      setError('Voice recognition failed. Please try again.');
      setListening(false);
    };

    recognition.onend = () => setListening(false);

    recognition.start();
  }

  function speakText(text) {
    if (!('speechSynthesis' in window)) {
      setError('Voice output is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'gu-IN';
    utterance.rate = 0.95;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }

  const buttonStyle = {
    border: 'none',
    borderRadius: 9,
    padding: '10px 14px',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      minHeight: 550,
      background: colors.background,
      color: colors.text,
      fontFamily: 'Arial, sans-serif',
      overflow: 'hidden'
    }}>

      {sidebarOpen && (
        <aside style={{
          width: 270,
          minWidth: 270,
          background: colors.sidebar,
          borderRight: `1px solid ${colors.border}`,
          display: 'flex',
          flexDirection: 'column',
          padding: 16,
          boxSizing: 'border-box'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 22
          }}>
            <div style={{
              fontSize: 21,
              fontWeight: 800,
              color: colors.primary
            }}>
              JanSahayak
            </div>

            <button
              style={{
                ...buttonStyle,
                background: colors.hover,
                color: colors.text
              }}
              onClick={() => setSidebarOpen(false)}
            >
              ✕
            </button>
          </div>

          <button
            onClick={newChat}
            style={{
              ...buttonStyle,
              background: colors.primary,
              color: '#ffffff',
              width: '100%',
              marginBottom: 12
            }}
          >
            + New Chat
          </button>

          <div style={{
            fontSize: 12,
            color: colors.muted,
            fontWeight: 700,
            margin: '16px 0 10px'
          }}>
            CHAT HISTORY
          </div>

          <div style={{
            overflowY: 'auto',
            flex: 1
          }}>
            {history.length === 0 && (
              <div style={{
                color: colors.muted,
                fontSize: 13,
                padding: 10
              }}>
                No conversations yet.
              </div>
            )}

            {history.map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  marginBottom: 6
                }}
              >
                <button
                  onClick={() => openHistory(item)}
                  style={{
                    ...buttonStyle,
                    background: colors.hover,
                    color: colors.text,
                    flex: 1,
                    textAlign: 'left',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontWeight: 400
                  }}
                >
                  {item.title}
                </button>

                <button
                  onClick={() => deleteHistory(item.id)}
                  title="Delete conversation"
                  style={{
                    ...buttonStyle,
                    padding: 8,
                    background: 'transparent',
                    color: colors.muted
                  }}
                >
                  🗑
                </button>
              </div>
            ))}
          </div>

          <div style={{
            borderTop: `1px solid ${colors.border}`,
            paddingTop: 14,
            fontSize: 12,
            color: colors.muted
          }}>
            JanSahayak Help Desk
            <br />
            AI-powered public assistance
          </div>
        </aside>
      )}

      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0
      }}>

        <header style={{
          height: 62,
          minHeight: 62,
          borderBottom: `1px solid ${colors.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 18px',
          background: colors.sidebar
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                style={{
                  ...buttonStyle,
                  background: colors.hover,
                  color: colors.text
                }}
              >
                ☰
              </button>
            )}

            <div>
              <div style={{
                fontWeight: 800,
                fontSize: 17
              }}>
                JanSahayak AI
              </div>

              <div style={{
                color: colors.muted,
                fontSize: 11
              }}>
                Public Help Desk Assistant
              </div>
            </div>
          </div>

          <button
            onClick={() => setDark(!dark)}
            style={{
              ...buttonStyle,
              background: colors.hover,
              color: colors.text
            }}
          >
            {dark ? '☀ Light' : '☾ Dark'}
          </button>
        </header>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          padding: 12,
          borderBottom: `1px solid ${colors.border}`
        }}>
          <button
            onClick={() => setMode('chat')}
            style={{
              ...buttonStyle,
              background: mode === 'chat' ? colors.primary : colors.hover,
              color: mode === 'chat' ? '#ffffff' : colors.text
            }}
          >
            AI Chat
          </button>

          <button
            onClick={() => setMode('search')}
            style={{
              ...buttonStyle,
              background: mode === 'search' ? colors.primary : colors.hover,
              color: mode === 'search' ? '#ffffff' : colors.text
            }}
          >
            Web Search + AI
          </button>
        </div>

        <section style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px 16px'
        }}>
          <div style={{
            maxWidth: 850,
            margin: '0 auto'
          }}>

            {messages.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '65px 10px 35px'
              }}>
                <div style={{
                  fontSize: 48,
                  marginBottom: 15
                }}>
                  🇮🇳
                </div>

                <h2 style={{
                  fontSize: 27,
                  margin: '0 0 10px'
                }}>
                  Welcome to JanSahayak
                </h2>

                <p style={{
                  color: colors.muted,
                  lineHeight: 1.7
                }}>
                  Ask questions about government services,
                  public information, documents, schemes,
                  education and everyday assistance.
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                  gap: 10,
                  marginTop: 25
                }}>
                  {[
                    'Government schemes',
                    'Required documents',
                    'Emergency helplines',
                    'Education and careers'
                  ].map(item => (
                    <button
                      key={item}
                      onClick={() => setQuestion(item)}
                      style={{
                        ...buttonStyle,
                        background: colors.card,
                        border: `1px solid ${colors.border}`,
                        color: colors.text,
                        padding: 15
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map(message => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent:
                    message.role === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: 22
                }}
              >
                <div style={{
                  maxWidth: '90%',
                  width: 'fit-content',
                  minWidth: 100,
                  background:
                    message.role === 'user'
                      ? colors.primary
                      : colors.card,
                  color:
                    message.role === 'user'
                      ? '#ffffff'
                      : colors.text,
                  border: message.role === 'assistant'
                    ? `1px solid ${colors.border}`
                    : 'none',
                  borderRadius: 15,
                  padding: 16,
                  lineHeight: 1.75,
                  overflowWrap: 'anywhere',
                  whiteSpace: 'pre-wrap'
                }}>
                  <div style={{
                    fontSize: 11,
                    opacity: 0.7,
                    fontWeight: 700,
                    marginBottom: 7
                  }}>
                    {message.role === 'user' ? 'YOU' : 'JANSAHAYAK AI'}
                  </div>

                  <div>{message.content}</div>

                  {message.sources?.length > 0 && (
                    <div style={{
                      borderTop: `1px solid ${colors.border}`,
                      marginTop: 15,
                      paddingTop: 12
                    }}>
                      <strong style={{ fontSize: 13 }}>
                        Web Sources
                      </strong>

                      {message.sources.map((source, index) => (
                        <div
                          key={`${source.url}-${index}`}
                          style={{
                            marginTop: 10,
                            fontSize: 13
                          }}
                        >
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: colors.primary,
                              fontWeight: 700
                            }}
                          >
                            {index + 1}. {source.title}
                          </a>

                          <div style={{
                            color: colors.muted,
                            marginTop: 4
                          }}>
                            {source.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {message.role === 'assistant' && (
                    <div style={{
                      display: 'flex',
                      gap: 8,
                      marginTop: 13
                    }}>
                      <button
                        onClick={() => copyText(message.content)}
                        style={{
                          ...buttonStyle,
                          background: colors.hover,
                          color: colors.text,
                          padding: '6px 10px',
                          fontSize: 12
                        }}
                      >
                        Copy
                      </button>

                      <button
                        onClick={() => speakText(message.content)}
                        style={{
                          ...buttonStyle,
                          background: colors.hover,
                          color: colors.text,
                          padding: '6px 10px',
                          fontSize: 12
                        }}
                      >
                        🔊 Speak
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{
                padding: 15,
                color: colors.muted
              }}>
                JanSahayak is preparing your answer...
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </section>

        {error && (
          <div style={{
            maxWidth: 850,
            width: 'calc(100% - 32px)',
            margin: '0 auto 8px',
            padding: 12,
            borderRadius: 9,
            background: dark ? '#451a1a' : '#fee2e2',
            color: dark ? '#fecaca' : '#991b1b',
            fontSize: 13
          }}>
            {error}
            <button
              onClick={() => setError('')}
              style={{
                float: 'right',
                border: 'none',
                background: 'transparent',
                color: 'inherit',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>
        )}

        <footer style={{
          borderTop: `1px solid ${colors.border}`,
          padding: 15,
          background: colors.sidebar
        }}>
          <div style={{
            maxWidth: 850,
            margin: '0 auto'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 8,
              background: colors.input,
              border: `1px solid ${colors.border}`,
              borderRadius: 14,
              padding: 9
            }}>
              <textarea
                ref={inputRef}
                value={question}
                onChange={event => setQuestion(event.target.value)}
                onKeyDown={event => {
                  if (
                    event.key === 'Enter' &&
                    !event.shiftKey
                  ) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder={
                  mode === 'search'
                    ? 'Search the web and ask a question...'
                    : 'Ask JanSahayak anything...'
                }
                rows={2}
                style={{
                  flex: 1,
                  resize: 'none',
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  color: colors.text,
                  padding: 9,
                  fontSize: 15,
                  fontFamily: 'inherit'
                }}
              />

              <button
                onClick={startVoiceInput}
                title="Voice input"
                disabled={loading}
                style={{
                  ...buttonStyle,
                  background: listening ? '#dc2626' : colors.hover,
                  color: listening ? '#ffffff' : colors.text,
                  padding: 11
                }}
              >
                {listening ? '🔴' : '🎤'}
              </button>

              <button
                onClick={sendMessage}
                disabled={loading || !question.trim()}
                style={{
                  ...buttonStyle,
                  background:
                    loading || !question.trim()
                      ? '#94a3b8'
                      : colors.primary,
                  color: '#ffffff',
                  padding: 11
                }}
              >
                {loading ? '...' : '➤'}
              </button>
            </div>

            <div style={{
              textAlign: 'center',
              fontSize: 11,
              color: colors.muted,
              marginTop: 9
            }}>
              AI responses may contain errors. Verify important
              government information with official sources.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default JanSahayakHelpDesk;
