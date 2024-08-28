/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SPOTIFY_CLIENT_ID: string;
    readonly VITE_SPOTIFY_CLIENT_SECRET: string;
    readonly VITE_SPOTIFY_REDIRECT_URI: string;
    // 다른 환경 변수가 있다면 여기에 추가
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  