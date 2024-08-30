// src/App.tsx
import React, { useState } from 'react';
import Main from './pages/Main';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { SearchTrack ,searchTracksByArtist } from './api/api';
import Detail from './pages/Detail';
import { RecentlyPlayedProvider } from './components/RecentlyPlayedContext';

 
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
      <RecentlyPlayedProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/"  element={<Main  onSearch ={handleSearch} loading ={loading}  searchResults ={tracks}/>} />
        <Route path="/detail/:id"  element = {<Detail/>}  />
        </Routes>
      </BrowserRouter>
      </RecentlyPlayedProvider>
    </div>
  );
};

export default App;
