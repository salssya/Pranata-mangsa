import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { MangsaInfo } from '../types';
import { getAllMangsaInfo, getCurrentMangsa } from '../utils/mangsaUtils';
import React from 'react';


interface MangsaState {
  // State
  allMangsa: MangsaInfo[];
  currentMangsa: MangsaInfo | null;
  selectedMangsa: MangsaInfo | null;
  currentDate: Date;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  initializeMangsa: () => void;
  setSelectedMangsa: (mangsa: MangsaInfo | null) => void;
  setCurrentDate: (date: Date) => void;
  refreshCurrentMangsa: () => void;
  resetStore: () => void;
  
  // Computed/Getters
  getMangsaByNumber: (number: string) => MangsaInfo | undefined;
  getNextMangsa: () => MangsaInfo | null;
  getPreviousMangsa: () => MangsaInfo | null;
  getCurrentMangsaIndex: () => number;
}

const initialState = {
  allMangsa: [],
  currentMangsa: null,
  selectedMangsa: null,
  currentDate: new Date(),
  isLoading: false,
  error: null,
};

export const useMangsaStore = create<MangsaState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // Initialize mangsa data
        initializeMangsa: () => {
          set({ isLoading: true, error: null });
          
          try {
            const mangsa = getAllMangsaInfo();
            const current = getCurrentMangsa(new Date());
            
            set({
              allMangsa: mangsa,
              currentMangsa: current,
              selectedMangsa: current, // Set current as selected by default
              isLoading: false,
              error: null,
            });
          } catch (error) {
            set({
              isLoading: false,
              error: error instanceof Error ? error.message : 'Failed to load mangsa data',
            });
          }
        },

        // Set selected mangsa
        setSelectedMangsa: (mangsa) => {
          set({ selectedMangsa: mangsa });
        },

        // Set current date and refresh current mangsa
        setCurrentDate: (date) => {
          try {
            const current = getCurrentMangsa(date);
            set({
              currentDate: date,
              currentMangsa: current,
            });
          } catch (error) {
            set({
              currentDate: date,
              error: error instanceof Error ? error.message : 'Failed to update current mangsa',
            });
          }
        },

        // Refresh current mangsa based on current date
        refreshCurrentMangsa: () => {
          const { currentDate } = get();
          try {
            const current = getCurrentMangsa(currentDate);
            set({ currentMangsa: current });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Failed to refresh current mangsa',
            });
          }
        },

        // Reset store to initial state
        resetStore: () => {
          set({ ...initialState, currentDate: new Date() });
        },

        // Get mangsa by number
        getMangsaByNumber: (number) => {
          const { allMangsa } = get();
          return allMangsa.find(mangsa => mangsa.number === number);
        },

        // Get next mangsa
        getNextMangsa: () => {
          const { currentMangsa, allMangsa } = get();
          if (!currentMangsa || allMangsa.length === 0) return null;
          
          const currentIndex = allMangsa.findIndex(m => m.number === currentMangsa.number);
          if (currentIndex === -1) return null;
          
          const nextIndex = (currentIndex + 1) % allMangsa.length;
          return allMangsa[nextIndex];
        },

        // Get previous mangsa
        getPreviousMangsa: () => {
          const { currentMangsa, allMangsa } = get();
          if (!currentMangsa || allMangsa.length === 0) return null;
          
          const currentIndex = allMangsa.findIndex(m => m.number === currentMangsa.number);
          if (currentIndex === -1) return null;
          
          const prevIndex = currentIndex === 0 ? allMangsa.length - 1 : currentIndex - 1;
          return allMangsa[prevIndex];
        },

        // Get current mangsa index
        getCurrentMangsaIndex: () => {
          const { currentMangsa, allMangsa } = get();
          if (!currentMangsa || allMangsa.length === 0) return -1;
          
          return allMangsa.findIndex(m => m.number === currentMangsa.number);
        },
      }),
      {
        name: 'mangsa-store',
        // Only persist selected items, not the full state
        partialize: (state) => ({
          selectedMangsa: state.selectedMangsa,
          currentDate: state.currentDate,
        }),
        // Custom storage to handle Date serialization
        storage: {
          getItem: (name) => {
            const str = localStorage.getItem(name);
            if (!str) return null;
            
            const parsed = JSON.parse(str);
            // Convert date string back to Date object
            if (parsed.state?.currentDate) {
              parsed.state.currentDate = new Date(parsed.state.currentDate);
            }
            return parsed;
          },
          setItem: (name, value) => {
            localStorage.setItem(name, JSON.stringify(value));
          },
          removeItem: (name) => {
            localStorage.removeItem(name);
          },
        },
      }
    ),
    {
      name: 'mangsa-store',
    }
  )
);

// Selectors for better performance
export const useMangsaSelectors = {
  // Get all mangsa
  useAllMangsa: () => useMangsaStore(state => state.allMangsa),
  
  // Get current mangsa
  useCurrentMangsa: () => useMangsaStore(state => state.currentMangsa),
  
  // Get selected mangsa
  useSelectedMangsa: () => useMangsaStore(state => state.selectedMangsa),
  
  // Get current date
  useCurrentDate: () => useMangsaStore(state => state.currentDate),
  
  // Get loading state
  useIsLoading: () => useMangsaStore(state => state.isLoading),
  
  // Get error state
  useError: () => useMangsaStore(state => state.error),
  
  // Get navigation mangsa
  useNavigationMangsa: () => useMangsaStore(state => ({
    next: state.getNextMangsa(),
    previous: state.getPreviousMangsa(),
    currentIndex: state.getCurrentMangsaIndex(),
  })),
  
  // Get mangsa by characteristics (computed selector)
  useMangsaByType: (type: 'hujan' | 'kering' | 'normal') => 
    useMangsaStore(state => 
      state.allMangsa.filter(mangsa => {
        const char = mangsa.characteristics.toLowerCase();
        switch (type) {
          case 'hujan':
            return char.includes('hujan') || char.includes('basah');
          case 'kering':
            return char.includes('kering') || char.includes('kemarau');
          default:
            return !char.includes('hujan') && !char.includes('basah') && 
                   !char.includes('kering') && !char.includes('kemarau');
        }
      })
    ),
};

// Actions for easier access
export const useMangsaActions = () => {
  return useMangsaStore(state => ({
    initializeMangsa: state.initializeMangsa,
    setSelectedMangsa: state.setSelectedMangsa,
    setCurrentDate: state.setCurrentDate,
    refreshCurrentMangsa: state.refreshCurrentMangsa,
    resetStore: state.resetStore,
    getMangsaByNumber: state.getMangsaByNumber,
  }));
};

// Hook for initialization
export const useInitializeMangsa = () => {
  const initializeMangsa = useMangsaStore(state => state.initializeMangsa);
  const isLoading = useMangsaStore(state => state.isLoading);
  const allMangsa = useMangsaStore(state => state.allMangsa);
  
  // Auto-initialize if not loaded
  React.useEffect(() => {
    if (allMangsa.length === 0 && !isLoading) {
      initializeMangsa();
    }
  }, [allMangsa.length, isLoading, initializeMangsa]);
  
  return { isLoading };
};