/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    localPatterns: [
      {
        pathname: "/assets/**",
        search: ""
      },
      {
        pathname: "/images/**",
        search: ""
      }
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**"
      }
    ]
  },
  async redirects() {
    return [
      {
        source: "/services/academic-editing",
        destination: "/academic-proofreading",
        permanent: true,
      },
      {
        source: "/services/express-service",
        destination: "/proofreading-services",
        permanent: true,
      },
      {
        source: "/services/non-academic-editing",
        destination: "/business-proofreading",
        permanent: true,
      },
      {
        source: "/services/manuscript-formatting",
        destination: "/manuscript-editing",
        permanent: true,
      },
      {
        source: "/services/translation",
        destination: "/translation-review",
        permanent: true,
      },
      {
        source: "/services/writing-support",
        destination: "/editing-services",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "editandproofread.com" }],
        destination: "https://www.editandproofread.com/:path*",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/terms-and-conditions",
        destination: "/terms",
        permanent: true,
      },
    ];
  },
  async headers() {
    const noIndexRoutes = [
      "/admin/:path*",
      "/api/:path*",
      "/auth/:path*",
      "/dashboard/:path*",
      "/forgot-password",
      "/login",
      "/indexnow-key",
      "/reset-password",
      "/signup",
    ];

    return [
      ...noIndexRoutes.map((source) => ({
        source,
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      })),
      {
        source: "/api/examples",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, max-age=0, must-revalidate",
          },
          {
            key: "CDN-Cache-Control",
            value: "no-store",
          },
          {
            key: "Vercel-CDN-Cache-Control",
            value: "no-store",
          },
          {
            key: "Surrogate-Control",
            value: "no-store",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
        ],
      },
      {
        source: "/api/admin/examples",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, max-age=0, must-revalidate",
          },
          {
            key: "CDN-Cache-Control",
            value: "no-store",
          },
          {
            key: "Vercel-CDN-Cache-Control",
            value: "no-store",
          },
          {
            key: "Surrogate-Control",
            value: "no-store",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://embed.tawk.to https://*.tawk.to https://challenges.cloudflare.com https://js.stripe.com https://checkout.flutterwave.com https://js.paystack.co https://www.paypal.com https://www.paypalobjects.com; style-src 'self' 'unsafe-inline' https://embed.tawk.to https://*.tawk.to; img-src 'self' data: blob: https://images.unsplash.com https://upload.wikimedia.org https://embed.tawk.to https://*.tawk.to https://www.paypalobjects.com; media-src 'self' https://pub-9f4f9c9b1b3e477aba4991ccfd92f1ae.r2.dev; font-src 'self' data: https://embed.tawk.to https://*.tawk.to; connect-src 'self' https://*.supabase.co wss://*.supabase.co https://embed.tawk.to https://*.tawk.to wss://*.tawk.to https://challenges.cloudflare.com https://api.stripe.com https://checkout.flutterwave.com https://api.paystack.co https://www.paypal.com; frame-src 'self' https://challenges.cloudflare.com https://js.stripe.com https://checkout.flutterwave.com https://js.paystack.co https://www.paypal.com https://www.sandbox.paypal.com https://embed.tawk.to https://*.tawk.to; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
