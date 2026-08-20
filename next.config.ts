import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",

  async redirects() {
    return [
      // The T2 briefly lived at its own route while the root was an editorial
      // portal. The root is the T2 experience again, so anything that linked to
      // /jetour-t2 in the meantime lands in the right place.
      { source: "/jetour-t2", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
