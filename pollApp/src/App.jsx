import { useState } from "react";
import "./App.css";
import GetCurrentLoc from "./components/GetCurrenLoc";
import ElectionPoll from "./components/ElectionPoll";

function App() {
  const [activeTab, setActiveTab] = useState("election");

  return (
    <div className="app-container">

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "election" ? "active" : ""}
          onClick={() => setActiveTab("election")}
        >
          Election Poll
        </button>

        <button
          className={activeTab === "currentLoc" ? "active" : ""}
          onClick={() => setActiveTab("currentLoc")}
        >
          Live Location
        </button>

        
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "election" && <ElectionPoll />}

        {activeTab === "currentLoc" && <GetCurrentLoc />}

        
      </div>

    </div>
  );
}

export default App;