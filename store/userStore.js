// userStore.js
import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  setUser: (userinfo) => {
    if (typeof window !== 'undefined') {
      if (userinfo) {
        localStorage.setItem('codevibe-user', JSON.stringify(userinfo));
      } else {
        localStorage.removeItem('codevibe-user');
      }
    }
    set({ user: userinfo });
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('codevibe-user');
    }
    set({ user: null });
  },
  initialize: () => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('codevibe-user');
      set({ user: storedUser ? JSON.parse(storedUser) : null });
    }
  }
}));

export default useUserStore;