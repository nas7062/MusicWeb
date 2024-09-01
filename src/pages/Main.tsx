import React from 'react';
import TrackList from '../components/TrackList';
import Search from '../components/Search';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';
import { SearchTrack, Track } from '../types/type';

const AppContainer = styled.div`
  padding: 20px;
  width: 1500px;
  margin: 0 auto;
  
  h1 {
    margin: 10px 10px;
  }
`;

interface MainProps {
  onSearch: (query: string) => void;
  loading: boolean;
  searchResults: SearchTrack[];
  playlistTracks: Track[];
}

const Main: React.FC<MainProps> = ({ onSearch, loading, searchResults, playlistTracks }) => {
  return (
    <AppContainer>
      <Sidebar onSearch={onSearch} loading={loading} />
      <Search tracks={searchResults} />
      <TrackList tracks={playlistTracks} />
    </AppContainer>
  );
};

export default Main;
