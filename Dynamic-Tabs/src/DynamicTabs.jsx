import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link , useNavigate } from "react-router-dom";
import FoodPage from "./components/FoodPage";
import EcommercePage from "./components/EcommercePage";
import TechnologyPage from "./components/TechnologyPage";
import TravelPage from "./components/TravelPage";
import SportsPage from "./components/SportsPage";
import HealthPage from "./components/HealthPage";
import EducationPage from "./components/EducationPage";
import FinancePage from "./components/FinancePage";
import MoviesPage from "./components/MoviesPage";
import MusicPage from "./components/MusicPage";


const DynamicTabs = () => {
    const navigate = useNavigate(); // For navigation
  const initialTabs = [
    { id: 1, title: "Food", path: "/", component: <FoodPage /> }
  ];

  const [tabs, setTabs] = useState(initialTabs);
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const allPages = [
    { title: "Ecommerce", path: "/ecommerce", component: <EcommercePage /> },
    { title: "Technology", path: "/technology", component: <TechnologyPage /> },
    { title: "Travel", path: "/travel", component: <TravelPage /> },
    { title: "Sports", path: "/sports", component: <SportsPage /> },
    { title: "Health", path: "/health", component: <HealthPage /> },
    { title: "Education", path: "/education", component: <EducationPage /> },
    { title: "Finance", path: "/finance", component: <FinancePage /> },
    { title: "Movies", path: "/movies", component: <MoviesPage /> },
    { title: "Music", path: "/music", component: <MusicPage /> }
  ];

  const addTab = () => {
    if (tabs.length < allPages.length + 1) {
      const nextPage = allPages.find(page => !tabs.some(tab => tab.title === page.title));
      if (nextPage) {
        const newTab = {
          id: tabs.length + 1,
          title: nextPage.title,
          path: nextPage.path,
          component: nextPage.component
        };
        setTabs([...tabs, newTab]);
        setActiveTab(newTab.id);
        navigate(newTab.path); // Navigate to the new tab
      }
    }
  };

  const removeTab = (id) => {
    if (tabs.length > 1) {
      const newTabs = tabs.filter(tab => tab.id !== id);
      setTabs(newTabs);
      if (activeTab === id) {
        setActiveTab(newTabs[0].id);
        navigate(newTabs[0].path);
      }
    }
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        {tabs.map((tab) => (
          <div key={tab.id} className={`tab ${activeTab === tab.id ? "active" : ""}`}>
            <Link to={tab.path} onClick={() => setActiveTab(tab.id)}>
              {tab.title}
            </Link>
            {tabs.length > 1 && <button className="remove-btn" onClick={() => removeTab(tab.id)}>✖</button>}
          </div>
        ))}
        {tabs.length < 10 && <button className="add-btn" onClick={addTab}>+</button>}
      </div>
      <div className="content">
        <Routes>
          {tabs.map((tab) => (
            <Route key={tab.id} path={tab.path} element={tab.component} />
          ))}
        </Routes>
      </div>
    </div>
  );
  };
  
  export default DynamicTabs;