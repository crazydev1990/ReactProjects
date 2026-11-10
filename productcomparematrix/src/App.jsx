import React, { useState } from "react";
import ProductCompareMatrix from "./components/ProductCompareMatrix";
import PaintApp from "./components/PaintApp";
import SelfieApp from "./components/SelfieApp";
import KanbanBoard from "./components/KanbanBoard";
import FlightSimulator from "./components/FlightSimulator"; // ✈️ Import the new flight component
import "./App.css";

function App() {
  // 🧭 Tabs Routing State Manager ("product", "paint", "selfie", "kanban", "flight")
  const [activeTab, setActiveTab] = useState("product");

  return (
    <div className="app-container">
      <div className="app-tabs" style={{ display: 'flex', gap: '8px', marginBottom: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className={`app-tab ${activeTab === "product" ? "active" : ""}`} onClick={() => setActiveTab("product")}>Product Comparison</button>
        <button className={`app-tab ${activeTab === "paint" ? "active" : ""}`} onClick={() => setActiveTab("paint")}>Paint App 🎨</button>
        <button className={`app-tab ${activeTab === "selfie" ? "active" : ""}`} onClick={() => setActiveTab("selfie")}>Selfie Studio 📸</button>
        <button className={`app-tab ${activeTab === "kanban" ? "active" : ""}`} onClick={() => setActiveTab("kanban")}>Jira Kanban 📋</button>
        
        {/* ✈️ 5th Tab Navigation Button Added */}
        <button
          className={`app-tab ${activeTab === "flight" ? "active" : ""}`}
          onClick={() => setActiveTab("flight")}
        >
          Flight Sim ✈️
        </button>
      </div>

      <div className="app-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {activeTab === "product" && <ProductCompareMatrix />}
        {activeTab === "paint" && <PaintApp />}
        {activeTab === "selfie" && <SelfieApp />}
        {activeTab === "kanban" && <KanbanBoard />}
        
        {/* ✈️ Render Flight Simulator when Tab matches */}
        {activeTab === "flight" && <FlightSimulator />}
      </div>
    </div>
  );
}

export default App;