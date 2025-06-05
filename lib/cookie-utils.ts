// Path: lib/cookie-utils.ts

/**
 * Parse cookies from a cookie string
 * @param cookieString The cookie string to parse
 * @returns An object with cookie key-value pairs
 */
export function parseCookies(cookieString: string = ''): Record<string, string> {
  return cookieString.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=')
    if (key) acc[key] = value || ''
    return acc
  }, {} as Record<string, string>)
}

/**
 * Get a cookie value by name
 * @param name The cookie name
 * @param cookies Optional cookie string (document.cookie if not provided)
 * @returns The cookie value or undefined if not found
 */
export function getCookie(name: string, cookies?: string): string | undefined {
  // Use provided cookies or document.cookie if in browser
  const cookieString = cookies || (typeof document !== 'undefined' ? document.cookie : '')
  const parsedCookies = parseCookies(cookieString)
  return parsedCookies[name]
}

/**
 * Set a cookie
 * @param name The cookie name
 * @param value The cookie value
 * @param maxAge Max age in seconds
 * @param path Cookie path
 */
export function setCookie(
  name: string, 
  value: string, 
  maxAge: number = 60 * 60 * 24 * 7, // 7 days
  path: string = '/'
): void {
  if (typeof document !== 'undefined') {
    document.cookie = `${name}=${value}; path=${path}; max-age=${maxAge}`
  }
}