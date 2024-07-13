import axios from "axios";

const API_URL = "http://localhost:3000";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
    });

    // Interceptor de requête pour ajouter le token d'accès
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Interceptor de réponse pour gérer le renouvellement du token
    this.api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const newTokens = await this.refreshToken();
          if (newTokens && newTokens.accessToken) {
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newTokens.accessToken}`;
            return this.api(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async login(username, password) {
    console.log("username", username);
    console.log("password", password);
    return true;
    // const response = await this.api.post("/login", { username, password });
    // if (response.data.accessToken) {
    //   this.setToken(response.data);
    // }
    // return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  setToken(data) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  getToken() {
    const user = this.getCurrentUser();
    return user ? user.accessToken : null;
  }

  async refreshToken() {
    const user = this.getCurrentUser();
    if (user && user.refreshToken) {
      try {
        const response = await this.api.post("/refresh-token", {
          refreshToken: user.refreshToken,
        });
        if (response.data.accessToken) {
          this.setToken(response.data);
        }
        return response.data;
      } catch (error) {
        console.error("Error refreshing token", error);
        this.logout();
      }
    }
    return null;
  }

  getApi() {
    return this.api;
  }
}

export default new AuthService();
