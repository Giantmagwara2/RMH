
export const securityMiddleware = (req, res, next) => {
  // Security Headers

  // Prevents browsers from sniffing a response away from the declared Content-Type.
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Prevents clickjacking attacks by forbidding the page from being rendered in an iframe.
  res.setHeader('X-Frame-Options', 'DENY');

  // X-XSS-Protection is largely obsolete in modern browsers with built-in protections.
  // It's generally safe to remove it.
  // res.setHeader('X-XSS-Protection', '1; mode=block');

  // Enforces secure (HTTPS) connections to the server.
  // max-age is the duration the browser should remember this policy (1 year).
  // includeSubDomains applies the policy to all subdomains.
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  // Controls which origins can load resources (scripts, styles, images, etc.).
  // This is a stricter example. You may need to adjust based on your actual resource loading (CDNs, etc.).
  // Note: 'unsafe-eval' might be needed for development (e.g., Vite HMR), but should be removed in production.
  // 'unsafe-inline' for styles is also generally discouraged; prefer external stylesheets or hashes/nonces.
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self';");

  // Controls how much referrer information is included with HTTP requests.
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade'); // Or 'strict-origin-when-cross-origin'

  // Controls browser features available to the page and its iframes (e.g., camera, microphone).
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()'); // Example: disable camera, mic, geo

  // Controls cross-domain policies for technologies like Flash or Silverlight (less common now).
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');

  next();
};
