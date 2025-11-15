export const AppError = {
  Unavailable: "Unavailable",
  Unknown: "Unknown",
  Unauthorized: "Unauthorized",
  Forbidden: "Forbidden",
  NotFound: "NotFound",
} as const;

export type AppError = (typeof AppError)[keyof typeof AppError];
