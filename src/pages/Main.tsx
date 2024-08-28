// src/App.tsx
import React, { useState, useEffect } from 'react';
import { fetchPlaylist } from '../api/api';
import TrackList from '../components/TrackList';
import styled from 'styled-components';
import Search from '../components/Search';
import Sidebar from '../components/Sidebar';

// Styled Components
const AppContainer = styled.div`
  padding: 20px;
  width: 1500px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  h1 {
    margin: 10px 10px;
  }
`;
interface MainProps {
    onSearch: (query: string) => void;
    loading: boolean;
    searchResults: any[]; // 검색 결과를 저장하는 배열
  }
  
const Main: React.FC<MainProps> = ({onSearch,loading,searchResults}) => {
  const [tracks, setTracks] = useState<any[]>([]);
 
  useEffect(() => {
    const getPlaylist = async () => {
      const playlistId = "37i9dQZF1DXcBWIGoYBM5M"; // Spotify의 Top 50 Global Playlist ID
      const playlistData = await fetchPlaylist(playlistId);
      if (playlistData) {
        setTracks(playlistData.tracks.items);
      }
    };
    
    getPlaylist();
  }, []);

  return (
    <AppContainer>
      <Sidebar onSearch={onSearch} loading={loading}/>
      <Search tracks={searchResults}/>
      <TrackList tracks={tracks} />
    
    </AppContainer> 
  );
};

export default Main;
