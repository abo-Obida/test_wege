'use client';

import { Product } from '@/types/product';

interface ProductBadgeProps {
  badge?: Product['badge'];
}

export function ProductBadge({ badge }: ProductBadgeProps) {
  if (!badge) return null;

  return (
    <span className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs font-semibold tracking-wide sm:top-4 sm:left-4 sm:px-3">
      {badge}
    </span>
  );
}
