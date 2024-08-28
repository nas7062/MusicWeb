// src/components/Sidebar.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const SidebarItem = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 18px;
  position: relative;
  top: 50px;
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  text-align: left;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2112;
  }
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

interface SidebarProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleSearchClick = () => {
    onSearch(query);
  };

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
      <SidebarItem to="/">Home</SidebarItem>
      <SidebarItem to="/recent">최근 재생 목록</SidebarItem>
      
    </SidebarContainer>
  );
};

export default Sidebar;
