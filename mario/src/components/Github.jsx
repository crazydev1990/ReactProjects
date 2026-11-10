import { useEffect, useState } from "react";

function Github() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch("https://api.github.com/users/crazydev1990");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    loadProfile();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "sans-serif" }}>
      {profile && (
        <>
          <h2>{profile.name || profile.login}</h2>
          <img src={profile.avatar_url} width={150} alt="avatar" style={{ borderRadius: "50%" }} />
          <p>{profile.bio || "No bio available"}</p>
        </>
      )}
    </div>
  );
}

export default Github;
