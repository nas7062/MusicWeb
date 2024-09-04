export interface Track {
    id: string;
    name: string;
    album: {
      images: { url: string }[]; // Correct type
      name: string; // Ensure this matches with API response
    };
    artists: { name: string }[]; // Ensure this matches with API response
    preview_url: string | null;
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
    }[];
}
export interface SpotifyTrack {
  id: string;
  name: string;
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  preview_url: string | null;
}

export interface SpotifyPlaylistTrack {
  track: SpotifyTrack;
}
export interface SpotifyImage {
  url: string;
}

export interface SpotifyArtist {
  id: string;
  name: string;
}
export interface SpotifyAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
}