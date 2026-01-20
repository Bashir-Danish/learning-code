import { createContext, useContext, useEffect, useState } from 'react';

const ProgressContext = createContext(null);

const STORAGE_KEY = 'algorithm-dashboard-progress';

const initialProgress = {
  completedLessons: [],
  completedExercises: [],
  lastVisited: null,
};

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialProgress;
    } catch {
      return initialProgress;
    }
  });

  // Persist to localStorage whenever progress changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const markLessonComplete = (lessonId) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      };
    });
  };

  const markExerciseComplete = (exerciseId) => {
    setProgress((prev) => {
      if (prev.completedExercises.includes(exerciseId)) return prev;
      return {
        ...prev,
        completedExercises: [...prev.completedExercises, exerciseId],
      };
    });
  };

  const setLastVisited = (lessonId) => {
    setProgress((prev) => ({
      ...prev,
      lastVisited: lessonId,
    }));
  };

  const isLessonComplete = (lessonId) => {
    return progress.completedLessons.includes(lessonId);
  };

  const isExerciseComplete = (exerciseId) => {
    return progress.completedExercises.includes(exerciseId);
  };

  const getCategoryProgress = (categoryLessons) => {
    if (!categoryLessons || categoryLessons.length === 0) return 0;
    const completed = categoryLessons.filter((lesson) =>
      progress.completedLessons.includes(lesson.id)
    ).length;
    return Math.round((completed / categoryLessons.length) * 100);
  };

  const value = {
    progress,
    markLessonComplete,
    markExerciseComplete,
    setLastVisited,
    isLessonComplete,
    isExerciseComplete,
    getCategoryProgress,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
