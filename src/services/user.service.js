import ApiService from "./api.service";

const UserService = {
  updateUser: async (userData) => {
    try {
      const response = await ApiService.post(
        "/75917729-7e27-430f-8b40-38512df804e2",
        userData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  getUser: async () => {
    try {
      const response = await ApiService.get(
        "/f8972c76-9a40-4127-8749-5b6f22c17e19"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },
};

export default UserService;
