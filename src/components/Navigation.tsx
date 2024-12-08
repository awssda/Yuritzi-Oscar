import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { Heart, Book, Camera, LogOut } from 'lucide-react';

export default function Navigation() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link
              to="/home"
              className="flex items-center px-3 py-2 text-pink-600 hover:text-pink-700"
            >
              <Camera className="h-5 w-5 mr-1" />
              <span>Recuerdos</span>
            </Link>
            <Link
              to="/poems"
              className="flex items-center px-3 py-2 text-pink-600 hover:text-pink-700"
            >
              <Heart className="h-5 w-5 mr-1" />
              <span>Poemas</span>
            </Link>
            <Link
              to="/diary"
              className="flex items-center px-3 py-2 text-pink-600 hover:text-pink-700"
            >
              <Book className="h-5 w-5 mr-1" />
              <span>Diario</span>
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-700"
          >
            <LogOut className="h-5 w-5 mr-1" />
            <span>Salir</span>
          </button>
        </div>
      </div>
    </nav>
  );
}