
import React, { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'whatsapp_clone_chats';

const initialContacts = [
  {
    id: 1,
    name: 'Alex',
    phone: '9876543210',
    messages: [
      {
        id: 1,
        text: 'Hello! Welcome to WhatsApp Clone 😊',
        sender: 'them',
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ],
  },
  {
    id: 2,
    name: 'John',
    phone: '9876543211',
    messages: [],
  },
  {
    id: 3,
    name: 'Sarah',
    phone: '9876543212',
    messages: [],
  },
];

// --------------------------------------------------
// AUTO REPLY RULES
// --------------------------------------------------

const autoReplies = [
  // Greetings
  {
    patterns: [/^hi+$/i, /^hii+$/i, /^hello$/i],
    replies: [
      'Hello! How are you? 😊',
      'Hey there! Nice to hear from you.',
      'Hello! Hope you are having a great day.',
    ],
  },
  {
    patterns: [/^hey$/i, /^heyy+$/i],
    replies: [
      "Hey! What's up?",
      'Hey there! How is everything going?',
    ],
  },
  {
    patterns: [/good morning/i],
    replies: ['Good morning! Have a wonderful day. ☀️'],
  },
  {
    patterns: [/good afternoon/i],
    replies: ['Good afternoon! Hope you are having a great day.'],
  },
  {
    patterns: [/good evening/i],
    replies: ['Good evening! How was your day?'],
  },
  {
    patterns: [/good night/i],
    replies: ['Good night! Sweet dreams. 🌙'],
  },
  {
    patterns: [/what'?s up/i],
    replies: ["Not much! Just relaxing. What about you?"],
  },
  {
    patterns: [/how are you doing/i, /how are you/i],
    replies: [
      "I'm doing great! What about you?",
      "I'm doing well, thanks for asking!",
    ],
  },
  {
    patterns: [/nice to meet you/i],
    replies: ['Nice to meet you too! 😊'],
  },
  {
    patterns: [/who are you/i],
    replies: ["I'm Alex, your virtual chat assistant. Nice to connect with you!"],
  },
  {
    patterns: [/what is your name/i, /your name/i],
    replies: ['My name is Alex. What is your name?'],
  },
  {
    patterns: [/are you there/i],
    replies: ["Yes, I'm here! What's going on?"],
  },

  // Personal conversation
  {
    patterns: [/how is your day/i, /how was your day/i],
    replies: ['My day is going well. How about yours?'],
  },
  {
    patterns: [/what are you doing/i, /what r u doing/i],
    replies: ['Just chatting with you! 😊 What are you doing?'],
  },
  {
    patterns: [/where are you/i],
    replies: ["I'm right here, chatting with you."],
  },
  {
    patterns: [/are you busy/i],
    replies: ["Not at the moment. What's up?"],
  },
  {
    patterns: [/can we talk/i],
    replies: ["Of course! I'm listening."],
  },
  {
    patterns: [/i am bored/i, /i'm bored/i],
    replies: ["Let's find something fun to talk about!"],
  },
  {
    patterns: [/i am happy/i, /i'm happy/i],
    replies: ["That's wonderful! Keep smiling. 😊"],
  },
  {
    patterns: [/i am sad/i, /i'm sad/i],
    replies: ["I'm sorry to hear that. Would you like to talk about it?"],
  },
  {
    patterns: [/i am tired/i, /i'm tired/i],
    replies: ['Take some rest. You deserve it.'],
  },
  {
    patterns: [/i am excited/i, /i'm excited/i],
    replies: ["That's great! What's the exciting news?"],
  },
  {
    patterns: [/i miss you/i],
    replies: ["That's so sweet! Sending positive vibes. ❤️"],
  },
  {
    patterns: [/i like you/i],
    replies: ["That's very kind of you! 😊"],
  },
  {
    patterns: [/tell me something/i],
    replies: ['Every day is a new opportunity to learn something new!'],
  },
  {
    patterns: [/what do you think/i],
    replies: ["Tell me more, and I'll share my thoughts."],
  },

  // Questions and answers
  {
    patterns: [/what is your age/i, /how old are you/i],
    replies: ["I'm a virtual chat assistant, so I don't have an age!"],
  },
  {
    patterns: [/where do you live/i],
    replies: ["I live in the digital world. 😊"],
  },
  {
    patterns: [/what do you do/i],
    replies: ['I enjoy helping people and having conversations.'],
  },
  {
    patterns: [/do you speak english/i],
    replies: ['Yes! I can chat with you in English.'],
  },
  {
    patterns: [/do you understand me/i],
    replies: ["Yes, I'm following our conversation."],
  },
  {
    patterns: [/can you help me/i, /^help me$/i],
    replies: ['Of course! Tell me what you need help with.'],
  },
  {
    patterns: [/can i ask something/i],
    replies: ['Sure! Ask me anything.'],
  },
  {
    patterns: [/do you know me/i],
    replies: ["We're chatting now, so let's get to know each other!"],
  },
  {
    patterns: [/are you real/i],
    replies: ["I'm a demo chatbot running inside this application."],
  },
  {
    patterns: [/are you a robot/i],
    replies: ["I'm a virtual chatbot. 🤖"],
  },
  {
    patterns: [/favorite color/i, /favourite colour/i],
    replies: ['I like blue! 💙 What is your favorite color?'],
  },
  {
    patterns: [/what is your hobby/i],
    replies: ['I enjoy helping people and learning new things.'],
  },
  {
    patterns: [/do you like music/i],
    replies: ["Yes! Music makes everything better. What's your favorite song? 🎵"],
  },
  {
    patterns: [/do you like movies/i],
    replies: ["Absolutely! What's your favorite movie?"],
  },
  {
    patterns: [/tell me a joke/i],
    replies: [
      'Why did the computer go to the doctor? It had a virus! 😂',
      'Why do programmers prefer dark mode? Because light attracts bugs! 🐛',
    ],
  },

  // Thanks and apologies
  {
    patterns: [/thank you so much/i, /thanks a lot/i],
    replies: ["You're very welcome! 😊"],
  },
  {
    patterns: [/thank you/i, /^thanks$/i, /^thx$/i],
    replies: [
      "You're welcome! 😊",
      'Anytime! Happy to help.',
      'My pleasure!',
    ],
  },
  {
    patterns: [/i am sorry/i, /i'm sorry/i, /^sorry$/i],
    replies: ["Don't worry! It's completely okay."],
  },
  {
    patterns: [/my mistake/i],
    replies: ["That's alright. We all make mistakes."],
  },
  {
    patterns: [/no problem/i],
    replies: ['Great! Let me know if you need anything.'],
  },
  {
    patterns: [/^welcome$/i],
    replies: ['Thank you! 😊'],
  },

  // Short responses
  {
    patterns: [/^okay$/i, /^ok$/i],
    replies: ['Alright! 👍', 'Sounds good!', 'Okay, no problem.'],
  },
  {
    patterns: [/^fine$/i],
    replies: ['Glad to hear that! 😊'],
  },
  {
    patterns: [/^yes$/i, /^yeah$/i, /^yep$/i],
    replies: ['Great! 😊'],
  },
  {
    patterns: [/^no$/i, /^nope$/i],
    replies: ['Alright, no worries.'],
  },
  {
    patterns: [/^maybe$/i],
    replies: ['Take your time. No rush!'],
  },
  {
    patterns: [/^please$/i],
    replies: ['Sure! How can I help?'],
  },
  {
    patterns: [/^really\??$/i],
    replies: ['Yes, absolutely! 😊'],
  },
  {
    patterns: [/^hmm+$/i],
    replies: ["What's on your mind?"],
  },
  {
    patterns: [/^haha+$/i, /^lol$/i],
    replies: ['Glad I made you smile! 😂'],
  },
  {
    patterns: [/^wow+$/i],
    replies: ['I know, right? Amazing!'],
  },
  {
    patterns: [/^nice$/i],
    replies: ["That's great! 😊"],
  },
  {
    patterns: [/^cool$/i],
    replies: ['Awesome! 👍'],
  },

  // Work and professional
  {
    patterns: [/are you working/i],
    replies: ["Yes, I'm available to chat."],
  },
  {
    patterns: [/i need help/i],
    replies: ['Sure! Please explain the problem.'],
  },
  {
    patterns: [/send me details/i],
    replies: ['Absolutely! What details do you need?'],
  },
  {
    patterns: [/send information/i],
    replies: ['Sure! What information are you looking for?'],
  },
  {
    patterns: [/meeting/i],
    replies: ['Sure! What time is the meeting?'],
  },
  {
    patterns: [/call me/i],
    replies: ["I can't make a phone call, but we can chat here."],
  },
  {
    patterns: [/i will call you/i],
    replies: ["Okay! I'll be here when you return."],
  },
  {
    patterns: [/are you available/i],
    replies: ["Yes, I'm available right now."],
  },
  {
    patterns: [/check this/i],
    replies: ['Sure! Please share the details.'],
  },
  {
    patterns: [/send document/i],
    replies: ['Please attach the document here.'],
  },
  {
    patterns: [/project/i],
    replies: ['Tell me more about your project.'],
  },
  {
    patterns: [/deadline/i],
    replies: ["Let's discuss the deadline and requirements."],
  },
  {
    patterns: [/job/i],
    replies: ['Are you looking for a new job opportunity?'],
  },
  {
    patterns: [/interview/i],
    replies: ['Best of luck with your interview!'],
  },
  {
    patterns: [/work done/i, /task completed/i],
    replies: ['Excellent! Great job. 🎉'],
  },

  // Food and travel
  {
    patterns: [/i am hungry/i, /i'm hungry/i],
    replies: ['What would you like to eat? 🍕'],
  },
  {
    patterns: [/pizza/i],
    replies: ['Pizza sounds delicious! 🍕'],
  },
  {
    patterns: [/coffee/i],
    replies: ['A cup of coffee sounds perfect! ☕'],
  },
  {
    patterns: [/tea/i],
    replies: ['Tea time! ☕'],
  },
  {
    patterns: [/what is for dinner/i],
    replies: ['What about something delicious today?'],
  },
  {
    patterns: [/let'?s go out/i],
    replies: ['Sounds fun! Where would you like to go?'],
  },
  {
    patterns: [/travel/i],
    replies: ['That is exciting! Where are you planning to visit?'],
  },
  {
    patterns: [/holiday/i],
    replies: ['Enjoy your holiday! 🌴'],
  },
  {
    patterns: [/vacation/i],
    replies: ['Hope you have an amazing vacation!'],
  },
  {
    patterns: [/watch movie/i, /watch a movie/i],
    replies: ['Great idea! Which movie should we watch?'],
  },
  {
    patterns: [/music/i],
    replies: ['What kind of music do you enjoy? 🎵'],
  },
  {
    patterns: [/cricket/i],
    replies: ['Are you watching the match? 🏏'],
  },
  {
    patterns: [/football/i],
    replies: ['Which team do you support? ⚽'],
  },
  {
    patterns: [/shopping/i],
    replies: ['What are you planning to buy?'],
  },
  {
    patterns: [/weekend/i],
    replies: ['Have a fantastic weekend! 😊'],
  },

  // Emotions and special messages
  {
    patterns: [/i love you/i],
    replies: ["That's very sweet of you! ❤️"],
  },
  {
    patterns: [/^love$/i],
    replies: ['Love makes life beautiful! ❤️'],
  },
  {
    patterns: [/happy birthday/i],
    replies: ["Thank you! That's so thoughtful. 🎂"],
  },
  {
    patterns: [/congratulations/i, /^congrats$/i],
    replies: ['Thank you so much! 🎉'],
  },
  {
    patterns: [/good luck/i],
    replies: ['Thank you! Wishing you luck too.'],
  },
  {
    patterns: [/all the best/i],
    replies: ['Thanks! Same to you.'],
  },
  {
    patterns: [/take care/i],
    replies: ['You too! Stay safe. ❤️'],
  },
  {
    patterns: [/be happy/i],
    replies: ['Always! Keep smiling. 😊'],
  },
  {
    patterns: [/i am worried/i, /i'm worried/i],
    replies: ["Don't worry. Let's talk about what's bothering you."],
  },
  {
    patterns: [/i am confused/i, /i'm confused/i],
    replies: ["Tell me what's confusing you. I'll try to help."],
  },
  {
    patterns: [/i am angry/i, /i'm angry/i],
    replies: ["Take a deep breath. Let's talk calmly."],
  },
  {
    patterns: [/i am lonely/i, /i'm lonely/i],
    replies: ["I'm here to chat with you."],
  },
  {
    patterns: [/cheer me up/i],
    replies: ["You're stronger than you think. Keep going! 💪"],
  },
  {
    patterns: [/^great$/i],
    replies: ['Awesome! 😃'],
  },
  {
    patterns: [/^wonderful$/i],
    replies: ["That's fantastic!"],
  },

  // Goodbye
  {
    patterns: [/^bye$/i, /^byee+$/i],
    replies: ['Goodbye! Talk to you later.'],
  },
  {
    patterns: [/^goodbye$/i],
    replies: ['Take care! Have a great day.'],
  },
  {
    patterns: [/see you later/i],
    replies: ['Sure! Talk to you later. 😊'],
  },
  {
    patterns: [/^see you$/i],
    replies: ['See you soon! 😊'],
  },
  {
    patterns: [/i am leaving/i],
    replies: ['Okay! Have a safe day.'],
  },
  {
    patterns: [/have a nice day/i, /have a good day/i],
    replies: ['Thank you! You too.'],
  },
  {
    patterns: [/see you tomorrow/i],
    replies: ['See you tomorrow!'],
  },
  {
    patterns: [/talk later/i],
    replies: ['Absolutely! Catch you later.'],
  },
  {
    patterns: [/^later$/i],
    replies: ['Later! Take care.'],
  },
  {
    patterns: [/^stop$/i],
    replies: ["Okay, I'll stop replying now."],
  },
  {
    patterns: [/end chat/i],
    replies: ['It was nice chatting with you!'],
  },

  // Technology
  {
    patterns: [/javascript/i],
    replies: [
      'JavaScript is a popular programming language for web development.',
    ],
  },
  {
    patterns: [/\breact\b/i],
    replies: [
      'React helps developers build reusable user interfaces.',
    ],
  },
  {
    patterns: [/\bphp\b/i],
    replies: ['PHP is widely used for server-side web development.'],
  },
  {
    patterns: [/laravel/i],
    replies: ['Laravel is a powerful PHP framework.'],
  },
  {
    patterns: [/wordpress/i],
    replies: ['WordPress is a popular content management system.'],
  },
  {
    patterns: [/\bhtml\b/i],
    replies: ['HTML provides the structure of web pages.'],
  },
  {
    patterns: [/\bcss\b/i],
    replies: ['CSS is used to style web pages.'],
  },
  {
    patterns: [/bootstrap/i],
    replies: ['Bootstrap helps create responsive websites quickly.'],
  },
  {
    patterns: [/\bapi\b/i],
    replies: ['An API allows different software applications to communicate.'],
  },
  {
    patterns: [/coding/i],
    replies: ["Coding is a great way to solve problems!"],
  },
  {
    patterns: [/programming/i],
    replies: ['Programming turns ideas into working applications.'],
  },
  {
    patterns: [/\bbug\b/i],
    replies: ["Let's investigate the issue and find a solution."],
  },
  {
    patterns: [/\berror\b/i],
    replies: ['Please share the error message so we can understand it.'],
  },
  {
    patterns: [/database/i],
    replies: ['A database stores and organizes application data.'],
  },
  {
    patterns: [/\bgit\b/i],
    replies: ['Git helps developers track and manage code changes.'],
  },

  // Default fallback
  {
    patterns: [/./],
    replies: [
      'Interesting! Tell me more. 😊',
      'Thanks for your message! How can I help you today?',
      'I understand. Could you explain a little more?',
      "That's interesting! What else would you like to share?",
    ],
  },
];

// --------------------------------------------------
// GET RELEVANT AUTO REPLY
// --------------------------------------------------

const getAutoReply = (message) => {
  const cleanMessage = message.trim().toLowerCase();

  for (const rule of autoReplies) {
    const matched = rule.patterns.some((pattern) =>
      pattern.test(cleanMessage)
    );

    if (matched) {
      const replies = rule.replies;
      return replies[Math.floor(Math.random() * replies.length)];
    }
  }

  return 'Thanks for your message! How can I help you today?';
};

// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------

export default function WhatsAppClone() {
  const [contacts, setContacts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialContacts;
    } catch {
      return initialContacts;
    }
  });

  const [activeChatId, setActiveChatId] = useState(1);
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [showNewChatBox, setShowNewChatBox] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const activeChat = contacts.find(
    (contact) => contact.id === activeChatId
  );

  // Save chats in localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    } catch (error) {
      console.error('Unable to save chats:', error);
    }
  }, [contacts]);

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [activeChat?.messages]);

  // Update contact messages
  const updateMessages = (contactId, newMessages) => {
    setContacts((previousContacts) =>
      previousContacts.map((contact) =>
        contact.id === contactId
          ? { ...contact, messages: newMessages }
          : contact
      )
    );
  };

  // Send message
  const handleSendMessage = (event) => {
    event.preventDefault();

    if (!activeChat) return;

    const text = messageInput.trim();

    if (!text && !selectedFile) return;

    const now = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const messageText = selectedFile
      ? `${text}${text ? '\n' : ''}📎 ${selectedFile.name}`
      : text;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'me',
      time: now,
      fileName: selectedFile?.name || null,
    };

    const updatedMessages = [
      ...activeChat.messages,
      userMessage,
    ];

    updateMessages(activeChat.id, updatedMessages);

    setMessageInput('');
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    // Relevant auto reply
    if (text) {
      const replyText = getAutoReply(text);

      setTimeout(() => {
        setContacts((previousContacts) =>
          previousContacts.map((contact) => {
            if (contact.id !== activeChat.id) return contact;

            return {
              ...contact,
              messages: [
                ...contact.messages,
                {
                  id: Date.now() + 1,
                  text: replyText,
                  sender: 'them',
                  time: new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  }),
                },
              ],
            };
          })
        );
      }, 1000);
    }
  };

  // Open real WhatsApp
  const sendToRealWhatsApp = () => {
    if (!activeChat) return;

    const cleanPhone = activeChat.phone.replace(/\D/g, '');

    if (!cleanPhone) {
      alert('Please enter a valid phone number.');
      return;
    }

    const phone =
      cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

    const url = `https://wa.me/${phone}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Add new contact
  const handleAddContact = (event) => {
    event.preventDefault();

    const name = newContactName.trim();
    const phone = newContactPhone.trim();

    if (!name || !phone) {
      alert('Please enter name and phone number.');
      return;
    }

    const newContact = {
      id: Date.now(),
      name,
      phone,
      messages: [],
    };

    setContacts((previousContacts) => [
      newContact,
      ...previousContacts,
    ]);

    setActiveChatId(newContact.id);
    setNewContactName('');
    setNewContactPhone('');
    setShowNewChatBox(false);
  };

  // Search contacts
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add emoji
  const addEmoji = (emoji) => {
    setMessageInput((previous) => previous + emoji);
  };

  // Select attachment
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  // Clear attachment
  const removeFile = () => {
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Delete contact
  const handleDeleteContact = (contactId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this chat?'
    );

    if (!confirmDelete) return;

    setContacts((previous) =>
      previous.filter((contact) => contact.id !== contactId)
    );

    if (activeChatId === contactId) {
      setActiveChatId(null);
    }
  };

  return (
    <div style={styles.app}>
      {/* LEFT SIDEBAR */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h2 style={styles.logo}>WhatsApp</h2>

          <button
            style={styles.newChatButton}
            onClick={() => setShowNewChatBox(!showNewChatBox)}
            title="New Chat"
          >
            +
          </button>
        </div>

        {/* SEARCH */}
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            style={styles.searchInput}
          />
        </div>

        {/* NEW CONTACT FORM */}
        {showNewChatBox && (
          <form onSubmit={handleAddContact} style={styles.newContactForm}>
            <input
              type="text"
              placeholder="Contact name"
              value={newContactName}
              onChange={(event) =>
                setNewContactName(event.target.value)
              }
              style={styles.formInput}
            />

            <input
              type="tel"
              placeholder="Phone number"
              value={newContactPhone}
              onChange={(event) =>
                setNewContactPhone(event.target.value)
              }
              style={styles.formInput}
            />

            <button type="submit" style={styles.addButton}>
              Add Contact
            </button>
          </form>
        )}

        {/* CONTACT LIST */}
        <div style={styles.contactList}>
          {filteredContacts.map((contact) => {
            const lastMessage =
              contact.messages[contact.messages.length - 1];

            return (
              <div
                key={contact.id}
                style={{
                  ...styles.contactItem,
                  background:
                    activeChatId === contact.id
                      ? '#e9edef'
                      : '#ffffff',
                }}
              >
                <div
                  style={styles.contactMain}
                  onClick={() => setActiveChatId(contact.id)}
                >
                  <div style={styles.avatar}>
                    {contact.name.charAt(0).toUpperCase()}
                  </div>

                  <div style={styles.contactInfo}>
                    <div style={styles.contactName}>
                      {contact.name}
                    </div>

                    <div style={styles.lastMessage}>
                      {lastMessage
                        ? lastMessage.text
                        : contact.phone}
                    </div>
                  </div>
                </div>

                <button
                  style={styles.deleteButton}
                  onClick={() => handleDeleteContact(contact.id)}
                  title="Delete chat"
                >
                  ×
                </button>
              </div>
            );
          })}

          {filteredContacts.length === 0 && (
            <p style={styles.emptyText}>No contacts found.</p>
          )}
        </div>
      </div>

      {/* RIGHT CHAT WINDOW */}
      <div style={styles.chatWindow}>
        {activeChat ? (
          <>
            {/* CHAT HEADER */}
            <div style={styles.chatHeader}>
              <div style={styles.headerUser}>
                <div style={styles.avatar}>
                  {activeChat.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <div style={styles.headerName}>
                    {activeChat.name}
                  </div>

                  <div style={styles.onlineText}>
                    Online
                  </div>
                </div>
              </div>

              <button
                onClick={sendToRealWhatsApp}
                style={styles.whatsappButton}
              >
                Open WhatsApp
              </button>
            </div>

            {/* MESSAGES */}
            <div style={styles.messagesArea}>
              {activeChat.messages.map((message) => (
                <div
                  key={message.id}
                  style={{
                    ...styles.messageRow,
                    justifyContent:
                      message.sender === 'me'
                        ? 'flex-end'
                        : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      ...styles.messageBubble,
                      background:
                        message.sender === 'me'
                          ? '#d9fdd3'
                          : '#ffffff',
                    }}
                  >
                    <div style={styles.messageText}>
                      {message.text}
                    </div>

                    <div style={styles.messageTime}>
                      {message.time}
                    </div>
                  </div>
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            {/* SELECTED FILE PREVIEW */}
            {selectedFile && (
              <div style={styles.filePreview}>
                <span>📎 {selectedFile.name}</span>

                <button
                  type="button"
                  onClick={removeFile}
                  style={styles.removeFileButton}
                >
                  ×
                </button>
              </div>
            )}

            {/* MESSAGE COMPOSER */}
            <form
              onSubmit={handleSendMessage}
              style={styles.messageForm}
            >
              <div style={styles.emojiBar}>
                {['😀', '😂', '😍', '❤️', '👍', '🙏', '🎉'].map(
                  (emoji) => (
                    <button
                      type="button"
                      key={emoji}
                      onClick={() => addEmoji(emoji)}
                      style={styles.emojiButton}
                    >
                      {emoji}
                    </button>
                  )
                )}
              </div>

              <div style={styles.inputRow}>
                {/* ATTACHMENT */}
                <button
                  type="button"
                  style={styles.attachButton}
                  onClick={() => fileInputRef.current?.click()}
                  title="Attach file"
                >
                  📎
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />

                {/* MESSAGE INPUT */}
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(event) =>
                    setMessageInput(event.target.value)
                  }
                  style={styles.messageInput}
                />

                <button type="submit" style={styles.sendButton}>
                  ➤
                </button>
              </div>
            </form>
          </>
        ) : (
          <div style={styles.noChat}>
            <div style={{ fontSize: '65px' }}>💬</div>
            <h2>WhatsApp Clone</h2>
            <p>Select a contact to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// --------------------------------------------------
// STYLES
// --------------------------------------------------

const styles = {
  app: {
    display: 'grid',
    gridTemplateColumns: '320px minmax(0, 1fr)',
    height: '600px',
    maxWidth: '1100px',
    width: '100%',
    margin: '20px auto',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    fontFamily: 'Arial, sans-serif',
    background: '#fff',
  },

  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    borderRight: '1px solid #ddd',
    background: '#fff',
  },

  sidebarHeader: {
    height: '60px',
    flexShrink: 0,
    background: '#075e54',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 15px',
  },

  logo: {
    margin: 0,
    fontSize: '21px',
  },

  newChatButton: {
    background: '#25d366',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '35px',
    height: '35px',
    fontSize: '25px',
    cursor: 'pointer',
  },

  searchBox: {
    padding: '10px',
    flexShrink: 0,
    background: '#f0f2f5',
  },

  searchInput: {
    width: '100%',
    padding: '10px',
    border: 'none',
    outline: 'none',
    borderRadius: '8px',
    boxSizing: 'border-box',
  },

  newContactForm: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flexShrink: 0,
    background: '#f7f7f7',
  },

  formInput: {
    padding: '9px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    outline: 'none',
  },

  addButton: {
    padding: '9px',
    background: '#075e54',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },

  contactList: {
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    overflowX: 'hidden',
  },

  contactItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 10px',
    borderBottom: '1px solid #eee',
    cursor: 'pointer',
  },

  contactMain: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: 1,
    minWidth: 0,
    cursor: 'pointer',
  },

  avatar: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    background: '#dfe5e7',
    color: '#075e54',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    flexShrink: 0,
  },

  contactInfo: {
    flex: 1,
    minWidth: 0,
  },

  contactName: {
    fontWeight: 'bold',
    marginBottom: '5px',
    fontSize: '14px',
  },

  lastMessage: {
    color: '#667781',
    fontSize: '12px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  deleteButton: {
    border: 'none',
    background: 'transparent',
    color: '#999',
    fontSize: '22px',
    cursor: 'pointer',
    flexShrink: 0,
  },

  emptyText: {
    textAlign: 'center',
    color: '#777',
    padding: '15px',
  },

  chatWindow: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    minHeight: 0,
    overflow: 'hidden',
    background: '#efeae2',
  },

  chatHeader: {
    height: '60px',
    flexShrink: 0,
    background: '#f0f2f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 15px',
    borderBottom: '1px solid #ddd',
  },

  headerUser: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    minWidth: 0,
  },

  headerName: {
    fontWeight: 'bold',
    fontSize: '15px',
  },

  onlineText: {
    color: '#667781',
    fontSize: '12px',
    marginTop: '3px',
  },

  whatsappButton: {
    background: '#25d366',
    color: '#fff',
    border: 'none',
    padding: '9px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '12px',
  },

  messagesArea: {
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  messageRow: {
    display: 'flex',
    width: '100%',
  },

  messageBubble: {
    maxWidth: '75%',
    padding: '9px 12px',
    borderRadius: '8px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    overflowWrap: 'anywhere',
  },

  messageText: {
    fontSize: '14px',
    lineHeight: '1.5',
    whiteSpace: 'pre-wrap',
  },

  messageTime: {
    fontSize: '10px',
    color: '#667781',
    textAlign: 'right',
    marginTop: '5px',
  },

  filePreview: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#fff',
    padding: '8px 15px',
    borderTop: '1px solid #ddd',
    fontSize: '13px',
  },

  removeFileButton: {
    border: 'none',
    background: 'transparent',
    fontSize: '20px',
    cursor: 'pointer',
  },

  messageForm: {
    flexShrink: 0,
    background: '#f0f2f5',
    padding: '8px 12px',
    borderTop: '1px solid #ddd',
  },

  emojiBar: {
    display: 'flex',
    gap: '8px',
    paddingBottom: '7px',
    flexWrap: 'wrap',
  },

  emojiButton: {
    border: 'none',
    background: 'transparent',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '2px',
  },

  inputRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  attachButton: {
    border: 'none',
    background: 'transparent',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '5px',
  },

  messageInput: {
    flex: 1,
    minWidth: 0,
    padding: '12px',
    border: 'none',
    outline: 'none',
    borderRadius: '8px',
    fontSize: '14px',
  },

  sendButton: {
    width: '42px',
    height: '42px',
    border: 'none',
    borderRadius: '50%',
    background: '#075e54',
    color: '#fff',
    fontSize: '22px',
    cursor: 'pointer',
    flexShrink: 0,
  },

  noChat: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#667781',
    textAlign: 'center',
  },
};
