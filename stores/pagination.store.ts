import create from "zustand";

type Pagination = {
  limit: number;
  offset: number;
  page: number;
  setPage: (_page: number) => void;
};

export const usePaginationStore = create<Pagination>((set, get) => ({
  limit: 5,
  offset: 0,
  page: 1,
  setPage: (_page) => set({ offset: _page * get().limit, page: _page }),
}));
