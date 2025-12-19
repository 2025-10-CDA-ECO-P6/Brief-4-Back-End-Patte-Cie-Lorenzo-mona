import { Request, Response, NextFunction } from "express";

export function roleMiddleware(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      return next({ status: 401, message: "Unauthorized" });
    }

    if (!allowedRoles.includes(user.role)) {
      return next({ status: 403, message: "Forbidden" });
    }

    next();
  };
}
