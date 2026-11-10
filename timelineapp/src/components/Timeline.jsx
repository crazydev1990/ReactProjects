
import React, { useState, useEffect } from 'react';

const Timeline = () => {

  // 1. States
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [postContent, setPostContent] = useState('');

  // 2. Load API Data + LocalStorage
  useEffect(() => {

    const savedPosts = localStorage.getItem('timelinePosts');

    // Check LocalStorage
    if (savedPosts) {

      try {
        setPosts(JSON.parse(savedPosts));
        setLoading(false);
        return;
      } catch (err) {
        console.error('LocalStorage Error:', err);
        localStorage.removeItem('timelinePosts');
      }

    }

    // Fetch API if LocalStorage is empty
    fetch('https://dummyjson.com/users')
      .then((res) => {
        if (!res.ok) {
          throw new Error('API Error');
        }
        return res.json();
      })

      .then((data) => {

        const timelineData = data.users.map((user) => ({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          avatar: user.image,
          title: user.company?.title || 'Professional Member',

          content: `Hello connection! I am happy to share that I am currently working as a ${user.company?.title || 'Developer'}. Looking forward to connecting with you all!`,

          likes: Math.floor(Math.random() * 50)
        }));

        setPosts(timelineData);
        setLoading(false);

      })

      .catch((err) => {

        console.error('API Error:', err);
        setError('Unable to load posts.');
        setLoading(false);

      });

  }, []);

  // 3. Save Posts in LocalStorage
  useEffect(() => {

    if (!loading) {
      localStorage.setItem(
        'timelinePosts',
        JSON.stringify(posts)
      );
    }

  }, [posts, loading]);

  // 4. Create New Post
  const handleCreatePost = (e) => {

    e.preventDefault();

    if (postContent.trim() === '') return;

    const newPost = {
      id: Date.now(),
      name: 'Yashpal Modi (You)',
      avatar: 'https://dummyjson.com/icon/abc/128',
      title: 'React Developer Intern',
      content: postContent,
      likes: 0
    };

    setPosts((prevPosts) => [
      newPost,
      ...prevPosts
    ]);

    setPostContent('');

  };

  // 5. Like Post
  const handleLike = (idToLike) => {

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === idToLike
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );

  };

  // 6. Delete Post
  const handleDelete = (idToDelete) => {

    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== idToDelete)
    );

  };

  // 7. JSX
  return (

    <div style={{
      backgroundColor: '#f3f2ef',
      minHeight: '100vh',
      fontFamily: 'Arial',
      padding: '20px'
    }}>

      <div style={{
        maxWidth: '500px',
        margin: '0 auto'
      }}>

        <h3 style={{
          color: '#0a66c2',
          textAlign: 'center'
        }}>
          Simple LinkedIn Timeline
        </h3>

        {/* Create Post Form */}

        <div style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '15px',
          border: '1px solid #e0e0e0',
          marginBottom: '20px'
        }}>

          <form
            onSubmit={handleCreatePost}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >

            <textarea
              placeholder="Write A New Post..."
              rows="2"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              style={{
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                resize: 'none'
              }}
            />

            <button
              type="submit"
              style={{
                alignSelf: 'flex-end',
                backgroundColor: '#0a66c2',
                color: 'white',
                padding: '6px 15px',
                border: 'none',
                borderRadius: '15px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Post
            </button>

          </form>

        </div>

        {/* Loading */}

        {loading ? (

          <p style={{ textAlign: 'center' }}>
            🔄 Posts Loading...
          </p>

        ) : error ? (

          <p style={{
            textAlign: 'center',
            color: 'red'
          }}>
            {error}
          </p>

        ) : (

          /* Display Posts */

          posts.map((post) => (

            <div
              key={post.id}
              style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                padding: '15px',
                border: '1px solid #e0e0e0',
                marginBottom: '15px'
              }}
            >

              {/* Profile Header */}

              <div style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                marginBottom: '10px'
              }}>

                <img
                  src={post.avatar}
                  alt={post.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      'https://dummyjson.com/icon/abc/128';
                  }}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />

                <div>

                  <h4 style={{
                    margin: '0',
                    color: '#212121',
                    fontSize: '14px'
                  }}>
                    {post.name}
                  </h4>

                  <p style={{
                    margin: '0',
                    color: '#666',
                    fontSize: '12px'
                  }}>
                    {post.title}
                  </p>

                </div>

              </div>

              {/* Post Content */}

              <div style={{
                fontSize: '14px',
                color: '#191919',
                marginBottom: '10px'
              }}>
                {post.content}
              </div>

              {/* Like Status */}

              <div style={{
                fontSize: '12px',
                color: '#666',
                paddingBottom: '5px',
                borderBottom: '1px solid #f3f2ef'
              }}>
                👍 {post.likes} Likes
              </div>

              {/* Buttons */}

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '8px'
              }}>

                <button
                  onClick={() => handleLike(post.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#0a66c2',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  👍 Like
                </button>

                <button
                  onClick={() => handleDelete(post.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'red',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  🗑 Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );

};

export default Timeline;
