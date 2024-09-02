import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface RecentlyTrack {
  id: string;
  name: string;
  album: {
    images: { url: string }[];
  };
  artists: { name: string }[];
  preview_url: string | null;
}

interface RecentlyPlayedContextType {
  recentlyPlayed: RecentlyTrack[];
  addTrackToRecentlyPlayed: (track: RecentlyTrack) => void; //트랙을 최근 재생목록에 추가 
}

const RecentlyPlayedContext = createContext<RecentlyPlayedContextType | undefined>(undefined);

export const RecentlyPlayedProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recentlyPlayed, setRecentlyPlayed] = useState<RecentlyTrack[]>([]);

  // 컴포넌트가 마운트 될 때, localStorage에서 최근 재생된 트랙을 가져와 상태로 설정
  useEffect(() => {
    const storedTracks = localStorage.getItem('recentlyPlayed');
    if (storedTracks) {
      setRecentlyPlayed(JSON.parse(storedTracks));
    }
  }, []);
  // 최근 재생된 트랙 목록이 업데이트될 때마다 localStorage에 저장
  useEffect(() => {
    if (recentlyPlayed.length > 0) {
      localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
    }
  }, [recentlyPlayed]);

  const addTrackToRecentlyPlayed = (track: RecentlyTrack) => {
    setRecentlyPlayed(prevTracks => {
      // 동일한 ID를 가진 기존 트랙을 제거
      const updatedTracks = prevTracks.filter(t => t.id !== track.id);
      // 새로운 트랙을 목록의 맨 앞에 추가
      const newTracks = [track, ...updatedTracks];
       // localStorage에 업데이트된 목록을 저장
      localStorage.setItem('recentlyPlayed', JSON.stringify(newTracks));
      return newTracks;
    });
  };
  // RecentlyPlayedContext.Provider를 통해 최근 재생 목록과 추가 함수를 하위 컴포넌트에 제공
  return (
    <RecentlyPlayedContext.Provider value={{ recentlyPlayed, addTrackToRecentlyPlayed }}>
      {children}
    </RecentlyPlayedContext.Provider>
  );
};
// useRecentlyPlayed 훅 : 최근 재생된 트랙 목록과 추가 함수를 반환
export const useRecentlyPlayed = () => {
  const context = useContext(RecentlyPlayedContext);
  if (context === undefined) {
    throw new Error('useRecentlyPlayed must be used within a RecentlyPlayedProvider');
  }
  return context;
};
