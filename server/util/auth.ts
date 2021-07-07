import express from "express";

declare module "express-session" {
  export interface SessionData {
    lastURL?: string;
  }
}

const authReqs: {req: AuthReq, priority: number}[] = [];

/**
 * A method used to register a new authenticator to the authentication chain.
 *
 * This method should provide a callback that will be ran on every request that requires auth, so long as any authenticators before it allowed the request.
 * It will then be ran with access to the express request and response objects, which is can use to find out if a user is authenticated, and can also be used
 * to redirect them if they aren't. This method will return a boolean indicating whether or not the user is authenticated. If they are authenticated, it should
 * not use the response object.
 * @param callback {AuthReq} - the callback used to authenticate the request.
 * @param priority {number} - a number indicating the priority of the authenticator. Higher numbers will appear first in the chain of authentication.
 */
export const registerAuthReq = (callback: AuthReq, priority = 0) => {
  authReqs.push({req: callback, priority});

  authReqs.sort((a, b) => b.priority - a.priority);
};

/**
 * A callback that will be ran on every request that requires auth, so long as any authenticators before it allowed the request.
 * It will then be ran with access to the express request and response objects, which is can use to find out if a user is authenticated, and can also be used
 * to redirect them if they aren't. This method will return a boolean indicating whether or not the user is authenticated. If they are authenticated, it should
 * not use the response object.
 */
export type AuthReq = (req: express.Request, res: express.Response) => boolean;

/**
 * An express middleware used to require users to be authenticated before they can visit a page.
 * It will redirect them back to the page once they are authenticated.
 */
export const requireAuth = () => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.session.lastURL = req.url;

    for (const authReq of authReqs) {
      if(authReq.req(req, res)) return;
    }

    next();
  };
};

/**
 * An express middleware that captures the current state of the authenticator chain, and uses that to make sure users are authenticated before accessing a resource.
 * This is useful if an authenticator wants users to complete some action after actually logging in. Using this (along with the correct priority) before an authenticator
 * is registered can make your page only accessible to visitors who are logged in, but will not require them to complete some action before being able to complete the same
 * action (which `requireAuth` will do). This should only be used for authenticators.
 */
export const requireCurrentAuth = () => {
  const reqs = Object.assign([], authReqs);

  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.session.lastURL = req.url;

    for (const authReq of reqs) {
      if(authReq.req(req, res)) return;
    }

    next();
  };
};