export interface GameStats {
  highScore: number;
  totalGamesPlayed: number;
  totalDistance: number;
  totalTime: number;
  bestStreak: number;
  averageScore: number;
  lastPlayed: string;
  achievements: string[];
}

export interface GameSession {
  score: number;
  distance: number;
  time: number;
  obstaclesAvoided: number;
  powerUpsCollected: number;
  date: string;
}

const STATS_KEY = 'neonRacerStats';
const SESSIONS_KEY = 'neonRacerSessions';

export const getGameStats = (): GameStats => {
  const saved = localStorage.getItem(STATS_KEY);
  if (!saved) {
    return {
      highScore: 0,
      totalGamesPlayed: 0,
      totalDistance: 0,
      totalTime: 0,
      bestStreak: 0,
      averageScore: 0,
      lastPlayed: '',
      achievements: []
    };
  }
  return JSON.parse(saved);
};

export const saveGameSession = (session: GameSession): GameStats => {
  const stats = getGameStats();
  const sessions = getGameSessions();
  
  // Update stats
  stats.totalGamesPlayed += 1;
  stats.totalDistance += session.distance;
  stats.totalTime += session.time;
  stats.lastPlayed = session.date;
  
  if (session.score > stats.highScore) {
    stats.highScore = session.score;
  }
  
  stats.averageScore = Math.round(
    sessions.reduce((sum, s) => sum + s.score, session.score) / (sessions.length + 1)
  );
  
  // Check for achievements
  const newAchievements = checkAchievements(stats, session, sessions);
  stats.achievements = [...new Set([...stats.achievements, ...newAchievements])];
  
  // Save updated stats
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  
  // Save session (keep last 50 sessions)
  const updatedSessions = [session, ...sessions].slice(0, 50);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(updatedSessions));
  
  return stats;
};

export const getGameSessions = (): GameSession[] => {
  const saved = localStorage.getItem(SESSIONS_KEY);
  return saved ? JSON.parse(saved) : [];
};

const checkAchievements = (stats: GameStats, session: GameSession, sessions: GameSession[]): string[] => {
  const achievements: string[] = [];
  
  // Score-based achievements
  if (session.score >= 1000 && !stats.achievements.includes('first_thousand')) {
    achievements.push('first_thousand');
  }
  if (session.score >= 5000 && !stats.achievements.includes('speed_demon')) {
    achievements.push('speed_demon');
  }
  if (session.score >= 10000 && !stats.achievements.includes('racing_legend')) {
    achievements.push('racing_legend');
  }
  if (session.score >= 25000 && !stats.achievements.includes('neon_master')) {
    achievements.push('neon_master');
  }
  
  // Streak achievements
  if (stats.totalGamesPlayed >= 10 && !stats.achievements.includes('persistent_racer')) {
    achievements.push('persistent_racer');
  }
  if (stats.totalGamesPlayed >= 50 && !stats.achievements.includes('racing_veteran')) {
    achievements.push('racing_veteran');
  }
  
  // Special achievements
  if (session.distance >= 1000 && !stats.achievements.includes('marathon_runner')) {
    achievements.push('marathon_runner');
  }
  if (session.powerUpsCollected >= 10 && !stats.achievements.includes('power_collector')) {
    achievements.push('power_collector');
  }
  
  return achievements;
};

export const getAchievementDetails = (achievement: string) => {
  const achievements: Record<string, { name: string; description: string; icon: string }> = {
    first_thousand: {
      name: 'First Thousand',
      description: 'Score 1,000 points in a single race',
      icon: '🏆'
    },
    speed_demon: {
      name: 'Speed Demon',
      description: 'Score 5,000 points in a single race',
      icon: '🔥'
    },
    racing_legend: {
      name: 'Racing Legend',
      description: 'Score 10,000 points in a single race',
      icon: '⭐'
    },
    neon_master: {
      name: 'Neon Master',
      description: 'Score 25,000 points in a single race',
      icon: '🌟'
    },
    persistent_racer: {
      name: 'Persistent Racer',
      description: 'Play 10 games',
      icon: '🎯'
    },
    racing_veteran: {
      name: 'Racing Veteran',
      description: 'Play 50 games',
      icon: '🏅'
    },
    marathon_runner: {
      name: 'Marathon Runner',
      description: 'Travel 1,000 meters in a single race',
      icon: '🏃'
    },
    power_collector: {
      name: 'Power Collector',
      description: 'Collect 10 power-ups in a single race',
      icon: '💎'
    }
  };
  
  return achievements[achievement] || { name: achievement, description: '', icon: '🏆' };
};
