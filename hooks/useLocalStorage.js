import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for localStorage with React state sync
 * @param {string} key - localStorage key
 * @param {any} initialValue - Initial value if key doesn't exist
 * @returns {[any, Function, Function]} [value, setValue, removeValue]
 */
export function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Setter function
  const setValue = useCallback((value) => {
    setStoredValue((prev) => {
      const valueToStore = value instanceof Function ? value(prev) : value;
      return valueToStore;
    });
  }, []);

  // Remove function
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook for saving code snippets
 */
export function useCodeSnippets() {
  const [snippets, setSnippets, removeSnippets] = useLocalStorage('code-snippets', {});

  const saveSnippet = useCallback((name, code, language = 'javascript') => {
    setSnippets((prev) => ({
      ...prev,
      [name]: {
        code,
        language,
        savedAt: new Date().toISOString(),
      },
    }));
  }, [setSnippets]);

  const getSnippet = useCallback((name) => {
    return snippets[name] || null;
  }, [snippets]);

  const deleteSnippet = useCallback((name) => {
    setSnippets((prev) => {
      const newSnippets = { ...prev };
      delete newSnippets[name];
      return newSnippets;
    });
  }, [setSnippets]);

  const getAllSnippets = useCallback(() => {
    return Object.entries(snippets).map(([name, data]) => ({
      name,
      ...data,
    }));
  }, [snippets]);

  return {
    snippets,
    saveSnippet,
    getSnippet,
    deleteSnippet,
    getAllSnippets,
    clearAll: removeSnippets,
  };
}

export default useLocalStorage;
