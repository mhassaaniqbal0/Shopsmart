import { type Product } from "../types/Product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="cursor-pointer border rounded-lg p-4 shadow hover:shadow-lg transition bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-32 h-32 object-contain mx-auto mb-4"
      />
      <h3 className="text-lg font-bold text-center mb-2">{product.name}</h3>
      <ul className="text-sm space-y-1">
        {product?.platformPrices.map((p) => (
          <li key={p.platform} className="flex justify-between">
            <span className="text-gray-600">{p.platform}:</span>
            <span className="font-medium text-blue-600">{p.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
