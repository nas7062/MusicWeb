import axios from 'axios';
import { SearchTrack, Track } from '../types/type';

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";
export const ACCESS_TOKEN = "BQD_iv2iheHxUc9X74G5rcO_fJMmydE_mCzAidQ9uqewI6y2OUah1yfCcLnrCdf6fK0Ux4EtXF4lk9klCQp9qJ7qLwVRJ4_ZsEieEqIdRd7VHvckEiyrgO3wBZFuAZYNz_mgf2bY-ehjOd89It176ZF7HysyHBnVBWqhaZH1t4b6N-n2oxbsN_5I5p8qdlNS8F1kgi_e14bSpkjeOYfB0HoIHfcjfLTBYQCJ";



export const fetchPlaylist = async (playlistId: string): Promise<Track[] | null> => {
  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}/playlists/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });
    // API 응답의 구조를 확인한 후, 데이터를 Track 타입으로 변환
    const tracks: Track[] = response.data.tracks.items
      .map((item: any) => ({
        id: item.track.id,
        name: item.track.name,
        album: {
          images: item.track.album.images.map((image: any) => ({ url: image.url })),
          name: item.track.album.name
        },
        artists: item.track.artists.map((artist: any) => ({
          name: artist.name
        })),
        preview_url: item.track.preview_url
      }))
      .filter(track => track.preview_url !== null); // 미리듣기 URL이 있는 것만 필터링

    return tracks;
  } catch (error) {
    console.error('Error fetching playlist:', error);
    return null;
  }
};
export const searchTracksByArtist = async (artistName: string): Promise<SearchTrack[]> => {
    try {
      const response = await axios.get(`${SPOTIFY_BASE_URL}/search`, {
        params: {
          q: `artist:${artistName}`,
          type: 'track',
          limit: 21
        },
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`
        }
      });
  
      return response.data.tracks.items.map((track: any) => ({
        id: track.id,
        name: track.name,
        preview_url: track.preview_url,
        album: {
          images: track.album.images
        },
        artists: track.artists
      }));
    } catch (error) {
      return [];
    }
  };
  // 검색된 아티스트의 이미지를 가져오는 함수
 export const fetchArtistImage = async (artistName: string): Promise<string | null> => {
    try {
        const response = await axios.get(`https://api.spotify.com/v1/search`, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            params: {
                q: artistName,
                type: 'artist',
                limit: 1,
            },
        });

        const artist = response.data.artists.items[0];
        return artist?.images[0]?.url || null;  // 아티스트 이미지 URL 반환
    } catch (error) {
        return null;
    }
};
