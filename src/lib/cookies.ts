export const OPEN_COOKIES_EVENT = 'era:open-cookies'

export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_COOKIES_EVENT))
