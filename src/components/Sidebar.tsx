// src/components/Sidebar.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useRecentlyPlayed } from './RecentlyPlayedContext';

const SidebarContainer = styled.div`
  width: 200px;
  height: 100vh;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.1);
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  left: 0;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  position: absolute;
  left: 0;
`;

const Input = styled.input`
  width: 50%;
  position:relative;
  top:80px;
  max-width: 500px;
  padding: 10px;
  margin-left: -20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background-color: #1db954; /* Spotify Green */
  color: white;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 5px;
  position:relative;
  top:80px;
  &:hover {
    background-color: #1aa34a;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SidebarLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 18px;
  position: relative;
  top: 50px;
  margin-top: 10px;
  padding: 10px;
  display: block;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  cursor:pointer;
  &:hover {
    background-color: #2112;
  }
`;

const RecentlyPlayedDropdown = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 50px;
  margin-left: 10px;
`;

const RecentlyPlayedItem = styled.li`
  padding: 5px;
  font-size: 16px;
  color: #333;
  display:flex;
  cursor:pointer;
  &:hover {
    text-decoration: underline;
  }
  img {
    width:50px;
    height:50px;
    position:relative;;
    left:-20px;
  }

`;

const Sidebar: React.FC<{ onSearch: (query: string) => void; loading: boolean }> = ({ onSearch, loading }) => {
  const { recentlyPlayed } = useRecentlyPlayed();
  const [query, setQuery] = useState('');
  const [isRecentOpen, setIsRecentOpen] = useState(false);
  const navigate =useNavigate();
  const handleSearchClick = () => {
    onSearch(query);
  };

  const toggleRecentOpen = () => {
    setIsRecentOpen(!isRecentOpen);
  };
  const handleTrackClick = (trackId: string) => {
    navigate(`/detail/${trackId}`); // Navigate to the track detail page
  };
  console.log(recentlyPlayed);
  return (
    <SidebarContainer>
      <h1><Link to={"/"}>10012</Link></h1>
      <InputWrapper>
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter artist name"
        />
        <Button onClick={handleSearchClick} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </InputWrapper>
      <SidebarLink to="/">Home</SidebarLink>
      <SidebarLink as="div" onClick={toggleRecentOpen} to={undefined as any}>최근 재생 목록</SidebarLink>
      {isRecentOpen && (
        <RecentlyPlayedDropdown>
          {recentlyPlayed.length > 0 ? (
            recentlyPlayed.map((track) => (
              <RecentlyPlayedItem key={track.id} onClick={()=>handleTrackClick(track.id)}>
                <img src={track.album.images[0]?.url} alt="" />
                {track.name} - {track.artists.map((artist: any) => artist.name).join(', ')}
              </RecentlyPlayedItem>
            ))
          ) : (
            <RecentlyPlayedItem>최근 재생된 트랙이 없습니다.</RecentlyPlayedItem>
          )}
        </RecentlyPlayedDropdown>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
