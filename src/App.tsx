import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import Login from './components/Login';
import Diary from './components/Diary';
import Poems from './components/Poems';
import Memories from './components/Memories';
import Navigation from './components/Navigation';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  return auth.currentUser ? <>{children}</> : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <div>
                <Navigation />
                <Memories />
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/diary"
          element={
            <PrivateRoute>
              <div>
                <Navigation />
                <Diary />
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/poems"
          element={
            <PrivateRoute>
              <div>
                <Navigation />
                <Poems />
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;