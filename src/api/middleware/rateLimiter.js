import rateLimit from 'express-rate-limit';

/**
 * Basic API rate limiter.
 * Limits requests from the same IP address.
 */
export const apiLimiter = rateLimit({
  // Time window for which requests are checked/remembered.
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds

  // Max number of connections during windowMs.
  // Each IP is limited to `max` requests per `windowMs`.
  max: 100,

  // Return rate limit info in the `RateLimit-*` headers.
  standardHeaders: true,

  // Disable the `X-RateLimit-*` headers.
  legacyHeaders: false,

  // Message to return when the limit is exceeded.
  // Can also be a function or a JSON object.
  // message: 'Too many requests from this IP, please try again after 15 minutes',

  // Custom handler function when the rate limit is exceeded.
  handler: (req, res, next, options) => {
    console.warn(`Rate limit exceeded for IP: ${req.ip}. Path: ${req.path}`);
    res.status(options.statusCode).json({
      status: 'error',
      message: options.message, // Uses the message defined below or the default from the library
    });
  },
  message: 'Too many requests from this IP, please try again later.',

  // store: // Configure a store for use in distributed environments (e.g., RedisStore). Defaults to MemoryStore.
  // keyGenerator: // Custom function to generate keys (e.g., based on user ID if authenticated). Defaults to IP address.
  // skip: // Function to skip rate limiting for certain requests.
});
