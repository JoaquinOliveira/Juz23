// App.js
import React, { useEffect } from 'react';
import ResolutionForm from './components/ResolutionForm';
import './App.css';
import logo from './utils/logo/logo.png'

const App = () => {
  useEffect(() => {
    document.title = "Juzgado PCyF Nº 23 - Creador de resoluciones";
  }, []);
  return (
    <div className='general'>
      <div className="header-container">
        <img src={logo} alt='Juzgado PCyF Nº 23' className="header-logo" />
        <h1 className="app-header">Juzgado PCyF Nº 23</h1>
      </div>
      <p className="description">Elija el tipo de resolución</p>
      <ResolutionForm />
    </div>
  );
};


export default App;
