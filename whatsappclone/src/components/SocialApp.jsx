
import React, { useState } from 'react'

function SocialApp() {
  const [activeTab, setActiveTab] = useState('feed')
  const [searchQuery, setSearchQuery] = useState('')

  // Stories
  const [stories, setStories] = useState([
    {
      id: 1,
      user: 'Yash (You)',
      avatar: '🧑🏻‍💻',
      text: 'Coding a full-featured React app! 🚀',
      color: '#38bdf8'
    },
    {
      id: 2,
      user: 'Priya',
      avatar: '👩🏻‍💻',
      text: 'Evening coffee ☕',
      color: '#ec4899'
    },
    {
      id: 3,
      user: 'Rahul',
      avatar: '👨🏻',
      text: 'Just launched my portfolio! 🎉',
      color: '#f59e0b'
    },
    {
      id: 4,
      user: 'Sneha',
      avatar: '🎨',
      text: 'Designing mobile interfaces 💻',
      color: '#22c55e'
    }
  ])

  const [activeStory, setActiveStory] = useState(null)
  const [newStoryText, setNewStoryText] = useState('')
  const [showAddStory, setShowAddStory] = useState(false)

  // Posts
  const [posts, setPosts] = useState([
    {
      id: 101,
      user: 'Priya Sharma',
      handle: '@priya.codes',
      avatar: '👩🏻‍💻',
      time: '15m • Ahmedabad • Public',
      feeling: 'feeling motivated 💪',
      caption: 'Late night ReactJS coding session complete! 💻✨ #ReactJS',
      image: null,
      reaction: '❤️',
      likes: 124,
      shares: 14,
      liked: false,
      saved: false,
      comments: ['Super clean setup! 🔥', 'Keep building!']
    },
    {
      id: 102,
      user: 'Rahul Patel',
      handle: '@rahul_dev',
      avatar: '👨🏻',
      time: '2h • Friends',
      feeling: 'celebrating 🎉',
      caption: 'Excited about our upcoming Ahmedabad Frontend Developers Meetup!',
      image: null,
      reaction: '👍',
      likes: 68,
      shares: 9,
      liked: true,
      saved: false,
      comments: ['Count me in!', 'See you there!']
    }
  ])

  const [captionInput, setCaptionInput] = useState('')
  const [photoInput, setPhotoInput] = useState(null)
  const [feelingInput, setFeelingInput] = useState('')
  const [privacyInput, setPrivacyInput] = useState('🌐 Public')
  const [commentInputs, setCommentInputs] = useState({})

  // Reels
  const [reels, setReels] = useState([
    {
      id: 301,
      creator: '@react_wizard',
      title: '3 React Hooks Tricks in 30 Seconds ⚡',
      likes: 540,
      liked: false,
      bg: 'linear-gradient(135deg, #1e3a8a, #701a75)'
    },
    {
      id: 302,
      creator: '@ahmedabad_diaries',
      title: 'Night View of Riverfront & Atal Bridge 🌉',
      likes: 920,
      liked: true,
      bg: 'linear-gradient(135deg, #064e3b, #1e1b4b)'
    }
  ])

  const [reelIdx, setReelIdx] = useState(0)

  // Friends
  const [people, setPeople] = useState([
    {
      id: 401,
      name: 'Anjali Mehta',
      role: 'UI Designer • 15 mutual friends',
      status: 'request'
    },
    {
      id: 402,
      name: 'Karan Shah',
      role: 'Full-Stack Developer • 8 mutual friends',
      status: 'none'
    },
    {
      id: 403,
      name: 'Neha Joshi',
      role: 'Product Manager • 22 mutual friends',
      status: 'friend'
    }
  ])

  // Messages
  const [messages, setMessages] = useState([
    {
      sender: 'Priya Sharma',
      text: 'Hey! Loved your latest post!'
    },
    {
      sender: 'You',
      text: 'Thanks Priya! 😊'
    }
  ])

  const [msgInput, setMsgInput] = useState('')

  // Notifications
  const [notifications, setNotifications] = useState([
    '❤️ Priya Sharma loved your photo post • 5m ago',
    '👥 Anjali Mehta sent you a friend request • 1h ago',
    '💬 Rahul Patel commented on your status • 3h ago'
  ])

  // Add Story
  const handleAddStory = (e) => {
    e.preventDefault()

    if (!newStoryText.trim()) return

    const newStory = {
      id: Date.now(),
      user: 'Meet (You)',
      avatar: '🧑🏻‍💻',
      text: newStoryText.trim(),
      color: '#ec4899'
    }

    setStories(prev => [newStory, ...prev])
    setNewStoryText('')
    setShowAddStory(false)
    setActiveStory(newStory)
  }

  // Photo Upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.')
      e.target.value = ''
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5 MB.')
      e.target.value = ''
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setPhotoInput(reader.result)
    }

    reader.onerror = () => {
      alert('Unable to read the selected image.')
    }

    reader.readAsDataURL(file)
    e.target.value = ''
  }

  // Create Post
  const handleCreatePost = (e) => {
    e.preventDefault()

    if (!captionInput.trim() && !photoInput) return

    const newPost = {
      id: Date.now(),
      user: 'Meet Patel (You)',
      handle: '@crazydev1990',
      avatar: '🧑🏻‍💻',
      time: `Just now • ${privacyInput}`,
      feeling: feelingInput,
      caption: captionInput.trim(),
      image: photoInput,
      reaction: '❤️',
      likes: 0,
      shares: 0,
      liked: false,
      saved: false,
      comments: []
    }

    setPosts(prev => [newPost, ...prev])
    setNotifications(prev => [
      '✅ Your new post is live on the feed!',
      ...prev
    ])

    setCaptionInput('')
    setPhotoInput(null)
    setFeelingInput('')
    setPrivacyInput('🌐 Public')
  }

  // Reactions
  const handleReaction = (id, emoji) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id !== id) return post

        const sameReaction = post.liked && post.reaction === emoji

        return {
          ...post,
          liked: !sameReaction,
          reaction: emoji,
          likes: sameReaction
            ? Math.max(0, post.likes - 1)
            : post.liked
              ? post.likes
              : post.likes + 1
        }
      })
    )
  }

  // Share
  const handleShare = (id) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === id
          ? { ...post, shares: post.shares + 1 }
          : post
      )
    )

    alert('Post shared to your timeline!')
  }

  // Save Post
  const toggleSave = (id) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === id
          ? { ...post, saved: !post.saved }
          : post
      )
    )
  }

  // Comment
  const handleComment = (e, id) => {
    e.preventDefault()

    const text = (commentInputs[id] || '').trim()

    if (!text) return

    setPosts(prev =>
      prev.map(post =>
        post.id === id
          ? { ...post, comments: [...post.comments, text] }
          : post
      )
    )

    setCommentInputs(prev => ({
      ...prev,
      [id]: ''
    }))
  }

  // Friend Action
  const handleFriendAction = (id, nextStatus) => {
    setPeople(prev =>
      prev.map(person =>
        person.id === id
          ? { ...person, status: nextStatus }
          : person
      )
    )
  }

  // Send Message
  const handleSendDm = (e) => {
    e.preventDefault()

    if (!msgInput.trim()) return

    setMessages(prev => [
      ...prev,
      {
        sender: 'You',
        text: msgInput.trim()
      }
    ])

    setMsgInput('')
  }

  // Search Posts
  const filteredPosts = posts.filter(post =>
    post.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.handle.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const currentReel = reels[reelIdx]

  const tabs = [
    { id: 'feed', label: '🏠 Feed' },
    { id: 'reels', label: '🎬 Reels' },
    { id: 'friends', label: '👥 Friends' },
    { id: 'messages', label: '💬 Chat' },
    { id: 'notifications', label: `🔔 Alerts (${notifications.length})` },
    { id: 'profile', label: '👤 Profile' }
  ]

  return (
    <div style={{
      maxWidth: '680px',
      margin: '0 auto',
      backgroundColor: '#0f172a',
      borderRadius: '22px',
      border: '2px solid #ec4899',
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
    }}>

      {/* Header */}
      <div style={{
        padding: '12px 18px',
        background: 'linear-gradient(90deg, #1877F2, #E1306C)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <strong style={{ fontSize: '18px' }}>
          📘📸 InstaBook Pro
        </strong>

        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="🔍 Search posts or people..."
          style={{
            padding: '8px 12px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: 'rgba(0,0,0,0.35)',
            color: '#fff',
            fontSize: '12px',
            outline: 'none',
            width: '190px'
          }}
        />
      </div>

      {/* Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: '#020617',
        padding: '8px 4px',
        borderBottom: '1px solid #1e293b',
        flexWrap: 'wrap',
        gap: '4px'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 12px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor:
                activeTab === tab.id ? '#be185d' : 'transparent',
              color: activeTab === tab.id ? '#fff' : '#94a3b8',
              fontWeight: 'bold',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* FEED TAB */}
      {activeTab === 'feed' && (
        <div>

          {/* Stories */}
          <div style={{
            display: 'flex',
            gap: '12px',
            padding: '14px 16px',
            backgroundColor: '#020617',
            borderBottom: '1px solid #1e293b',
            overflowX: 'auto',
            alignItems: 'center'
          }}>
            <button
              onClick={() => setShowAddStory(!showAddStory)}
              style={{
                minWidth: '64px',
                height: '74px',
                borderRadius: '14px',
                border: '1px dashed #38bdf8',
                backgroundColor: '#0f172a',
                color: '#38bdf8',
                fontSize: '11px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              ➕
              <br />
              Add Story
            </button>

            {stories.map(story => (
              <div
                key={story.id}
                onClick={() => setActiveStory(story)}
                style={{
                  textAlign: 'center',
                  cursor: 'pointer',
                  minWidth: '64px'
                }}
              >
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  border: `3px solid ${story.color}`,
                  backgroundColor: '#1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  margin: '0 auto 4px'
                }}>
                  {story.avatar}
                </div>

                <span style={{
                  fontSize: '11px',
                  color: '#cbd5e1'
                }}>
                  {story.user}
                </span>
              </div>
            ))}
          </div>

          {/* Add Story Form */}
          {showAddStory && (
            <form
              onSubmit={handleAddStory}
              style={{
                padding: '10px 16px',
                backgroundColor: '#1e293b',
                display: 'flex',
                gap: '8px'
              }}
            >
              <input
                type="text"
                value={newStoryText}
                onChange={e => setNewStoryText(e.target.value)}
                placeholder="Write a story update..."
                style={{
                  flex: 1,
                  minWidth: 0,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#020617',
                  color: '#fff'
                }}
              />

              <button type="submit">
                Share Story
              </button>
            </form>
          )}

          {/* Story Viewer */}
          {activeStory && (
            <div style={{
              backgroundColor: '#1e1b4b',
              padding: '14px 18px',
              borderBottom: '2px solid #ec4899',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div>
                <strong style={{
                  fontSize: '12px',
                  color: '#f472b6',
                  display: 'block'
                }}>
                  📸 {activeStory.user}'s Story
                </strong>

                <span style={{ fontSize: '14px' }}>
                  {activeStory.text}
                </span>
              </div>

              <button
                onClick={() => setActiveStory(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                ✖
              </button>
            </div>
          )}

          {/* Post Composer */}
          <form
            onSubmit={handleCreatePost}
            style={{
              padding: '16px',
              backgroundColor: '#0f172a',
              borderBottom: '1px solid #1e293b',
              textAlign: 'left'
            }}
          >
            <textarea
              rows="2"
              value={captionInput}
              onChange={e => setCaptionInput(e.target.value)}
              placeholder="What's on your mind? Share a photo or update..."
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '12px',
                border: '1px solid #334155',
                backgroundColor: '#020617',
                color: '#fff',
                fontSize: '13px',
                resize: 'none',
                boxSizing: 'border-box',
                marginBottom: '10px'
              }}
            />

            {photoInput && (
              <div style={{ marginBottom: '10px' }}>
                <img
                  src={photoInput}
                  alt="Post preview"
                  style={{
                    width: '100%',
                    maxHeight: '180px',
                    objectFit: 'cover',
                    borderRadius: '10px'
                  }}
                />

                <button
                  type="button"
                  onClick={() => setPhotoInput(null)}
                  style={{ marginTop: '5px' }}
                >
                  Remove Photo
                </button>
              </div>
            )}

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <div style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}>
                <label style={{ fontSize: '12px', cursor: 'pointer' }}>
                  🖼️ Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    hidden
                  />
                </label>

                <select
                  value={feelingInput}
                  onChange={e => setFeelingInput(e.target.value)}
                  style={{
                    padding: '5px',
                    borderRadius: '6px',
                    backgroundColor: '#020617',
                    color: '#cbd5e1',
                    border: '1px solid #334155'
                  }}
                >
                  <option value="">😊 Feeling...</option>
                  <option value="Happy 😊">Happy</option>
                  <option value="Motivated 💪">Motivated</option>
                  <option value="Coding 💻">Coding</option>
                  <option value="Excited 🎉">Excited</option>
                </select>

                <select
                  value={privacyInput}
                  onChange={e => setPrivacyInput(e.target.value)}
                  style={{
                    padding: '5px',
                    borderRadius: '6px',
                    backgroundColor: '#020617',
                    color: '#cbd5e1',
                    border: '1px solid #334155'
                  }}
                >
                  <option value="🌐 Public">🌐 Public</option>
                  <option value="👥 Friends">👥 Friends</option>
                  <option value="🔒 Only Me">🔒 Only Me</option>
                </select>
              </div>

              <button
                type="submit"
                style={{
                  padding: '8px 20px',
                  backgroundColor: '#ec4899',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '20px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Post 🚀
              </button>
            </div>
          </form>

          {/* Posts */}
          <div style={{
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxHeight: '540px',
            overflowY: 'auto'
          }}>
            {filteredPosts.length === 0 && (
              <p style={{ textAlign: 'center', color: '#94a3b8' }}>
                No posts found.
              </p>
            )}

            {filteredPosts.map(post => (
              <div
                key={post.id}
                style={{
                  backgroundColor: '#020617',
                  borderRadius: '16px',
                  border: '1px solid #1e293b',
                  padding: '14px',
                  textAlign: 'left'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '10px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#1e293b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px'
                  }}>
                    {post.avatar}
                  </div>

                  <div>
                    <strong style={{ fontSize: '14px' }}>
                      {post.user}
                    </strong>

                    {post.feeling && (
                      <span style={{
                        fontSize: '12px',
                        color: '#f472b6'
                      }}>
                        {' '}is {post.feeling}
                      </span>
                    )}

                    <div style={{
                      fontSize: '11px',
                      color: '#94a3b8'
                    }}>
                      {post.handle} • {post.time}
                    </div>
                  </div>
                </div>

                {post.caption && (
                  <p style={{
                    fontSize: '13px',
                    color: '#e2e8f0',
                    lineHeight: '1.5'
                  }}>
                    {post.caption}
                  </p>
                )}

                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    onDoubleClick={() => handleReaction(post.id, '❤️')}
                    style={{
                      width: '100%',
                      maxHeight: '260px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      marginBottom: '10px',
                      cursor: 'pointer'
                    }}
                  />
                )}

                {/* Reactions */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid #1e293b',
                  paddingTop: '10px',
                  marginBottom: '10px',
                  flexWrap: 'wrap',
                  gap: '6px'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center'
                  }}>
                    {['❤️', '👍', '😂', '😮', '😢'].map(emoji => (
                      <button
                        key={emoji}
                        onClick={() => handleReaction(post.id, emoji)}
                        style={{
                          padding: '4px 7px',
                          borderRadius: '8px',
                          border: '1px solid #334155',
                          backgroundColor:
                            post.liked && post.reaction === emoji
                              ? '#be185d'
                              : '#0f172a',
                          cursor: 'pointer',
                          fontSize: '13px'
                        }}
                      >
                        {emoji}
                      </button>
                    ))}

                    <span style={{
                      fontSize: '12px',
                      color: '#94a3b8',
                      marginLeft: '4px'
                    }}>
                      {post.likes}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => handleShare(post.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#38bdf8',
                        cursor: 'pointer'
                      }}
                    >
                      🔄 Share ({post.shares})
                    </button>

                    <button
                      onClick={() => toggleSave(post.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: post.saved ? '#facc15' : '#94a3b8',
                        cursor: 'pointer'
                      }}
                    >
                      {post.saved ? '🔖 Saved' : '📑 Save'}
                    </button>
                  </div>
                </div>

                {/* Comments */}
                {post.comments.map((comment, index) => (
                  <div
                    key={`${post.id}-${index}`}
                    style={{
                      fontSize: '12px',
                      color: '#cbd5e1',
                      backgroundColor: '#0f172a',
                      padding: '7px 10px',
                      borderRadius: '8px',
                      marginBottom: '4px'
                    }}
                  >
                    Comment: {comment}
                  </div>
                ))}

                <form
                  onSubmit={e => handleComment(e, post.id)}
                  style={{
                    display: 'flex',
                    gap: '6px',
                    marginTop: '8px'
                  }}
                >
                  <input
                    type="text"
                    value={commentInputs[post.id] || ''}
                    onChange={e =>
                      setCommentInputs(prev => ({
                        ...prev,
                        [post.id]: e.target.value
                      }))
                    }
                    placeholder="Write a comment..."
                    style={{
                      flex: 1,
                      minWidth: 0,
                      padding: '7px 12px',
                      borderRadius: '20px',
                      border: '1px solid #334155',
                      backgroundColor: '#0f172a',
                      color: '#fff'
                    }}
                  />

                  <button type="submit">
                    Post
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REELS TAB */}
      {activeTab === 'reels' && currentReel && (
        <div style={{ padding: '25px', textAlign: 'center' }}>
          <div style={{
            maxWidth: '320px',
            height: '380px',
            margin: '0 auto',
            borderRadius: '20px',
            background: currentReel.bg,
            border: '2px solid #ec4899',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <span>🎬 InstaBook Reels</span>

            <div>
              <div style={{ fontSize: '48px' }}>🎥✨</div>

              <h3>{currentReel.title}</h3>

              <span>{currentReel.creator}</span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <button
                onClick={() => {
                  setReels(prev =>
                    prev.map((reel, index) =>
                      index === reelIdx
                        ? {
                            ...reel,
                            liked: !reel.liked,
                            likes: reel.liked
                              ? Math.max(0, reel.likes - 1)
                              : reel.likes + 1
                          }
                        : reel
                    )
                  )
                }}
              >
                {currentReel.liked ? '❤️' : '🤍'} {currentReel.likes}
              </button>

              <button
                onClick={() =>
                  setReelIdx(index => (index + 1) % reels.length)
                }
              >
                Next Reel ⬇️
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FRIENDS TAB */}
      {activeTab === 'friends' && (
        <div style={{ padding: '20px', textAlign: 'left' }}>
          <h3 style={{ color: '#38bdf8' }}>
            👥 Friend Requests & Suggestions
          </h3>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {people.map(person => (
              <div
                key={person.id}
                style={{
                  backgroundColor: '#020617',
                  padding: '14px',
                  borderRadius: '12px',
                  border: '1px solid #1e293b',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <div>
                  <strong>{person.name}</strong>
                  <div style={{
                    fontSize: '12px',
                    color: '#94a3b8'
                  }}>
                    {person.role}
                  </div>
                </div>

                {person.status === 'request' && (
                  <button
                    onClick={() => handleFriendAction(person.id, 'friend')}
                  >
                    Confirm Request
                  </button>
                )}

                {person.status === 'none' && (
                  <button
                    onClick={() => handleFriendAction(person.id, 'friend')}
                  >
                    + Add Friend
                  </button>
                )}

                {person.status === 'friend' && (
                  <span style={{ color: '#4ade80' }}>
                    ✔ Friends
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MESSAGES TAB */}
      {activeTab === 'messages' && (
        <div style={{ padding: '20px', textAlign: 'left' }}>
          <h3 style={{ color: '#ec4899' }}>
            💬 Direct Messages (Priya Sharma)
          </h3>

          <div style={{
            backgroundColor: '#020617',
            padding: '14px',
            borderRadius: '12px',
            height: '220px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginBottom: '12px'
          }}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  alignSelf:
                    message.sender === 'You'
                      ? 'flex-end'
                      : 'flex-start',
                  backgroundColor:
                    message.sender === 'You'
                      ? '#be185d'
                      : '#1e293b',
                  padding: '8px 14px',
                  borderRadius: '14px',
                  fontSize: '13px',
                  maxWidth: '75%'
                }}
              >
                {message.text}
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSendDm}
            style={{ display: 'flex', gap: '8px' }}
          >
            <input
              type="text"
              value={msgInput}
              onChange={e => setMsgInput(e.target.value)}
              placeholder="Send a direct message..."
              style={{
                flex: 1,
                minWidth: 0,
                padding: '10px 14px',
                borderRadius: '20px',
                border: '1px solid #334155',
                backgroundColor: '#020617',
                color: '#fff'
              }}
            />

            <button type="submit">
              Send
            </button>
          </form>
        </div>
      )}

      {/* NOTIFICATIONS TAB */}
      {activeTab === 'notifications' && (
        <div style={{ padding: '20px', textAlign: 'left' }}>
          <h3 style={{ color: '#facc15' }}>
            🔔 Recent Activity
          </h3>

          {notifications.map((note, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#020617',
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid #1e293b',
                marginBottom: '8px',
                fontSize: '13px'
              }}
            >
              {note}
            </div>
          ))}
        </div>
      )}

      {/* PROFILE TAB */}
      {activeTab === 'profile' && (
        <div style={{ padding: '22px', textAlign: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: '3px solid #ec4899',
            backgroundColor: '#1e293b',
            margin: '0 auto 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '38px'
          }}>
            🧑🏻‍💻
          </div>

          <h3>Meet Patel (@crazydev1990)</h3>

          <p style={{
            fontSize: '12px',
            color: '#94a3b8'
          }}>
            ReactJS Developer • Ahmedabad • {posts.length} Posts • 540 Followers
          </p>

          <h4 style={{
            textAlign: 'left',
            color: '#facc15'
          }}>
            🔖 Saved Bookmarks ({posts.filter(post => post.saved).length})
          </h4>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            textAlign: 'left'
          }}>
            {posts.filter(post => post.saved).length === 0 ? (
              <div style={{
                gridColumn: 'span 2',
                color: '#64748b',
                fontSize: '12px',
                padding: '15px',
                backgroundColor: '#020617',
                borderRadius: '10px'
              }}>
                No saved posts yet. Click Save on any feed post.
              </div>
            ) : (
              posts
                .filter(post => post.saved)
                .map(post => (
                  <div
                    key={post.id}
                    style={{
                      backgroundColor: '#020617',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid #334155',
                      fontSize: '12px'
                    }}
                  >
                    <strong style={{
                      color: '#38bdf8',
                      display: 'block',
                      marginBottom: '4px'
                    }}>
                      {post.user}
                    </strong>

                    {post.caption.slice(0, 70)}
                    {post.caption.length > 70 ? '...' : ''}
                  </div>
                ))
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default SocialApp
