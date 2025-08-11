import axios from "axios";

/**
 * A pre-configured Axios instance for making API requests.
 * The base URL is set to `/api` to proxy requests through the Next.js server,
 * which helps to hide the OMDb API key from the client.
 */
export const api = axios.create({
  baseURL: "/api",
  timeout: 10000, // 10 second timeout
});
