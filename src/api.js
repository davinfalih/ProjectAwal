// src/App.js
import React from 'react';
import ProductList from './components/ProductList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Toko Online Saya</h1>
      </header>
      
      {/* ⭐⭐ Tampilkan komponen product list ⭐⭐ */}
      <ProductList />
    </div>
  );
}

export default App;