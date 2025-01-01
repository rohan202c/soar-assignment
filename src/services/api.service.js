import axios from "axios";

// Create an extended Axios instance
const extendedAxiosInstance = axios.create({
  baseURL: "https://run.mocky.io/v3/",
  headers: {
    "Content-Type": "application/json",
  },
});

extendedAxiosInstance.clearAllCache = () => {
  console.log("Cache cleared");
};

extendedAxiosInstance.clearAllPendingRequests = () => {
  console.log("Pending requests cleared");
};

// A flexible API object
const ApiService = Object.assign(
  (configOrUrl, config) => extendedAxiosInstance.request(configOrUrl, config),
  {
    request: (config) => extendedAxiosInstance.request(config),
    get: (url, config) => extendedAxiosInstance.get(url, config),
    head: (url, config) => extendedAxiosInstance.head(url, config),
    delete: (url, config) => extendedAxiosInstance.delete(url, config),
    options: (url, config) => extendedAxiosInstance.options(url, config),
    put: (url, data, config) => extendedAxiosInstance.put(url, data, config),
    post: (url, data, config) => extendedAxiosInstance.post(url, data, config),
    patch: (url, data, config) =>
      extendedAxiosInstance.patch(url, data, config),

    // Axios instance properties
    defaults: extendedAxiosInstance.defaults,
    interceptors: extendedAxiosInstance.interceptors,

    // Custom extensions
    clearAllCache: () => extendedAxiosInstance.clearAllCache(),
    clearAllPendingRequests: () =>
      extendedAxiosInstance.clearAllPendingRequests(),
  }
);

export default ApiService;
