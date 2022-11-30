import create from "zustand";

type State<T> = {
  value: T;
  onChange: (value: T) => void;
};

type Pagination = {
  limit: number;
  offset: number;
  total: number;
  page: number;
  pageCount: number;
  setPage: (_page: number) => void;
  setTotal: (_total: number) => void;

  search: State<string>;
  type: State<string>;
  isLegendary: State<boolean>;
  isMythical: State<boolean>;
};

export const useSearchStore = create<Pagination>((set, get) => ({
  limit: 5,
  offset: 0,
  total: 0,
  page: 1,
  pageCount: 0,
  setPage: (_page) => set({ offset: (_page - 1) * get().limit, page: _page }),
  setTotal: (_total) =>
    set({ pageCount: Math.ceil(_total / get().limit), total: _total }),

  search: {
    value: "",
    onChange: (value) =>
      set({ offset: 0, page: 1, search: { ...get().search, value } }),
  },
  type: {
    value: "normal",
    onChange: (value) =>
      set({ offset: 0, page: 1, type: { ...get().type, value } }),
  },
  isLegendary: {
    value: false,
    onChange: (value) =>
      set({ offset: 0, page: 1, isLegendary: { ...get().isLegendary, value } }),
  },
  isMythical: {
    value: false,
    onChange: (value) =>
      set({ offset: 0, page: 1, isLegendary: { ...get().isMythical, value } }),
  },
}));
