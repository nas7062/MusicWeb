// src/components/TrackItem.tsx
import React from 'react';
import styled from 'styled-components';
import { useRecentlyPlayed } from './RecentlyPlayedContext';
import { useNavigate } from 'react-router-dom';
import { Track } from '../types/type';

interface TrackItemProps {
  track: Track;
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
 
  const imageUrl = track.album.images[0]?.url; // 트랙의 이미지 받아옴
  const previewUrl = track.preview_url; //미리듣기 받아옴
  const { addTrackToRecentlyPlayed } = useRecentlyPlayed(); //최근 재생목록 추가하는 함수
  const navigate = useNavigate();
  const handlePlay = () => {
    if (track) {
      addTrackToRecentlyPlayed(track);  // 트랙이 재생될 때 최근 재생목록에 추가하는 함수
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
