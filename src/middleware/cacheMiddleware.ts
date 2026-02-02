import cache from "memory-cache"
import type {RequestHandler} from "express"

export const cacheMiddleware = (duration: number): RequestHandler => {
    return (req, res, next) => {
        const userId = req.user?.id;
        const key = `__express__${userId}_${req.originalUrl || req.url}`;
        const cachedBody = cache.get(key);

        if (cachedBody) {
            res.send(cachedBody) // return cached response instantly  
        } else {
            // override res.send 
            const originalSend = res.send.bind(res)

            res.send = (body: string | Buffer | object) => {
                cache.put(key, body, duration)
                return originalSend(body)
            }
            next() // proceeds to next middleware
        }
    }
}
