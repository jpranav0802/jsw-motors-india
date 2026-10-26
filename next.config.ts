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
      // News and guides now live together on one hub.
      { source: "/news", destination: "/guides", permanent: true },
      // The T2 is sold in India as the Combat, so its spec sheet moved with the name.
      { source: "/T2/specification", destination: "/combat/specification", permanent: true },
    ];
  },
};

export default nextConfig;
