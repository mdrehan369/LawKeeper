/**
 * An array of routes that are public
 * @type {string[]}
 */

export const publicRoutes = [
  "/",
  "/public/*",
  "/images/*",
  "/about",
  "/efir",
  "/women-child-organization"
];

/**
 * An array of routes that are protected
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/signin",
  "/auth/signup",
]

export const subdomainsAuthRoutes = [
  "/auth",
]

export const restrictedRoutes = [
  "/admin",
  "/police",
  "/detective"
]

export const loggedUserRoutes = [
  "/profile",
  "/efir"
]

/**
 * The prefix for the auth api
 * @type {string}
 */

export const apiAuthPrefix = "/api/v1/users/citizens"

export const DEFAULT_LOGIN_REDIRECT = "/"
