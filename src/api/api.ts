import axios from 'axios';

// API 기본 URL 및 액세스 토큰은 환경 변수로 관리하는 것이 좋습니다.
// process.env.REACT_APP_SPOTIFY_BASE_URL와 process.env.REACT_APP_ACCESS_TOKEN을 사용하는 것을 권장합니다.
const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";
export const ACCESS_TOKEN = "BQAI8XJKlhF5K3Mf-06xjICrMj0YyWdPjcXu-YBnYhkQdZSBYgd8pK-NBQC2uAGJqj2dO6qZOloRegkWyGqXmvj_qlGVb-qSnIlBWYlCTS9If3Aic8sK5BIvgoLUr_4Myrc9qBwwX9D8PqQ-2lcD3UxaJggkVDCnKv0QC920p5kD7tUaLZ5GljUrezjnfgDUpjwHP0A59F3UTsqf3K-CfYVVVEe9klHQOgkv";

interface Track {
    track: {
      preview_url: string | null;
      id: string;
      name: string;
      album: {
        images: { url: string }[];
      };
      artists: { name: string }[];
    };
  }
  
  // Define the interface for the API response
  interface PlaylistResponse {
    tracks: {
      items: Track[];
      next: string | null; // URL for the next page of results
    };
  }
  export interface SearchTrack {
    id: string;
    name: string;
    preview_url: string | null;
    album: {
        images: { url: string }[];
    };
    artists: {
        name: string;
        external_urls: {
            spotify: string;
        };
        uri:string;
    }[];
}

  
  
export const fetchPlaylist = async (playlistId: string): Promise<PlaylistResponse | null> => {
  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}/playlists/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });

    const tracks = response.data.tracks.items;
    const tracksWithPreview = tracks.filter((track: Track) => track.track.preview_url);

    return {
      ...response.data,
      tracks: {
        ...response.data.tracks,
        items: tracksWithPreview
      }
    };
  } catch (error) {
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
