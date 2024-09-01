import React, { useEffect, useState } from 'react';
import SearchItem from './SearchItem';
import styled from 'styled-components';
import { fetchArtistImage } from '../api/api';
import { SearchTrack } from '../types/type';

interface SearchProps {
  tracks: SearchTrack[];
}
const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 20px;
  position:relative;
  left:20%;
  font-family: Arial, sans-serif;
`;

const TrackList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NoTracksMessage = styled.p`
  text-align: center;
  color: #666;
`;
const ArtistImg = styled.img`

    width:300px;
    height:300px;
    display:inline;
    position:relative;
    left:35%;
    border-radius:50%;
`



const Search: React.FC<SearchProps> = ({tracks}) => {
    const [artistImage, setArtistImage] = useState<string | null>(null);
    const firstTrack = tracks[0];
    const artistName = firstTrack?.artists[0]?.name;
  
    useEffect(() => {
      if (artistName) {
        fetchArtistImage(artistName).then((image) => setArtistImage(image));
      }
    }, [artistName]); // 아티스트 이름이 변경될 때마다 아티스트 이미지를 가져옴

  return (
    <>
    <Container>
      <div>
        <div>
      {artistImage && <ArtistImg src={artistImage} alt={`${artistName} image`} />}
        <h2>{artistName}</h2>
        </div>
        {tracks.length > 0 ? (
          <TrackList>
            {tracks.map((track) => (
              <SearchItem
                key={track.id}
                track={track}
              />
            ))}
          </TrackList>
        ) : (
          <NoTracksMessage>...</NoTracksMessage>
        )}
      </div>
    </Container>
    </>
  );
};

export default Search;
