'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MOCK_PRODUCTS } from '@/data/products';
import { ProductGrid } from '@/components/product/ProductGrid';

type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high';

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  const handleSort = (newSort: SortOption) => {
    setSortBy(newSort);
    let sorted = [...MOCK_PRODUCTS];

    switch (newSort) {
      case 'newest':
        sorted = sorted.reverse();
        break;
      case 'price-low':
        sorted = sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted = sorted.sort((a, b) => b.price - a.price);
        break;
      case 'featured':
      default:
        sorted = MOCK_PRODUCTS;
    }

    setProducts(sorted);
  };

  const handleWishlistToggle = (productId: string, isWishlisted: boolean) => {
    console.log(`Product ${productId} ${isWishlisted ? 'added to' : 'removed from'} wishlist`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="px-4 py-10 border-b border-gray-200 sm:px-6 sm:py-14 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-600 mb-6 font-sans sm:mb-8">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span>Products</span>
          </div>

          {/* Title Section */}
          <div className="mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-black mb-3 sm:mb-4 text-center">
              Products
            </h1>
            <p className="text-center text-gray-600 text-base md:text-lg">
              {products.length} products
            </p>
          </div>

          {/* Sort Control */}
          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:justify-end sm:items-center sm:gap-4">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => handleSort(e.target.value as SortOption)}
              className="w-full px-4 py-3 border border-gray-300 rounded bg-white text-sm font-medium hover:border-black transition-colors cursor-pointer sm:w-auto sm:py-2"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 py-8 sm:px-6 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <ProductGrid products={products} onWishlistToggle={handleWishlistToggle} />
        </div>
      </div>
    </div>
  );
}
