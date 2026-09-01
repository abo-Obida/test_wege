'use client';

import { Product } from '@/types/product';

interface QuickViewButtonProps {
  onClick: () => void;
}

export function QuickViewButton({ onClick }: QuickViewButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className="absolute bottom-0 left-0 right-0 z-20 bg-black py-3 text-sm font-medium text-white opacity-100 transition-all duration-300 hover:bg-gray-800 sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
    >
      Quick View
    </button>
  );
}

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div
        className="bg-white rounded-t-lg max-w-2xl w-full max-h-[92vh] overflow-y-auto sm:rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-serif font-semibold">Quick View</h2>
          <button
            onClick={onClose}
            aria-label="Close quick view"
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-5 p-4 sm:gap-8 sm:p-8 md:grid-cols-2">
          {/* Image */}
          <div className="bg-gray-100 rounded aspect-[4/5] flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-5 sm:gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              <h3 className="text-xl sm:text-2xl font-serif font-semibold mb-2">{product.name}</h3>
              {product.rating && (
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating!) ? 'fill-current' : 'fill-gray-300'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-xl sm:text-2xl font-semibold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-base sm:text-lg text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-3">Color</p>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className="flex-1 rounded border border-gray-300 px-4 py-2 text-sm transition-colors hover:border-black sm:flex-none"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <p className="text-sm font-medium mb-3">Quantity</p>
              <input
                type="number"
                defaultValue="1"
                min="1"
                className="w-20 px-3 py-2 border border-gray-300 rounded text-center"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:pt-4">
              <button className="flex-1 bg-black text-white py-3 rounded font-medium hover:bg-gray-800 transition-colors">
                Add to Cart
              </button>
              <button className="flex-1 border border-black text-black py-3 rounded font-medium hover:bg-gray-50 transition-colors">
                View Full Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
