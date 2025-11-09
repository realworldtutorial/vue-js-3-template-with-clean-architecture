import axios from 'axios'

/**
 * API Data Source
 * Handles all HTTP requests to the backend API
 * Manages authentication tokens and request/response interceptors
 */
export class ApiDataSource {
  constructor(baseURL = 'http://localhost:3000/api') {
    // Create axios instance with base configuration
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Setup response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle common error responses
        if (error.response) {
          console.error('API Error:', error.response.data);
        } else if (error.request) {
          console.error('Network Error:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Set authentication token for all requests
   * @param {string} token - JWT token
   */
  setAuthToken(token) {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Clear authentication token
   */
  clearAuthToken() {
    delete this.client.defaults.headers.common['Authorization'];
  }

  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @returns {Promise} Response data
   */
  async get(endpoint) {
    const response = await this.client.get(endpoint)
    return response.data
  }

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request payload
   * @returns {Promise} Response data
   */
  async post(endpoint, data) {
    const response = await this.client.post(endpoint, data)
    return response.data
  }

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request payload
   * @returns {Promise} Response data
   */
  async put(endpoint, data) {
    const response = await this.client.put(endpoint, data)
    return response.data
  }

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @returns {Promise} Response data
   */
  async delete(endpoint) {
    const response = await this.client.delete(endpoint)
    return response.data
  }
}
