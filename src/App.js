// App.js
import React, { useEffect, useState } from 'react';
import ResolutionForm from './components/ResolutionForm';
import Login from './components/Login';
import './App.css';
import logo from './utils/logo/logo.png';
import { Switch } from 'antd';



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleThemeChange = (checked) => {
    setIsDarkMode(checked);
    document.body.classList.toggle('light-mode', !checked);
};
  useEffect(() => {
    document.title = "Juzgado PCyF Nº 23 - Creador de resoluciones";
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className='general'>
      {isLoggedIn ? (
        <>
          <div className="header-container">
            <img src={logo} alt='Juzgado PCyF Nº 23' className="header-logo" />
            <h1 className="app-header">Juzgado PCyF Nº 23</h1>
          </div>
          <div className="switch-container">
                <Switch
                    checked={isDarkMode}
                    onChange={handleThemeChange}
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                />
            </div>
          <h2 className="description">Elija el tipo de resolución</h2>
          <ResolutionForm />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
