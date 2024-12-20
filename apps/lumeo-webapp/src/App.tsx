import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Camera, Heart } from 'lucide-react';
import { HomePage } from './pages/HomePage';
import { ImagePage } from './pages/ImagePage';
import { FavoritesPage } from './pages/FavoritesPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <Link to="/" className="flex items-center space-x-2">
                  <Camera className="w-8 h-8 text-purple-on-light" />
                  <span className="text-xl font-semibold">Lumeo</span>
                </Link>
                <Link
                  to="/favorites"
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
                >
                  <Heart className="w-6 h-6" />
                  <span>Favorites</span>
                </Link>
              </div>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/image/:id" element={<ImagePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
