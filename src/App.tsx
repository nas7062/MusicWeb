// src/App.tsx
import React, { useState } from 'react';
import Main from './pages/Main';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { SearchTrack ,searchTracksByArtist } from './api/api';

 
const App: React.FC = () => {
  const [tracks, setTracks] = useState<SearchTrack[]>([]);
  const [loading, setLoading] = useState(false);
  const handleSearch = async (query:string) => {
    if (query.trim() === '') return;
    setLoading(true);
    try {
      const results = await searchTracksByArtist(query);
      setTracks(results);
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/"  element={<Main  onSearch ={handleSearch} loading ={loading}  searchResults ={tracks}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
