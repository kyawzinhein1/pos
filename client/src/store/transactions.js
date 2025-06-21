import { create } from "zustand";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const API_URL = `${BASE_URL}/transactions`;

const useTransactionStore = create((set) => ({
  transactions: [],
  total: 0,
  totalPages: 0,
  page: 1,
  limit: 10,

  // fetch transaction
  fetchTransactions: async (page = 1, limit = 10, searchTerm = "", startDate = "", endDate = "") => {
    try {
      const params = new URLSearchParams({
        page,
        limit,
        ...(searchTerm && { searchTerm }), // <-- use searchTerm as key
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      });
      const response = await axios.get(`${API_URL}?${params.toString()}`);
      // Destructure paginated response
      const { transactions, total, totalPages } = response.data;
      set({ transactions, total, totalPages, page, limit });
    } catch (error) {
      console.error("Error fetching transactions", error);
    }
  },

  // Store transaction history
  saveTransaction: async (transactionDetail) => {
    try {
      const { transactionId, ...transactionData } = transactionDetail;

      // console.log("Saving transaction:", transactionData);

      const response = await axios.post(API_URL, transactionDetail);

      set((state) => ({
        transactions: [...state.transactions, response.data],
      }));
    } catch (error) {
      console.error(
        "Error saving transaction:",
        error.response?.data || error.message
      );
    }
  },
}));

export default useTransactionStore;
