import type { Product } from "../types/Product";

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: Props) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/3 object-contain"
          />

          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>

            {product.description && (
              <p className="text-gray-700 mb-4">{product.description}</p>
            )}

            {product.summary && (
              <div className="bg-pink-100 border-l-4 border-pink-500 p-3 mb-4 text-sm text-pink-800 rounded">
                🤖 AI Summary: {product.summary}
              </div>
            )}

            <table className="w-full text-sm border border-collapse">
              <thead>
                <tr className="bg-pink-200 text-left">
                  <th className="p-2 border">Platform</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Rating</th>
                  <th className="p-2 border">Delivery</th>
                  <th className="p-2 border">Stock</th>
                  <th className="p-2 border">Link</th>
                </tr>
              </thead>
              <tbody>
                {product.platformPrices.map((p) => (
                  <tr key={p.platform} className="border-t">
                    <td className="p-2 border">{p.platform}</td>
                    <td className="p-2 border">{p.price}</td>
                    <td className="p-2 border">
                      {p.rating ? `${p.rating} ⭐` : "N/A"}
                    </td>
                    <td className="p-2 border">
                      {p.deliveryTime || "N/A"}
                    </td>
                    <td className="p-2 border">
                      {p.stockAvailable ? "✅ In Stock" : "❌ Out of Stock"}
                    </td>
                    <td className="p-2 border">
                      <a
                        href={p.link}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        Visit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
