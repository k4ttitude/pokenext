import create from "zustand";

type Pagination = {
  limit: number;
  offset: number;
  total: number;
  page: number;
  pageCount: number;
  setPage: (_page: number) => void;
  setTotal: (_total: number) => void;
};

export const usePaginationStore = create<Pagination>((set, get) => ({
  limit: 5,
  offset: 0,
  total: 0,
  page: 1,
  pageCount: 0,
  setPage: (_page) => set({ offset: (_page - 1) * get().limit, page: _page }),
  setTotal: (_total) =>
    set({ pageCount: Math.ceil(_total / get().limit), total: _total }),
}));
