import React from 'react';
import styled from 'styled-components';
import { useRecentlyPlayed } from './RecentlyPlayedContext';
import { useNavigate } from 'react-router-dom';

interface SearchItemProps {
  track: {
    id: string;
    name: string;
    preview_url: string | null;
    album: {
      images: { url: string }[];
    };
    artists: { name: string }[];
  };
}

// Styled Components
const SearchItemContainer = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer; /* 클릭할 수 있는 표시 */
  width:350px;
  border-top:1px solid grey;
  margin-right:20px;
  border-bottom:1px solid grey;
`;
const ItemContainer = styled.div`
    display:inline-block;
    
`

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
  color: #1db954; /* Spotify Green */
`;

const TrackArtists = styled.p`
  margin: 5px 0;
  color: #666;
`;

const AudioPlayer = styled.audio`
  margin-top: 10px;
  width: 80%;
`;

const SearchItem: React.FC<SearchItemProps> = ({ track }) => {
  const imageUrl = track.album.images[0]?.url;
  const previewUrl = track.preview_url || '';
  const { addTrackToRecentlyPlayed } = useRecentlyPlayed(); //최근 재생목록 추가
  const navigate = useNavigate();
  const handlePlay = () => {
    addTrackToRecentlyPlayed(track);
  };
  const DetailNav = () =>{
    navigate(`/detail/${track.id}`);
  }
  return (
    <ItemContainer>
      <SearchItemContainer onClick={DetailNav}>
        {imageUrl && <TrackImage src={imageUrl} alt={track.name} />}
        <TrackInfo>
          <TrackName>{track.name}</TrackName>
          <TrackArtists>{track.artists.map(artist => artist.name).join(', ')}</TrackArtists>
          {previewUrl && (
            <AudioPlayer controls onPlay={handlePlay}>
              <source src={previewUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </AudioPlayer>
          )}
        </TrackInfo>
      </SearchItemContainer>
    </ItemContainer>
  );
};

export default SearchItem;
