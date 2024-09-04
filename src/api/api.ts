import axios from 'axios';
import { SearchTrack, SpotifyPlaylistTrack, Track  ,SpotifyArtist,SpotifyImage,SpotifyTrack} from '../types/type';


const SPOTIFY_BASE_URL = "https://api.spotify.com/v1"; // Spotify API의 기본 URL 설정
export const ACCESS_TOKEN = "BQBUYEm7hjdUyB116kkorwBwME8E609B3dNpcp-jpy0MiYB1J8hgmZlCdwqZmpHFYU46invsFf0tpCoVuHJg7B11FsvIerIHP48XEBDEJWCuTaUH_6x6e6wJ167U_o_EahKAYrK-tOasYqi6QpJO7F1AowUvllKazMPLQhwn_ceDJorE7zP8fQhBZD_Pg8Z2fZx1oKiwhh6HSIELzec31WC2C0ST1MP6G9HT";
// Spotify API에 접근하기 위한 액세스 토큰 

// 플레이리스트의 트랙 목록을 가져오는 함수
export const fetchPlaylist = async (playlistId: string): Promise<Track[] | null> => {
  try {
    // Spotify API에 요청을 보내 플레이리스트 데이터를 가져옴
    const response = await axios.get(`${SPOTIFY_BASE_URL}/playlists/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}` // 인증 헤더에 액세스 토큰 추가
      }
    });
    // API 응답의 구조를 확인한 후, 데이터를 Track 타입으로 변환
    const tracks: Track[] = response.data.tracks.items
      .map((item: SpotifyPlaylistTrack) => ({
        id: item.track.id,
        name: item.track.name,
        album: {
          images: item.track.album.images.map((image: SpotifyImage) => ({ url: image.url })),
          name: item.track.album.name
        },
        artists: item.track.artists.map((artist: SpotifyArtist) => ({
          name: artist.name
        })),
        preview_url: item.track.preview_url
      }))
      .filter((track:Track) => track.preview_url !== null); // 미리듣기 URL이 있는 것만 필터링

    return tracks; // 트랙목록 반환
  } catch (error) {
    return null;
  }
};
export const searchTracksByArtist = async (artistName: string): Promise<SearchTrack[]> => {
    try {
      const response = await axios.get(`${SPOTIFY_BASE_URL}/search`, {
        params: {
          q: `artist:${artistName}`, // 아티스트 이름으로 검색쿼리 설정
          type: 'track', // 검색 타입을 트랙으로 설정함
          limit: 21
        },
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`
        }
      });
  
      return response.data.tracks.items.map((track: SpotifyTrack) => ({
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
                type: 'artist', // 검색 타입을 아티스트로 설정
                limit: 1,
            },
        });

        const artist = response.data.artists.items[0];
        return artist?.images[0]?.url || null; // 아티스트의 첫 번째 이미지 URL 반환, 없으면 null 반환
    } catch (error) {
        return null;
    }
};
