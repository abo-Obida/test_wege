'use client';

import { useState } from 'react';

interface WishlistButtonProps {
  productId: string;
  onToggle?: (productId: string, isWishlisted: boolean) => void;
}

export function WishlistButton({ productId, onToggle }: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = !isWishlisted;
    setIsWishlisted(newState);
    onToggle?.(productId, newState);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      className="absolute top-2 right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-shadow hover:shadow-lg group/wishlist sm:top-4 sm:right-4"
    >
      <svg
        className={`w-5 h-5 transition-colors ${
          isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover/wishlist:text-gray-600'
        }`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
