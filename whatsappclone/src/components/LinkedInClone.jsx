
import React, { useRef, useState } from 'react';

function LinkedInClone() {
  const [activeNav, setActiveNav] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  // Posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Priya Sharma',
      role: 'Senior Frontend Engineer at TechCorp • 1st',
      avatar: '👩🏻‍💻',
      time: '2h • 🌐',
      content:
        'Excited to share that we just launched our new ReactJS analytics dashboard! Clean component architecture and proper state management make all the difference. #ReactJS #Frontend #WebDev',
      image: null,
      reaction: '👍',
      likes: 42,
      isLiked: false,
      comments: [
        'Congratulations Priya! Great work.',
        'Super clean UI!',
      ],
    },
    {
      id: 2,
      author: 'Rahul Patel',
      role: 'Tech Recruiter | Hiring ReactJS Developers • 2nd',
      avatar: '👨🏻',
      time: '5h • 🌐',
      content:
        'We are hiring Junior ReactJS Developers in Ahmedabad (SG Highway / Satellite) & Remote! Drop your GitHub & Live Project links in the comments. 🚀 #Hiring #AhmedabadJobs #ReactJS',
      image: null,
      reaction: '👏',
      likes: 118,
      isLiked: true,
      comments: [
        'Interested! Shared my portfolio.',
        'Great opportunity for freshers!',
      ],
    },
  ]);

  const [newPostText, setNewPostText] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [openCommentsId, setOpenCommentsId] = useState(null);

  const imageInputRef = useRef(null);

  // My Network
  const [connections, setConnections] = useState([
    {
      id: 101,
      name: 'Sneha Desai',
      role: 'UI/UX Product Designer',
      mutual: '12 mutual connections',
      status: 'none',
    },
    {
      id: 102,
      name: 'Vikram Joshi',
      role: 'Full-Stack MERN Developer',
      mutual: '8 mutual connections',
      status: 'none',
    },
    {
      id: 103,
      name: 'Anjali Mehta',
      role: 'HR Manager at InfoTech',
      mutual: '5 mutual connections',
      status: 'connected',
    },
    {
      id: 104,
      name: 'Karan Shah',
      role: 'React Native Developer',
      mutual: '19 mutual connections',
      status: 'none',
    },
  ]);

  // Jobs
  const [appliedJobs, setAppliedJobs] = useState([]);

  const jobsList = [
    {
      id: 201,
      title: 'Junior ReactJS Developer',
      company: 'WebCraft Solutions',
      location: 'Ahmedabad, Gujarat (On-site)',
      salary: '₹3.5 - 5 LPA',
      posted: '1 day ago',
    },
    {
      id: 202,
      title: 'Frontend Web Developer',
      company: 'CloudScale India',
      location: 'Remote (India)',
      salary: '₹4.5 - 7 LPA',
      posted: '3 hours ago',
    },
    {
      id: 203,
      title: 'JavaScript UI Engineer',
      company: 'FinTech Labs',
      location: 'Gift City, Gandhinagar',
      salary: '₹5 - 8 LPA',
      posted: '2 days ago',
    },
  ];

  // Messaging
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'Priya Sharma',
      text: 'Hi Meet! Saw your React projects on GitHub, impressive work!',
    },
    {
      sender: 'You',
      text: 'Thank you so much Priya! Really appreciate it.',
    },
  ]);

  const [chatInput, setChatInput] = useState('');

  // -----------------------------------------
  // CREATE POST
  // -----------------------------------------

  const handleCreatePost = (e) => {
    e.preventDefault();

    if (!newPostText.trim() && !newPostImage) {
      return;
    }

    const createdPost = {
      id: Date.now(),
      author: 'Yash Modi (You)',
      role: 'ReactJS Developer | Building Interactive Web Apps',
      avatar: '🧑🏻‍💻',
      time: 'Just now • 🌐',
      content: newPostText.trim(),
      image: newPostImage,
      reaction: '👍',
      likes: 0,
      isLiked: false,
      comments: [],
    };

    setPosts((previousPosts) => [
      createdPost,
      ...previousPosts,
    ]);

    setNewPostText('');
    setNewPostImage(null);

    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  // -----------------------------------------
  // IMAGE UPLOAD
  // -----------------------------------------

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5 MB.');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setNewPostImage(reader.result);
    };

    reader.onerror = () => {
      alert('Unable to read the selected image.');
    };

    reader.readAsDataURL(file);
  };

  const removePostImage = () => {
    setNewPostImage(null);

    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  // -----------------------------------------
  // REACTION HANDLER
  // -----------------------------------------

  const handleReaction = (postId, emoji = '👍') => {
    setPosts((previousPosts) =>
      previousPosts.map((post) => {
        if (post.id !== postId) {
          return post;
        }

        const togglingOff =
          post.isLiked && post.reaction === emoji;

        let newLikes = post.likes;

        if (togglingOff) {
          newLikes = Math.max(0, post.likes - 1);
        } else if (!post.isLiked) {
          newLikes = post.likes + 1;
        }

        return {
          ...post,
          isLiked: !togglingOff,
          reaction: emoji,
          likes: newLikes,
        };
      })
    );
  };

  // -----------------------------------------
  // ADD COMMENT
  // -----------------------------------------

  const handleAddComment = (e, postId) => {
    e.preventDefault();

    const text = (commentInputs[postId] || '').trim();

    if (!text) return;

    setPosts((previousPosts) =>
      previousPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, text],
            }
          : post
      )
    );

    setCommentInputs((previousInputs) => ({
      ...previousInputs,
      [postId]: '',
    }));
  };

  // -----------------------------------------
  // CONNECT HANDLER
  // -----------------------------------------

  const handleConnect = (id) => {
    setConnections((previousConnections) =>
      previousConnections.map((person) => {
        if (person.id !== id) {
          return person;
        }

        if (person.status === 'none') {
          return {
            ...person,
            status: 'pending',
          };
        }

        if (person.status === 'pending') {
          return {
            ...person,
            status: 'none',
          };
        }

        return person;
      })
    );
  };

  // -----------------------------------------
  // SEND MESSAGE
  // -----------------------------------------

  const handleSendMessage = (e) => {
    e.preventDefault();

    const text = chatInput.trim();

    if (!text) return;

    setChatMessages((previousMessages) => [
      ...previousMessages,
      {
        sender: 'You',
        text,
      },
    ]);

    setChatInput('');
  };

  // -----------------------------------------
  // SEARCH POSTS
  // -----------------------------------------

  const filteredPosts = posts.filter(
    (post) =>
      post.content
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      post.author
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      post.role
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  // -----------------------------------------
  // APPLY FOR JOB
  // -----------------------------------------

  const handleApplyJob = (jobId) => {
    setAppliedJobs((previousJobs) =>
      previousJobs.includes(jobId)
        ? previousJobs
        : [...previousJobs, jobId]
    );
  };

  // -----------------------------------------
  // MAIN JSX
  // -----------------------------------------

  return (
    <div style={styles.app}>

      {/* TOP NAVBAR */}

      <div style={styles.navbar}>

        <div style={styles.brandSection}>
          <div style={styles.logo}>in</div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Search posts, people, jobs..."
            style={styles.searchInput}
          />
        </div>

        <div style={styles.navTabs}>
          {[
            { id: 'home', label: '🏠 Home' },
            { id: 'network', label: '👥 My Network' },
            { id: 'jobs', label: '💼 Jobs' },
            { id: 'messaging', label: '💬 Messaging' },
            { id: 'profile', label: '👤 Me' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveNav(tab.id)}
              style={{
                ...styles.navButton,
                backgroundColor:
                  activeNav === tab.id ? '#1e3a8a' : 'transparent',
                color:
                  activeNav === tab.id ? '#38bdf8' : '#94a3b8',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* =========================================
          HOME FEED
      ========================================= */}

      {activeNav === 'home' && (
        <div style={styles.homeGrid}>

          {/* LEFT PROFILE CARD */}

          <div style={styles.card}>
            <div style={styles.coverBanner} />

            <div style={styles.profileAvatar}>
              🧑🏻‍💻
            </div>

            <div style={styles.profileCardContent}>
              <strong style={styles.profileName}>
                Yash Modi
              </strong>

              <p style={styles.mutedText}>
                ReactJS Developer • Ahmedabad, Gujarat
              </p>

              <div style={styles.profileStats}>
                <div style={styles.statRow}>
                  <span>Profile viewers</span>
                  <strong>184</strong>
                </div>

                <div style={styles.statRow}>
                  <span>Connections</span>
                  <strong>500+</strong>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER FEED */}

          <div style={styles.feedColumn}>

            {/* POST COMPOSER */}

            <form
              onSubmit={handleCreatePost}
              style={styles.card}
            >
              <div style={styles.composerTop}>
                <span style={{ fontSize: '28px' }}>
                  🧑🏻‍💻
                </span>

                <textarea
                  rows="2"
                  value={newPostText}
                  onChange={(e) =>
                    setNewPostText(e.target.value)
                  }
                  placeholder="Share an update, project, or achievement..."
                  style={styles.postTextarea}
                />
              </div>

              {newPostImage && (
                <div style={styles.imagePreviewContainer}>
                  <img
                    src={newPostImage}
                    alt="Post preview"
                    style={styles.previewImage}
                  />

                  <button
                    type="button"
                    onClick={removePostImage}
                    style={styles.removeImageButton}
                  >
                    ✖
                  </button>
                </div>
              )}

              <div style={styles.composerActions}>
                <label style={styles.photoLabel}>
                  🖼️ Add Photo

                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </label>

                <button
                  type="submit"
                  style={styles.primaryButton}
                >
                  Post
                </button>
              </div>
            </form>

            {/* POSTS LIST */}

            {filteredPosts.length === 0 && (
              <div style={styles.card}>
                <p style={styles.mutedText}>
                  No posts found.
                </p>
              </div>
            )}

            {filteredPosts.map((post) => (
              <div key={post.id} style={styles.card}>

                {/* POST HEADER */}

                <div style={styles.postHeader}>
                  <div style={styles.postAvatar}>
                    {post.avatar}
                  </div>

                  <div style={{ flex: 1 }}>
                    <strong style={styles.postAuthor}>
                      {post.author}
                    </strong>

                    <span style={styles.postRole}>
                      {post.role}
                    </span>

                    <small style={styles.postTime}>
                      {post.time}
                    </small>
                  </div>
                </div>

                {/* POST CONTENT */}

                <p style={styles.postContent}>
                  {post.content}
                </p>

                {post.image && (
                  <img
                    src={post.image}
                    alt="Post attachment"
                    style={styles.postImage}
                  />
                )}

                {/* REACTION SUMMARY */}

                <div style={styles.reactionSummary}>
                  <span>
                    {post.isLiked ? post.reaction : '👍'}{' '}
                    {post.likes} reactions
                  </span>

                  <span>
                    {post.comments.length} comments
                  </span>
                </div>

                {/* REACTION BUTTONS */}

                <div style={styles.reactionActions}>
                  <div style={styles.reactionButtons}>
                    {['👍', '❤️', '👏', '💡'].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() =>
                          handleReaction(post.id, emoji)
                        }
                        style={{
                          ...styles.reactionButton,
                          backgroundColor:
                            post.isLiked &&
                            post.reaction === emoji
                              ? '#1e3a8a'
                              : '#020617',
                        }}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setOpenCommentsId(
                        openCommentsId === post.id
                          ? null
                          : post.id
                      )
                    }
                    style={styles.commentToggle}
                  >
                    💬 Comment
                  </button>
                </div>

                {/* COMMENTS SECTION */}

                {openCommentsId === post.id && (
                  <div style={styles.commentsSection}>

                    <form
                      onSubmit={(e) =>
                        handleAddComment(e, post.id)
                      }
                      style={styles.commentForm}
                    >
                      <input
                        type="text"
                        value={commentInputs[post.id] || ''}
                        onChange={(e) =>
                          setCommentInputs((previous) => ({
                            ...previous,
                            [post.id]: e.target.value,
                          }))
                        }
                        placeholder="Write a comment..."
                        style={styles.commentInput}
                      />

                      <button
                        type="submit"
                        style={styles.commentSendButton}
                      >
                        Send
                      </button>
                    </form>

                    {post.comments.map((comment, index) => (
                      <div
                        key={index}
                        style={styles.commentItem}
                      >
                        <strong>Member:</strong> {comment}
                      </div>
                    ))}

                    {post.comments.length === 0 && (
                      <p style={styles.mutedText}>
                        No comments yet.
                      </p>
                    )}

                  </div>
                )}

              </div>
            ))}

          </div>

          {/* RIGHT NEWS SIDEBAR */}

          <div style={styles.card}>
            <h4 style={styles.newsTitle}>
              📰 LinkedIn Tech News
            </h4>

            <ul style={styles.newsList}>
              <li>
                ReactJS Demand Surges in 2026
                <small>Top story • 5,410 readers</small>
              </li>

              <li>
                Ahmedabad IT Startups Expanding
                <small>3h ago • 2,890 readers</small>
              </li>

              <li>
                Building Full-Stack Portfolios
                <small>1d ago • 1,920 readers</small>
              </li>
            </ul>
          </div>

        </div>
      )}

      {/* =========================================
          MY NETWORK
      ========================================= */}

      {activeNav === 'network' && (
        <div style={styles.card}>

          <h3 style={styles.sectionTitle}>
            👥 People You May Know
          </h3>

          <div style={styles.networkGrid}>
            {connections.map((person) => (
              <div
                key={person.id}
                style={styles.personCard}
              >
                <div style={styles.personAvatar}>
                  👤
                </div>

                <strong style={styles.personName}>
                  {person.name}
                </strong>

                <span style={styles.personRole}>
                  {person.role}
                </span>

                <small style={styles.mutedText}>
                  {person.mutual}
                </small>

                <button
                  onClick={() => handleConnect(person.id)}
                  disabled={person.status === 'connected'}
                  style={{
                    ...styles.connectButton,
                    backgroundColor:
                      person.status === 'connected'
                        ? '#22c55e'
                        : person.status === 'pending'
                        ? '#38bdf8'
                        : 'transparent',
                    color:
                      person.status === 'none'
                        ? '#38bdf8'
                        : '#000',
                    cursor:
                      person.status === 'connected'
                        ? 'default'
                        : 'pointer',
                  }}
                >
                  {person.status === 'connected'
                    ? '✔ Connected'
                    : person.status === 'pending'
                    ? '⏳ Pending (Cancel)'
                    : '+ Connect'}
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* =========================================
          JOBS BOARD
      ========================================= */}

      {activeNav === 'jobs' && (
        <div style={styles.card}>

          <h3 style={styles.sectionTitle}>
            💼 Recommended ReactJS Jobs
          </h3>

          <div style={styles.jobsList}>
            {jobsList.map((job) => {
              const isApplied = appliedJobs.includes(job.id);

              return (
                <div
                  key={job.id}
                  style={styles.jobCard}
                >
                  <div style={{ flex: 1 }}>
                    <strong style={styles.jobTitle}>
                      {job.title}
                    </strong>

                    <div style={styles.jobCompany}>
                      {job.company} • {job.location}
                    </div>

                    <div style={styles.jobDetails}>
                      💰 {job.salary} • 🕒 {job.posted}
                    </div>
                  </div>

                  <button
                    onClick={() => handleApplyJob(job.id)}
                    disabled={isApplied}
                    style={{
                      ...styles.applyButton,
                      backgroundColor: isApplied
                        ? '#22c55e'
                        : '#0a66c2',
                      color: isApplied ? '#000' : '#fff',
                      cursor: isApplied
                        ? 'default'
                        : 'pointer',
                    }}
                  >
                    {isApplied
                      ? '✅ Applied'
                      : '⚡ Easy Apply'}
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* =========================================
          DIRECT MESSAGING
      ========================================= */}

      {activeNav === 'messaging' && (
        <div style={styles.messagingCard}>

          <h3 style={styles.sectionTitle}>
            💬 Direct Messaging (Priya Sharma)
          </h3>

          <div style={styles.messagesArea}>
            {chatMessages.map((message, index) => (
              <div
                key={index}
                style={{
                  ...styles.messageBubble,
                  alignSelf:
                    message.sender === 'You'
                      ? 'flex-end'
                      : 'flex-start',
                  backgroundColor:
                    message.sender === 'You'
                      ? '#0a66c2'
                      : '#1e293b',
                }}
              >
                <strong style={styles.messageSender}>
                  {message.sender}
                </strong>

                {message.text}
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSendMessage}
            style={styles.messageForm}
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Write a message..."
              style={styles.messageInput}
            />

            <button
              type="submit"
              style={styles.primaryButton}
            >
              Send
            </button>
          </form>

        </div>
      )}

      {/* =========================================
          PROFILE
      ========================================= */}

      {activeNav === 'profile' && (
        <div style={styles.profilePage}>

          <div style={styles.profileBanner} />

          <div style={styles.fullProfileContent}>

            <div style={styles.largeAvatar}>
              🧑🏻‍💻
            </div>

            <h2 style={styles.profileHeading}>
              Meet Patel
            </h2>

            <p style={styles.profileDescription}>
              Frontend ReactJS Developer | JavaScript (ES6+) |
              REST APIs
            </p>

            <div style={styles.profileLocation}>
              📍 Jodhpur Village, Ahmedabad, Gujarat, India
              {' • '}
              <strong style={{ color: '#38bdf8' }}>
                500+ connections
              </strong>
            </div>

            <div style={styles.skillsList}>
              {[
                'ReactJS',
                'JavaScript',
                'HTML5',
                'CSS3',
                'Git & GitHub',
                'REST APIs',
              ].map((skill) => (
                <span
                  key={skill}
                  style={styles.skillBadge}
                >
                  {skill}
                </span>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// =============================================
// STYLES
// =============================================

const styles = {
  app: {
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    padding: '15px',
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif',
    color: '#e2e8f0',
    backgroundColor: '#020617',
    minHeight: '100vh',
  },

  navbar: {
    backgroundColor: '#0f172a',
    padding: '10px 15px',
    borderRadius: '14px',
    border: '1px solid #1e293b',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
  },

  brandSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },

  logo: {
    backgroundColor: '#0a66c2',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '22px',
    padding: '2px 9px',
    borderRadius: '6px',
  },

  searchInput: {
    padding: '9px 12px',
    borderRadius: '8px',
    border: '1px solid #334155',
    backgroundColor: '#020617',
    color: '#fff',
    fontSize: '13px',
    width: '210px',
    maxWidth: '100%',
    outline: 'none',
    boxSizing: 'border-box',
  },

  navTabs: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
  },

  navButton: {
    padding: '9px 12px',
    borderRadius: '10px',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '12px',
    cursor: 'pointer',
  },

  homeGrid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(200px, 1fr) minmax(300px, 2fr) minmax(190px, 1fr)',
    gap: '18px',
    alignItems: 'start',
  },

  card: {
    backgroundColor: '#0f172a',
    padding: '16px',
    borderRadius: '16px',
    border: '1px solid #1e293b',
    textAlign: 'left',
    minWidth: 0,
  },

  coverBanner: {
    height: '65px',
    background: 'linear-gradient(135deg, #0a66c2, #1e3a8a)',
    margin: '-16px -16px 0',
  },

  profileAvatar: {
    width: '68px',
    height: '68px',
    borderRadius: '50%',
    backgroundColor: '#1e293b',
    border: '3px solid #0f172a',
    margin: '-34px auto 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
  },

  profileCardContent: {
    padding: '0 5px 5px',
    textAlign: 'center',
  },

  profileName: {
    fontSize: '16px',
    color: '#fff',
    display: 'block',
  },

  mutedText: {
    fontSize: '12px',
    color: '#94a3b8',
    margin: '6px 0',
  },

  profileStats: {
    borderTop: '1px solid #1e293b',
    paddingTop: '12px',
    fontSize: '12px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#94a3b8',
  },

  feedColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    minWidth: 0,
  },

  composerTop: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
  },

  postTextarea: {
    flex: 1,
    minWidth: 0,
    padding: '10px 14px',
    borderRadius: '12px',
    border: '1px solid #334155',
    backgroundColor: '#020617',
    color: '#fff',
    fontSize: '13px',
    resize: 'vertical',
    outline: 'none',
  },

  imagePreviewContainer: {
    marginBottom: '10px',
    position: 'relative',
  },

  previewImage: {
    width: '100%',
    maxHeight: '180px',
    objectFit: 'cover',
    borderRadius: '10px',
  },

  removeImageButton: {
    position: 'absolute',
    top: '6px',
    right: '6px',
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '28px',
    height: '28px',
    cursor: 'pointer',
  },

  composerActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
  },

  photoLabel: {
    color: '#38bdf8',
    fontSize: '13px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },

  primaryButton: {
    padding: '9px 20px',
    backgroundColor: '#0a66c2',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '13px',
    cursor: 'pointer',
  },

  postHeader: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    marginBottom: '12px',
  },

  postAvatar: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    backgroundColor: '#1e293b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    flexShrink: 0,
  },

  postAuthor: {
    fontSize: '14px',
    color: '#fff',
    display: 'block',
  },

  postRole: {
    fontSize: '11px',
    color: '#94a3b8',
    display: 'block',
    marginTop: '3px',
  },

  postTime: {
    fontSize: '10px',
    color: '#64748b',
    display: 'block',
    marginTop: '3px',
  },

  postContent: {
    fontSize: '13px',
    color: '#e2e8f0',
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap',
    overflowWrap: 'anywhere',
  },

  postImage: {
    width: '100%',
    maxHeight: '300px',
    objectFit: 'contain',
    borderRadius: '10px',
    marginBottom: '10px',
    backgroundColor: '#020617',
  },

  reactionSummary: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    fontSize: '11px',
    color: '#94a3b8',
    borderBottom: '1px solid #1e293b',
    padding: '10px 0',
    marginBottom: '8px',
  },

  reactionActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '6px',
    flexWrap: 'wrap',
  },

  reactionButtons: {
    display: 'flex',
    gap: '5px',
  },

  reactionButton: {
    padding: '6px 9px',
    border: '1px solid #1e293b',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
  },

  commentToggle: {
    padding: '7px 10px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#94a3b8',
    fontWeight: 'bold',
    fontSize: '12px',
    cursor: 'pointer',
  },

  commentsSection: {
    marginTop: '12px',
    borderTop: '1px solid #1e293b',
    paddingTop: '12px',
  },

  commentForm: {
    display: 'flex',
    gap: '6px',
    marginBottom: '10px',
  },

  commentInput: {
    flex: 1,
    minWidth: 0,
    padding: '8px 12px',
    borderRadius: '20px',
    border: '1px solid #334155',
    backgroundColor: '#020617',
    color: '#fff',
    fontSize: '12px',
    outline: 'none',
  },

  commentSendButton: {
    padding: '7px 14px',
    backgroundColor: '#38bdf8',
    color: '#000',
    border: 'none',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '12px',
    cursor: 'pointer',
  },

  commentItem: {
    backgroundColor: '#020617',
    padding: '9px 12px',
    borderRadius: '10px',
    fontSize: '12px',
    color: '#cbd5e1',
    marginBottom: '5px',
    overflowWrap: 'anywhere',
  },

  newsTitle: {
    margin: '0 0 12px',
    fontSize: '14px',
    color: '#fff',
  },

  newsList: {
    margin: 0,
    paddingLeft: '18px',
    fontSize: '12px',
    color: '#cbd5e1',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },

  networkGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '14px',
  },

  sectionTitle: {
    margin: '0 0 18px',
    color: '#38bdf8',
    fontSize: '19px',
  },

  personCard: {
    backgroundColor: '#020617',
    padding: '16px',
    borderRadius: '14px',
    border: '1px solid #1e293b',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },

  personAvatar: {
    fontSize: '36px',
    marginBottom: '4px',
  },

  personName: {
    fontSize: '15px',
    color: '#fff',
  },

  personRole: {
    fontSize: '12px',
    color: '#94a3b8',
  },

  connectButton: {
    width: '100%',
    padding: '9px',
    borderRadius: '20px',
    border: '1px solid #38bdf8',
    fontWeight: 'bold',
    fontSize: '12px',
  },

  jobsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },

  jobCard: {
    backgroundColor: '#020617',
    padding: '16px',
    borderRadius: '14px',
    border: '1px solid #1e293b',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
  },

  jobTitle: {
    fontSize: '16px',
    color: '#38bdf8',
    display: 'block',
    marginBottom: '5px',
  },

  jobCompany: {
    fontSize: '13px',
    color: '#fff',
  },

  jobDetails: {
    fontSize: '12px',
    color: '#4ade80',
    marginTop: '6px',
  },

  applyButton: {
    padding: '10px 20px',
    borderRadius: '20px',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '13px',
  },

  messagingCard: {
    maxWidth: '650px',
    margin: '0 auto',
    backgroundColor: '#0f172a',
    padding: '20px',
    borderRadius: '18px',
    border: '1px solid #1e293b',
  },

  messagesArea: {
    backgroundColor: '#020617',
    padding: '15px',
    borderRadius: '12px',
    height: '280px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '12px',
  },

  messageBubble: {
    padding: '9px 14px',
    borderRadius: '12px',
    fontSize: '13px',
    maxWidth: '75%',
    overflowWrap: 'anywhere',
  },

  messageSender: {
    fontSize: '11px',
    display: 'block',
    color: '#cbd5e1',
    marginBottom: '4px',
  },

  messageForm: {
    display: 'flex',
    gap: '8px',
  },

  messageInput: {
    flex: 1,
    minWidth: 0,
    padding: '10px 14px',
    borderRadius: '20px',
    border: '1px solid #334155',
    backgroundColor: '#020617',
    color: '#fff',
    fontSize: '13px',
    outline: 'none',
  },

  profilePage: {
    maxWidth: '700px',
    margin: '0 auto',
    backgroundColor: '#0f172a',
    borderRadius: '18px',
    border: '1px solid #1e293b',
    overflow: 'hidden',
  },

  profileBanner: {
    height: '120px',
    background: 'linear-gradient(135deg, #0a66c2, #1e1b4b)',
  },

  fullProfileContent: {
    padding: '0 24px 25px',
  },

  largeAvatar: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    backgroundColor: '#1e293b',
    border: '4px solid #0f172a',
    marginTop: '-45px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '42px',
  },

  profileHeading: {
    margin: '0 0 5px',
    color: '#fff',
  },

  profileDescription: {
    margin: '0 0 10px',
    color: '#cbd5e1',
    fontSize: '14px',
    lineHeight: '1.5',
  },

  profileLocation: {
    fontSize: '12px',
    color: '#94a3b8',
    marginBottom: '16px',
    lineHeight: '1.6',
  },

  skillsList: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },

  skillBadge: {
    padding: '7px 12px',
    backgroundColor: '#020617',
    border: '1px solid #334155',
    borderRadius: '20px',
    fontSize: '12px',
    color: '#38bdf8',
    fontWeight: 'bold',
  },
};

export default LinkedInClone;
