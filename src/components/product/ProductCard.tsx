'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';
import { ProductBadge } from './ProductBadge';
import { WishlistButton } from './WishlistButton';
import { QuickViewButton, QuickViewModal } from './QuickViewModal';

interface ProductCardProps {
  product: Product;
  onWishlistToggle?: (productId: string, isWishlisted: boolean) => void;
}

export function ProductCard({ product, onWishlistToggle }: ProductCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <Link href={`/products/${product.id}`} className="block h-full">
        <div className="group cursor-pointer flex flex-col h-full">
          {/* Image Container */}
          <div className="relative bg-gray-100 rounded border border-gray-200 overflow-hidden mb-3 sm:mb-4">
            <div className="aspect-[4/5] relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <ProductBadge badge={product.badge} />
              <WishlistButton productId={product.id} onToggle={onWishlistToggle} />
              <QuickViewButton onClick={() => setIsQuickViewOpen(true)} />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-2 flex-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</p>
            <h3 className="text-sm sm:text-base font-serif font-semibold text-black leading-snug">
              {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-baseline gap-2 mt-auto pt-2">
              <span className="text-base sm:text-lg font-semibold text-black">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xs sm:text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  {discountPercentage > 0 && (
                    <span className="text-xs text-red-600 font-medium">-{discountPercentage}%</span>
                  )}
                </>
              )}
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 pt-2 border-t border-gray-200 mt-2">
                <div className="flex text-yellow-400 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating!) ? 'fill-current' : 'fill-gray-300'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-600">({product.reviewCount})</span>
              </div>
            )}
          </div>
        </div>
      </Link>

      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
