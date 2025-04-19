import { create } from 'zustand';

const useCodeEditorStore = create((set) => ({
  runCount: 0,
  setRunCount: (count) => set({ runCount: count }),
  useLanguage: "javascript",
  setUseLanguage: (language) => set({ useLanguage: language }),
  userCode: "",
  setUserCode: (code) => set({ userCode: code }),
  adminKey: "",
  setadminKey: (key) => set({ adminKey: key }),
  adminExplaination: "",
  setAdminExplaination: (explanation) => set({ adminExplaination: explanation }),
}));

export default useCodeEditorStore;