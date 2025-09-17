export default function Footer() {
  return (
    <footer className="bg-skin-100 text-[#1b0e0e] pt-12 pb-6 px-6 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">ShopSmart</h3>
          <p className="text-sm text-[#7a5f5f]">
            Compare prices from Daraz, OLX, Temu & more. Find the best deals, powered by real-time insights and reviews.
          </p>
        </div>

        <div>
          <h4 className="text-md font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-pink-600">Home</a></li>
            <li><a href="/login" className="hover:text-pink-600">Login</a></li>
            <li><a href="/register" className="hover:text-pink-600">Register</a></li>
            <li><a href="#deals" className="hover:text-pink-600">Deals</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-md font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>Email: support@shopsmart.pk</li>
            <li>Phone: 03095276595</li>
            <li>Location: Islamabad, Pakistan</li>
          </ul>
        </div>

        <div>
          <h4 className="text-md font-semibold mb-3">Follow Us</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-pink-600">Instagram</a></li>
            <li><a href="#" className="hover:text-pink-600">Facebook</a></li>
            <li><a href="#" className="hover:text-pink-600">LinkedIn</a></li>
            <li><a href="#" className="hover:text-pink-600">Twitter</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-[#7a5f5f]">
        &copy; {new Date().getFullYear()} ShopSmart. All rights reserved.
      </div>
    </footer>
  );
}
