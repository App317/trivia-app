//The OpenTDB rate limits for heavy traffic, and only allows each IP to access it once every 5 seconds.
//This delay is needed to prevent a 429 error
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
