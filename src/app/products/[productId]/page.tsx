'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { MOCK_PRODUCTS } from '@/data/products';
import { Product } from '@/types/product';

interface ProductDetailsPageProps {
  params: Promise<{
    productId: string;
  }>;
}

function ProductDetailsContent({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'shipping' | 'returns'>('description');

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Math.max(1, parseInt(e.target.value) || 1));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="px-4 py-3 border-b border-gray-200 sm:px-6 sm:py-4">
        <div className="max-w-7xl mx-auto text-sm text-gray-600 flex items-center overflow-hidden">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span className="mx-2 shrink-0">/</span>
          <Link href="/products" className="hover:text-black transition-colors">
            Products
          </Link>
          <span className="mx-2 shrink-0">/</span>
          <span className="truncate">{product.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-8 sm:px-6 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Left: Product Image Gallery */}
            <div className="flex flex-col gap-4">
              {/* Main Image */}
              <div className="bg-gray-100 rounded aspect-[4/5] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Gallery */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {product.images.map((image, idx) => (
                    <button
                      key={idx}
                      className="w-16 h-20 shrink-0 bg-gray-100 rounded border-2 border-transparent hover:border-black transition-colors overflow-hidden sm:h-24 sm:w-20"
                    >
                      <img src={image} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Information */}
            <div className="flex flex-col gap-6 md:gap-8">
              {/* Category and Title */}
              <div>
                <p className="text-sm text-gray-600 uppercase tracking-wide mb-2">{product.category}</p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-black mb-4">
                  {product.name}
                </h1>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-3 flex-wrap">
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
                    <span className="text-xs sm:text-sm text-gray-600">
                      {product.rating} • {product.reviewCount} reviews
                    </span>
                  </div>
                )}
              </div>

              {/* Price Section */}
              <div className="flex flex-wrap items-baseline gap-3 sm:gap-4 border-b border-gray-200 pb-6">
                <span className="text-2xl sm:text-3xl font-semibold text-black">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg sm:text-xl text-gray-500 line-through">${product.originalPrice}</span>
                    {discountPercentage > 0 && (
                      <span className="text-base sm:text-lg text-red-600 font-medium">Save {discountPercentage}%</span>
                    )}
                  </>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-black mb-4">Color</label>
                  <div className="flex gap-3 flex-wrap">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`min-w-24 flex-1 rounded border-2 px-4 py-3 text-sm font-medium transition-all sm:flex-none sm:px-5 ${
                          selectedColor === color
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 text-gray-700 hover:border-black'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-semibold text-black mb-4">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  max="999"
                  className="w-24 px-4 py-2 border border-gray-300 rounded text-center font-medium"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 flex-col sm:flex-row">
                <button className="flex-1 bg-black text-white py-3 sm:py-4 rounded font-semibold text-base sm:text-lg hover:bg-gray-800 transition-colors">
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsInWishlist(!isInWishlist)}
                  className={`flex-1 py-3 sm:py-4 rounded font-semibold text-base sm:text-lg border-2 transition-all ${
                    isInWishlist
                      ? 'bg-red-50 border-red-500 text-red-600 hover:bg-red-100'
                      : 'border-gray-300 text-gray-700 hover:border-black'
                  }`}
                >
                  {isInWishlist ? '♥ Wishlisted' : 'Add to Wishlist'}
                </button>
              </div>

              {/* Additional Info */}
              <div className="bg-gray-50 rounded p-4 text-sm text-gray-700 space-y-2">
                <p>✓ Free shipping on orders over $100</p>
                <p>✓ 30-day return policy</p>
                <p>✓ Premium packaging</p>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-10 border-t border-gray-200 pt-8 md:mt-16 md:pt-12">
            {/* Tab Navigation */}
            <div className="flex gap-6 border-b border-gray-200 mb-6 overflow-x-auto md:gap-8 md:mb-8">
              {(['description', 'specs', 'shipping', 'returns'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'text-black border-black'
                      : 'text-gray-600 border-transparent hover:text-black'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="max-w-2xl">
              {activeTab === 'description' && (
                <div className="space-y-4 text-gray-700">
                  <p>{product.description}</p>
                  <p>
                    This is a premium product crafted with attention to detail and using the finest materials.
                    Perfect for those who appreciate quality and timeless design.
                  </p>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-black mb-2">Composition</h4>
                    <p className="text-gray-700">100% Premium Material</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-2">Available Sizes</h4>
                    <p className="text-gray-700">XS, S, M, L, XL, XXL</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-2">Care Instructions</h4>
                    <p className="text-gray-700">Dry clean or gentle wash. Do not bleach.</p>
                  </div>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-4 text-gray-700">
                  <p>
                    <strong>Standard Shipping:</strong> Free on orders over $100 • 5-7 business days
                  </p>
                  <p>
                    <strong>Express Shipping:</strong> $15 • 2-3 business days
                  </p>
                  <p>
                    <strong>International:</strong> Rates vary by location • 10-14 business days
                  </p>
                </div>
              )}

              {activeTab === 'returns' && (
                <div className="space-y-4 text-gray-700">
                  <p>
                    We offer a 30-day return policy for all items purchased. Items must be unworn, unwashed,
                    and in original packaging.
                  </p>
                  <p>
                    To initiate a return, please contact our customer service team with your order number.
                  </p>
                  <p>
                    Return shipping is free for defective items. For other returns, return shipping costs
                    may apply.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { productId } = use(params);
  const product = MOCK_PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-serif font-semibold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/products" className="text-black font-medium hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return <ProductDetailsContent product={product} />;
}
