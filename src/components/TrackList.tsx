// src/components/TrackList.tsx
import React from 'react';
import TrackItem from './TrackItem';
import styled from 'styled-components';

const TrackListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 auto;
  h2 {
    text-align:center;
    position:relative;
    left:-10%;
  }
    position:relative;
    left:30%;
`;

interface TrackListProps {
  tracks: any[];
}

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {

    const showtracks = tracks.slice(0,16);
  return (
    <TrackListContainer>
    <h2>지금 인기있는 곡</h2>
      {showtracks.map((item, index) => (
        <TrackItem
          key={index}
          track={item.track}
        />
      ))}
    
    </TrackListContainer>
  );
};

export default TrackList;
