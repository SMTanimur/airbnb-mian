import { create } from 'zustand';

interface FilterModalStore {
  filterState: {
    minPrice?: number;
    maxPrice?: number;
    bedCount?: number;
    bathroomCount?: number;
  };

  setFilerState: (filterState: any) => void;
}

const useFilterState = create<FilterModalStore>(set => ({
  filterState: {
    bathroomCount: 0,
    bedCount: 0,
    maxPrice: 0,
    minPrice: 0,
  },
  setFilerState: filterState => set({ filterState }),
}));

export default useFilterState
