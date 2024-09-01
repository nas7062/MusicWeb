import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { ACCESS_TOKEN } from '../api/api';
import { useRecentlyPlayed } from '../components/RecentlyPlayedContext';
import { Track } from '../types/type';

// Styled Components
const Container = styled.div`
  display: flex;
  margin: 20px auto;
  width: 1400px;
  position:relative;
  left:30%;
`;

const TrackDetailSection = styled.div`
  flex: 1;
  padding: 20px;
  margin-right: 20px;
`;

const RecentlyPlayedSection = styled.div`
  flex: 0.3;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const Image = styled.img`
  width: 400px;
  height: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  position:relative;
  left:30%;
`;

const Artists = styled.p`
  font-size: 1.2em;
  color: #666;
  margin-bottom: 20px;
  font-weight: 800;
  text-align:center;
`;

const AudioPlayer = styled.audio`
  width: 100%;
  margin-top: 20px;
  border: none;
  outline: none;
`;

const Loading = styled.div`
  font-size: 1.5em;
  color: #1db954; 
  text-align: center;
  margin-top: 50px;
  position:absolute;
  left:45%;
`;

const Error = styled.div`
  font-size: 1.5em;
  color: #e74c3c; 
  text-align: center;
  margin-top: 50px;
`;

const RecentlyPlayedTitle = styled.h2`
  font-size: 1.5em;
  color: #333;
  margin-bottom: 10px;
`;

const RecentlyPlayedList = styled.ul`
  list-style: none;
  padding: 0;
`;

const RecentlyPlayedItem = styled.li`
  padding: 10px;
  font-size: 16px;
  color: #333;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
`;

const TrackDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // track Id 가져옴
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);
  const { recentlyPlayed } = useRecentlyPlayed(); // 최근 재생목록 가져옴
  const navigate = useNavigate();
  const handleTrackClick = (trackId: string) => {
    navigate(`/detail/${trackId}`); // 상세페이지 이동
  };
  useEffect(() => {
    const fetchTrack = async () => {
      try {  // Spotify API를 통해 트랙 정보 가져옴
        const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        setTrack(response.data); // 트랙정보 저장
      } catch (error) {
        console.error("Error fetching track:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrack();
  }, [id]); // id값 변경시 실행

  if (loading) return <Loading>Loading...</Loading>;
  if (!track) return <Error>Track not found</Error>;

  return (
    <Container>
      <TrackDetailSection>
        <h1><Link to="/">10012</Link></h1>
        <Title>{track.name}</Title>
        <Image src={track.album.images[0]?.url} alt={track.name} />
        <Artists>{track.artists.map((artist: any) => artist.name).join(', ')}</Artists>
        {track.preview_url ? (
          <AudioPlayer key={track.preview_url} controls>
            <source src={track.preview_url as string} type="audio/mpeg" />
            Your browser does not support the audio element.
          </AudioPlayer>
        ) : (
          <p>No preview available</p>
        )}
      </TrackDetailSection>
      <RecentlyPlayedSection>
        <RecentlyPlayedTitle>최근 재생 목록</RecentlyPlayedTitle>
        {recentlyPlayed.length > 0 ? (
          <RecentlyPlayedList>
            {recentlyPlayed.map((recentTrack) => (
              <RecentlyPlayedItem key={recentTrack.id} onClick={()=>handleTrackClick(recentTrack.id)}>
                <img src={recentTrack.album.images[0]?.url} alt={recentTrack.name} />
                {recentTrack.name} - {recentTrack.artists.map((artist: any) => artist.name).join(', ')}
              </RecentlyPlayedItem>
            ))}
          </RecentlyPlayedList>
        ) : (
          <RecentlyPlayedItem>최근 재생된 트랙이 없습니다.</RecentlyPlayedItem>
        )}
      </RecentlyPlayedSection>
    </Container>
  );
};

export default TrackDetail;
