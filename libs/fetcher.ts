import axios from "axios";

/**
 * A utility function for fetching data using Axios.
 *
 * This function sends an HTTP GET request to the specified URL using Axios and returns the response data.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise} A Promise that resolves to the fetched data from the specified URL.
 */
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default fetcher;
