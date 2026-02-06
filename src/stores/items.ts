import { defineStore } from 'pinia';

export interface Item {
  id: number;
  fullName: string;
  birthDate: string;
  profession: string;
  docNumber: string;
  phoneNumber: string;
}

export const useItemsStore = defineStore('items', {
  state: () => ({
    items: [] as Item[],
    page: 1,
    rowsPerPage: 5,
    loading: false,
  }),

  getters: {
    paginatedItems(state) {
      const start = (state.page - 1) * state.rowsPerPage;
      return state.items.slice(start, start + state.rowsPerPage);
    },

    totalPages(state) {
      return Math.ceil(state.items.length / state.rowsPerPage);
    },

    // getById: (state) => {
    //   return (id: number) => state.items.find((i) => i.id === id);
    // },
  },

  actions: {
    async load() {
      this.loading = true;

      await new Promise((resolve) => setTimeout(resolve, 500));
      const raw = localStorage.getItem('items');
      this.items = raw ? JSON.parse(raw) : [];

      this.loading = false;
    },

    setRowsPerPage(value: number) {
      this.rowsPerPage = value;
      this.page = 1;
    },

    persist() {
      localStorage.setItem('items', JSON.stringify(this.items));
    },

    create(payload: Omit<Item, 'id'>) {
      this.items.push({
        id: Date.now(),
        ...payload,
      });
      this.persist();
    },

    update(id: number, payload: Omit<Item, 'id'>) {
      const item = this.items.find((i) => i.id === id);
      if (!item) return;
      Object.assign(item, payload);
      this.persist();
    },

    remove(id: number) {
      this.items = this.items.filter((i) => i.id != id);
      this.persist();
    },

    getById(id: number) {
      return this.items.find((i) => i.id === id);
    },
  },
});
