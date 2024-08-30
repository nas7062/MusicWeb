// src/components/TrackItem.tsx
import React from 'react';
import styled from 'styled-components';
import { useRecentlyPlayed } from './RecentlyPlayedContext';
import { useNavigate } from 'react-router-dom';

interface TrackItemProps {
  track: any;
}

// Styled Components
const TrackItemContainer = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  justify-content: center;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  margin-right: 20px;
  width: 300px;
`;

const ItemContainer = styled.div`
  display: inline-block;
`;

const TrackImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 20px;
  border-radius: 4px;
`;

const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
`;

const TrackName = styled.h3`
  margin: 0;
  font-size: 0.8em;
  color: #1db954;
`;

const TrackArtists = styled.p`
  margin: 5px 0;
  color: #666;
`;

const AudioPlayer = styled.audio`
  margin-top: 10px;
  width: 100%;
`;

const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
 
  const imageUrl = track.album.images[0]?.url;
  const previewUrl = track.preview_url;
  const { addTrackToRecentlyPlayed } = useRecentlyPlayed();
  const navigate = useNavigate();
  const handlePlay = () => {
    if (track) {
      addTrackToRecentlyPlayed(track);
    }
  };
  const DetailNav = () =>{
    navigate(`/detail/${track.id}`);
  }
  return (
    <ItemContainer>
      <TrackItemContainer onClick={DetailNav}>
        {imageUrl && <TrackImage src={imageUrl} alt={track.name} />}
        <TrackInfo>
          <TrackName>{track.name}</TrackName>
          <TrackArtists>{track.artists.map((artist: any) => artist.name).join(', ')}</TrackArtists>
          {previewUrl && (
            <AudioPlayer controls onPlay={handlePlay}>
              <source src={previewUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </AudioPlayer>
          )}
        </TrackInfo>
      </TrackItemContainer>
    </ItemContainer>
  );
};

export default TrackItem;
