import { createLogger } from "logger-safe-security";

export const logger = createLogger({
    service: "webhook",
    logLevel: "debug"
})