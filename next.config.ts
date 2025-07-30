import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "files.edgestore.dev",
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  }
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
