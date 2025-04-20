// userStore.js
import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  token: null,

  // Initialize from localStorage
  initialize: () => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('codevibe-user');
      const storedToken = localStorage.getItem('codevibe-token');
      set({ 
        user: storedUser ? JSON.parse(storedUser) : null,
        token: storedToken || null
      });
    }
  },

  // Set both user and token
  setAuth: (user, token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('codevibe-user', JSON.stringify(user));
      localStorage.setItem('codevibe-token', token);
    }
    set({ user, token });
  },

  // Update just user data
  setUser: (user) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('codevibe-user', JSON.stringify(user));
    }
    set({ user });
  },

  // Clear auth data
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('codevibe-user');
      localStorage.removeItem('codevibe-token');
    }
    set({ user: null, token: null });
  },

  // Add contest to user's contests
  addContest: (contest) => {
    set((state) => {
      if (!state.user) return state;
      
      const updatedUser = {
        ...state.user,
        contests: [...(state.user.contests || []), contest]
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('codevibe-user', JSON.stringify(updatedUser));
      }

      return { user: updatedUser };
    });
  }
}));

export default useUserStore;