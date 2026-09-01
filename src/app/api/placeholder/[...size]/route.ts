interface PlaceholderRouteContext {
  params: Promise<{
    size?: string[];
  }>;
}

const clampDimension = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(Math.max(Math.round(parsed), 64), 1600);
};

export async function GET(_request: Request, { params }: PlaceholderRouteContext) {
  const { size = [] } = await params;
  const width = clampDimension(size[0], 400);
  const height = clampDimension(size[1], 500);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Product image placeholder">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#f4f1ea"/>
          <stop offset="1" stop-color="#d9d2c3"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <rect x="${width * 0.16}" y="${height * 0.16}" width="${width * 0.68}" height="${height * 0.68}" rx="8" fill="#ffffff" fill-opacity="0.36" stroke="#9b8b5c" stroke-opacity="0.35"/>
      <text x="50%" y="48%" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.max(18, Math.round(width * 0.08))}" font-weight="700" fill="#171717">Studio</text>
      <text x="50%" y="57%" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.max(12, Math.round(width * 0.035))}" fill="#4a5565">${width} x ${height}</text>
    </svg>
  `.trim();

  return new Response(svg, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": "image/svg+xml",
    },
  });
}
