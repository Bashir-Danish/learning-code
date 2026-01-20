import { create } from 'zustand';

// Single store for client state (UI, filters, selections)
const useAppStore = create((set) => ({
  // State
  selectedPostId: null,
  filterEnabled: false,

  // Actions
  selectPost: (id) => set({ selectedPostId: id }),
  clearSelection: () => set({ selectedPostId: null }),
  toggleFilter: () => set((state) => ({ filterEnabled: !state.filterEnabled })),
}));

export default useAppStore;
