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
  addTrackToRecentlyPlayed: (track: RecentlyTrack) => void;
}

const RecentlyPlayedContext = createContext<RecentlyPlayedContextType | undefined>(undefined);

export const RecentlyPlayedProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recentlyPlayed, setRecentlyPlayed] = useState<RecentlyTrack[]>([]);

  useEffect(() => {
    const storedTracks = localStorage.getItem('recentlyPlayed');
    if (storedTracks) {
      setRecentlyPlayed(JSON.parse(storedTracks));
    }
  }, []);

  useEffect(() => {
    if (recentlyPlayed.length > 0) {
      localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
    }
  }, [recentlyPlayed]);

  const addTrackToRecentlyPlayed = (track: RecentlyTrack) => {
    setRecentlyPlayed(prevTracks => {
      // Remove any existing track with the same ID
      const updatedTracks = prevTracks.filter(t => t.id !== track.id);
      // Add the new track to the beginning
      const newTracks = [track, ...updatedTracks];
      // Update localStorage
      localStorage.setItem('recentlyPlayed', JSON.stringify(newTracks));
      return newTracks;
    });
  };

  return (
    <RecentlyPlayedContext.Provider value={{ recentlyPlayed, addTrackToRecentlyPlayed }}>
      {children}
    </RecentlyPlayedContext.Provider>
  );
};

export const useRecentlyPlayed = () => {
  const context = useContext(RecentlyPlayedContext);
  if (context === undefined) {
    throw new Error('useRecentlyPlayed must be used within a RecentlyPlayedProvider');
  }
  return context;
};
