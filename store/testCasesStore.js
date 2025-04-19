import { create } from 'zustand';

const useTestCasesStore = create((set) => ({
  testCases: [],
  selectedTestCase: 0,
  setTestCases: (testCases) => set({ testCases }),
  setSelectedTestCase: (index) => set({ selectedTestCase: index }),
  newTestCases: [],
  setNewTestCases: (newTestCases) => set({ newTestCases }),
}));

export default useTestCasesStore;