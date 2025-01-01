import chipCardWhite from "../assets/img/icons/chip_card_white.png";
import chipCardBlack from "../assets/img/icons/chip_card_black.png";
import creditCardBrand from "../assets/img/icons/cc_company.png";
import debitCardBrand from "../assets/img/icons/dc_company.png";
import ApiService from "./api.service";

const DashboardService = {
  getCardData: async () => {
    try {
      const response = await ApiService.get(
        "/29e1ec63-acf9-4cb7-9696-5cbc2e9df651"
      );
      const data = response.data;

      return data.map((item) => ({
        ...item,
        imgSrc: item.isCreditCard ? chipCardWhite : chipCardBlack,
        brandLogo: item.isCreditCard ? creditCardBrand : debitCardBrand,
      }));
    } catch (error) {
      console.error("Error fetching card data:", error);
      throw error;
    }
  },

  getRecentTransactions: async () => {
    try {
      const response = await ApiService.get(
        "/2199cd26-e5a1-4c38-954a-e1df0a00bbab"
      );
      return response.data.map((transaction) => ({
        ...transaction,
        icon:
          transaction.paymentMode === 0
            ? "depositCard"
            : transaction.paymentMode === 1
            ? "depositPaypal"
            : "depositAdhoc",
      }));
    } catch (error) {
      console.error("Error fetching recent transactions:", error);
      throw error;
    }
  },

  getWeeklyActivity: async () => {
    try {
      const response = await ApiService.get(
        "/869fc64b-f290-4b1a-8206-75638e32d93d"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching weekly activity:", error);
      throw error;
    }
  },

  getExpenseStatistics: async () => {
    try {
      const response = await ApiService.get(
        "/c00eacbc-1477-4b67-aa8d-3547bc1873d5"
      );
      return response.data.expenseStatistics;
    } catch (error) {
      console.error("Error fetching expense statistics:", error);
      throw error;
    }
  },

  getQuickTransferUsers: async () => {
    try {
      const response = await ApiService.get(
        "/b0e92a1f-fc44-4846-9a2d-6a8317512582"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching quick transfer users:", error);
      throw error;
    }
  },

  getBalanceHistory: async () => {
    try {
      const response = await ApiService.get(
        "/716732b5-46b1-4027-a905-927f2d2e11e0"
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching balance history:", error);
      throw error;
    }
  },
};

export default DashboardService;
