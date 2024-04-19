// App.js
import React, { useEffect, useState } from 'react';
import ResolutionForm from './components/Form/ResolutionForm';
import Login from './components/Login/Login';
import './App.css';
import logo from './utils/logo/logo.png';
import { Switch } from 'antd';
import { FaSun, FaMoon } from 'react-icons/fa';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const saveThemeToLocalStorage = (isDarkMode) => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  };

  const handleThemeChange = (checked) => {
    setIsDarkMode(checked);
    saveThemeToLocalStorage(checked);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className={`general ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {isLoggedIn ? (
        <>
          <div className={`header-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <img src={logo} alt='Juzgado PCyF Nº 23' className="header-logo" />
            <h1 className={`app-header ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>Juzgado PCyF Nº 23</h1>
          </div>
          <div className="switch-container">
            <Switch
              checked={isDarkMode}
              onChange={handleThemeChange}
              checkedChildren={<FaMoon className="switch-icon" />}
              unCheckedChildren={<FaSun className="switch-icon" />}
              className="custom-switch"
            />
          </div>
          <h2 className={`description ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>Elija el tipo de resolución</h2>
          <ResolutionForm />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;