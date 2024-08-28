// src/components/TrackItem.tsx
import React from 'react';
import styled from 'styled-components';

interface TrackItemProps {
  track?: any;
  id? :string;
  key? : number;
  name? :string;
  preview_url? :string;
}

// Styled Components
const TrackItemContainer = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer; /* 클릭할 수 있는 표시 */
  justify-content: center;
  border-top:1px solid grey;
  border-bottom:1px solid grey;
  margin-right:20px;
  width:300px;
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
  width:300px;
  
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
  const imageUrl = track.album.images[0]?.url; // 앨범 이미지 URL 가져오기
  const previewUrl = track.preview_url; // 트랙의 미리 듣기 URL

  return (
    <ItemContainer>
    <TrackItemContainer >
      {imageUrl && <TrackImage src={imageUrl} alt={track.name} />}
      <TrackInfo>
        <TrackName>{track.name}</TrackName>
        <TrackArtists>{track.artists.map((artist: any) => artist.name).join(', ')}</TrackArtists>
        {previewUrl && (
          <AudioPlayer controls>
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
