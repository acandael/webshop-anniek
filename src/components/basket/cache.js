const cacheKey = 'app-basket';

export async function retrieveFromCache() {
  try {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined' && window.localStorage) {
      const cache = await localStorage.getItem(cacheKey);
      if (cache) {
        return JSON.parse(cache);
      }
    }
  } catch (error) {
    // We might not have access to localStorage
  }
  return {};
}

export function persistToCache(data) {
  try {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.setItem(cacheKey, JSON.stringify(data));
    }
  } catch (error) {
    // We might not have access to localStorage
  }
}
