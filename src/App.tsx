import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Detail from './pages/Detail';
import { RecentlyPlayedProvider } from './components/RecentlyPlayedContext';
import { fetchPlaylist, searchTracksByArtist } from './api/api';
import {  SearchTrack, Track } from './types/type';
const App: React.FC = () => {
  const [tracks, setTracks] = useState<SearchTrack[]>([]);
  const [loading, setLoading] = useState(false);
  const [playlistTracks, setPlaylistTracks] = useState<Track[]>([]);

  const handleSearch = async (query: string) => {
    if (query.trim() === '') return;
    setLoading(true);
    try {
      const results = await searchTracksByArtist(query); // 검색 api 호출
      setTracks(results);
    } catch (error) {
      console.error('Error during search:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getPlaylist = async () => {
      const playlistId = '37i9dQZF1DXcBWIGoYBM5M'; 
      const playlistData = await fetchPlaylist(playlistId); //플레이리스트 api 호출
      console.log('Fetched playlist data:', playlistData);
      if (playlistData) {
        setPlaylistTracks(playlistData);  
      }
    };
    getPlaylist(); // 데이터 가져오기
  }, []);
  console.log(playlistTracks);
  return (
    <RecentlyPlayedProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                onSearch={handleSearch}
                loading={loading}
                searchResults={tracks}
                playlistTracks={playlistTracks}
              />
            }
          />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </RecentlyPlayedProvider>
  );
};

export default App;
