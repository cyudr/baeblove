/**
 * Browser Cookie Management Utilities
 * Provides safe persistence for user profiles, session tokens, and preferences.
 */

export function setCookie(name: string, value: string, days = 365): void {
  if (typeof document === 'undefined') return;
  try {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    const encodedValue = encodeURIComponent(value);
    document.cookie = `${name}=${encodedValue};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  } catch (err) {
    console.error(`Error writing cookie "${name}":`, err);
  }
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  try {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
  } catch (err) {
    console.error(`Error reading cookie "${name}":`, err);
  }
  return null;
}

export function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return;
  try {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;
  } catch (err) {
    console.error(`Error deleting cookie "${name}":`, err);
  }
}

export function setJSONCookie<T>(name: string, data: T, days = 365): void {
  try {
    const jsonStr = JSON.stringify(data);
    setCookie(name, jsonStr, days);
  } catch (err) {
    console.error(`Error encoding JSON for cookie "${name}":`, err);
  }
}

export function getJSONCookie<T>(name: string): T | null {
  try {
    const raw = getCookie(name);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`Error parsing JSON from cookie "${name}":`, err);
    return null;
  }
}
