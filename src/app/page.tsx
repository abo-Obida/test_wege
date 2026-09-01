import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4 sm:px-6">
          <div className="font-serif font-semibold text-xl">Studio</div>
          <div className="order-3 flex w-full justify-center gap-6 sm:order-none sm:w-auto sm:gap-8">
            <Link href="/" className="text-sm font-medium hover:text-gray-600">
              Home
            </Link>
            <Link href="/products" className="text-sm font-medium hover:text-gray-600">
              Products
            </Link>
          </div>
          <div className="flex gap-3 sm:gap-4">
            <button className="text-sm font-medium hover:text-gray-600">Search</button>
            <button className="text-sm font-medium hover:text-gray-600">Cart</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white px-4 py-14 sm:px-6 sm:py-20">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold mb-5 sm:mb-6 text-black">
            Premium Fashion & Apparel
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 leading-relaxed">
            Discover our curated collection of timeless pieces crafted with attention to detail and the finest materials.
          </p>
          <Link
            href="/products"
            className="inline-block w-full bg-black text-white px-8 py-3 sm:py-4 rounded font-medium hover:bg-gray-800 transition-colors text-base sm:w-auto sm:text-lg"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 gap-8 sm:px-6 sm:py-12 md:grid-cols-4">
          <div>
            <h3 className="font-serif font-semibold mb-4">Studio</h3>
            <p className="text-sm text-gray-600">Premium fashion and apparel for the modern lifestyle.</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/products" className="hover:text-black">Products</Link></li>
              <li><Link href="/products" className="hover:text-black">Collections</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black">Contact</a></li>
              <li><a href="#" className="hover:text-black">Shipping</a></li>
              <li><a href="#" className="hover:text-black">Returns</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black">Privacy</a></li>
              <li><a href="#" className="hover:text-black">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-6 text-center text-sm text-gray-600 sm:px-6">
          © 2024 Studio. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
