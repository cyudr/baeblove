import { getCookie, setCookie, deleteCookie } from './cookieUtils';

declare const __BAEPASS_KEY__: string | undefined;
declare const __BAE_KEYS__: Record<string, string> | undefined;

export const AUTH_COOKIE_NAME = 'bae_site_authenticated';

/**
 * Checks whether password protection is enabled (1) or disabled (0).
 * Configured via the environment variable "baepass_Key".
 */
export function isPasswordProtectionEnabled(): boolean {
  let rawToggle: string | undefined;

  // 1. Check define constant injected by vite.config.ts
  if (typeof __BAEPASS_KEY__ !== 'undefined') {
    rawToggle = __BAEPASS_KEY__;
  }

  // 2. Check import.meta.env
  if (!rawToggle && typeof import.meta !== 'undefined' && import.meta.env) {
    rawToggle =
      import.meta.env.baepass_Key ||
      import.meta.env.VITE_baepass_Key ||
      (import.meta.env as Record<string, string>)['baepass_Key'];
  }

  const normalized = String(rawToggle ?? '0').trim().toLowerCase();
  return normalized === '1' || normalized === 'true';
}

/**
 * Collects all configured valid passwords from environment variables starting with "bae_Key".
 */
export function getConfiguredPasswords(): string[] {
  const passwords: string[] = [];

  // Check __BAE_KEYS__ injected by vite.config.ts
  if (typeof __BAE_KEYS__ === 'object' && __BAE_KEYS__ !== null) {
    for (const [key, val] of Object.entries(__BAE_KEYS__)) {
      if (key.startsWith('bae_Key') && typeof val === 'string' && val.trim().length > 0) {
        passwords.push(val.trim());
      }
    }
  }

  // Also inspect import.meta.env for any bae_Key* or VITE_bae_Key*
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    for (const [key, val] of Object.entries(import.meta.env)) {
      if (
        (key.startsWith('bae_Key') || key.startsWith('VITE_bae_Key')) &&
        typeof val === 'string' &&
        val.trim().length > 0
      ) {
        passwords.push(val.trim());
      }
    }
  }

  return Array.from(new Set(passwords));
}

/**
 * Validates a user's entered password against configured bae_Key* variables.
 */
export function validatePassword(attempt: string): boolean {
  const clean = attempt.trim();
  if (!clean) return false;

  const validPasswords = getConfiguredPasswords();

  // If password protection is enabled but no password was configured in env, allow fallback or notify
  if (validPasswords.length === 0) {
    console.warn(
      'baepass_Key is enabled (1), but no environment variables starting with "bae_Key" were found.'
    );
    return false;
  }

  return validPasswords.some((pwd) => pwd === clean);
}

/**
 * Checks if the user is currently authenticated via browser cookies.
 */
export function isUserAuthenticated(): boolean {
  if (!isPasswordProtectionEnabled()) {
    return true; // Password protection is disabled
  }

  const cookieAuth = getCookie(AUTH_COOKIE_NAME);
  if (cookieAuth === '1' || cookieAuth === 'true') {
    return true;
  }

  // Check localStorage backup
  try {
    const localAuth = localStorage.getItem(AUTH_COOKIE_NAME);
    if (localAuth === '1' || localAuth === 'true') {
      setCookie(AUTH_COOKIE_NAME, '1', 30);
      return true;
    }
  } catch {}

  return false;
}

/**
 * Marks the user as authenticated in browser cookies (valid for 30 days) and localStorage.
 */
export function authenticateUser(): void {
  setCookie(AUTH_COOKIE_NAME, '1', 30);
  try {
    localStorage.setItem(AUTH_COOKIE_NAME, '1');
  } catch {}
}

/**
 * Signs out the user and re-locks the site.
 */
export function logoutUser(): void {
  deleteCookie(AUTH_COOKIE_NAME);
  try {
    localStorage.removeItem(AUTH_COOKIE_NAME);
  } catch {}
}

/**
 * Validates security passkey specifically for destructive profile deletion.
 * If bae_Key password protection is configured, requires entering the valid password.
 * If no environment passwords are configured, requires typing the confirmation keyword "DELETE".
 */
export function verifyDeletionPassword(attempt: string): { isValid: boolean; error?: string } {
  const clean = attempt.trim();
  if (!clean) {
    return { isValid: false, error: 'Password or confirmation code is required.' };
  }

  const validPasswords = getConfiguredPasswords();
  if (validPasswords.length > 0) {
    if (validPasswords.includes(clean)) {
      return { isValid: true };
    }
    return { isValid: false, error: 'Incorrect security password. Please re-enter the authorized passkey.' };
  }

  // Fallback when no bae_Key passwords are set in env
  if (clean.toUpperCase() === 'DELETE' || clean.toLowerCase() === 'confirm') {
    return { isValid: true };
  }

  return { isValid: false, error: 'Please enter "DELETE" to confirm permanent deletion.' };
}
