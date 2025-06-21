import { create } from "zustand";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const API_URL = `${BASE_URL}/transactions`;

const useTransactionStore = create((set) => ({
  transactions: [],

  // fetch transaction
  fetchTransactions: async () => {
    try {
      const response = await axios.get(API_URL);
      set({ transactions: response.data });
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
