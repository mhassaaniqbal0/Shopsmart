import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import PriceChart from "../components/PriceChart";


export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Simulate fetching product by ID
    setProduct({
      id: "1",
      name: "iPhone 13",
      image: "https://i.imgur.com/iphone.jpg",
      platformPrices: [
        { platform: "Daraz", price: "Rs 220,000", link: "#",rating:4.5, deliveryTime:"2 days", stockAvailable:true },
        { platform: "OLX", price: "Rs 215,000", link: "#",rating:5, deliveryTime:"2 days", stockAvailable:true },
      ],
      description: "Latest Apple iPhone 13 with A15 Bionic chip.",
      summary: "The iPhone 13 is the latest smartphone from Apple.",
    });
  }, [id]);

  if (!product) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-8">
<img
  src={product.image}
  alt={product.name}
  className="w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto rounded shadow"
/>

 <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <ul className="mb-4">
            {product.platformPrices.map((p) => (
              <li key={p.platform}>
                <span className="font-medium">{p.platform}:</span> {p.price}
              </li>
            ))}
          </ul>

          {/* Placeholder AI Price Prediction */}
          <div className="mt-4 text-green-600 font-semibold">
            ✅ AI Suggestion: Best time to buy now!
          </div>
        </div>
      </div>

      {/* Price Chart Placeholder */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Price History</h2>
        <PriceChart />
      </div>

      {/* Reviews */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        
      </div>
    </div>
  );
}
