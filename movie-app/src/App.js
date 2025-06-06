// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { MovieProvider } from './context/MovieContext'; 

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';


//Import ToastContainer and its CSS:
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Routes
import AppRoutes from './Routes';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <MovieProvider> 
            <div className="d-flex flex-column min-vh-100">
              <Header />
              <main className="flex-grow-1">
                <AppRoutes />
                <ToastContainer />
              </main>
              <Footer />
            </div>
          </MovieProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
