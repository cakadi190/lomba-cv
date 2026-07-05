import type { H3Event } from "h3";
import prisma from "~~/lib/prisma";
import {
  deleteAuthCookie,
  getAuthenticatedUser,
  setAuthCookie,
  signToken,
  verifyPassword,
} from "~~/server/lib/utils/auth";

/**
 * Representation of an authenticated user in the system.
 */
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  created_at?: Date;
}

/**
 * SessionGuard class manages the authentication state for a request session.
 * It simulates a stateful auth session helper bound to the current H3Event.
 */
export class SessionGuard {
  private event: H3Event;
  private currentUser: AuthUser | null = null;
  private hasFetchedUser = false;

  /**
   * Create a new SessionGuard instance.
   *
   * @param event - The current H3 HTTP event.
   */
  constructor(event: H3Event) {
    this.event = event;
  }

  /**
   * Retrieve the currently authenticated user.
   * Caches the user in-memory for subsequent calls during the same request.
   *
   * @returns The authenticated user object or null.
   */
  async user(): Promise<AuthUser | null> {
    if (this.hasFetchedUser) {
      return this.currentUser;
    }
    this.currentUser = await getAuthenticatedUser(this.event);
    this.hasFetchedUser = true;
    return this.currentUser;
  }

  /**
   * Retrieve the ID of the currently authenticated user.
   *
   * @returns The user's ID string or null.
   */
  async id(): Promise<string | null> {
    const user = await this.user();
    return user ? user.id : null;
  }

  /**
   * Determine if the current user is authenticated.
   *
   * @returns True if authenticated, false otherwise.
   */
  async check(): Promise<boolean> {
    return (await this.user()) !== null;
  }

  /**
   * Determine if the current user is a guest (not authenticated).
   *
   * @returns True if guest, false otherwise.
   */
  async guest(): Promise<boolean> {
    return !(await this.check());
  }

  /**
   * Log a given user user into the application.
   *
   * @param user - The user object to log in.
   * @param remember - Whether to remember the session across browser restarts.
   */
  login(user: AuthUser, remember = false): void {
    const expiresInSeconds = remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60;
    const token = signToken(
      { userId: user.id, email: user.email },
      expiresInSeconds,
    );
    setAuthCookie(this.event, token, remember);
    this.currentUser = user;
    this.hasFetchedUser = true;
  }

  /**
   * Log the user out of the application, clearing local state and session cookies.
   */
  logout(): void {
    deleteAuthCookie(this.event);
    this.currentUser = null;
    this.hasFetchedUser = true;
  }

  /**
   * Attempt to authenticate a user using the given credentials.
   *
   * @param credentials - User credentials containing email and password.
   * @param remember - Whether to remember the session after authentication.
   * @returns True if authentication succeeded and the user was logged in, false otherwise.
   */
  async attempt(
    credentials: { email?: string; password?: string },
    remember = false,
  ): Promise<boolean> {
    if (!credentials.email || !credentials.password) {
      return false;
    }

    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    });

    if (!user) {
      return false;
    }

    if (!verifyPassword(credentials.password, user.password)) {
      return false;
    }

    this.login(user, remember);
    return true;
  }
}

/**
 * Auth facade object to retrieve guards bound to H3 HTTP events.
 */
export const Auth = {
  /**
   * Get an instance of the SessionGuard for the current HTTP request.
   *
   * @param event - The current H3 event.
   * @returns A SessionGuard instance.
   */
  guard(event: H3Event): SessionGuard {
    return new SessionGuard(event);
  },
};
