

const priceData = [
  {
    platform: "Daraz",
    price: "Rs. 249,999",
    rating: 4.7,
    delivery: "2–4 days",
    sellerRating: 4.8,
    link: "#",
    iconColor: "bg-orange-500",
    label: "D",
  },
  {
    platform: "Temu",
    price: "Rs. 239,999",
    rating: 4.5,
    delivery: "3–5 days",
    sellerRating: 4.3,
    link: "#",
    iconColor: "bg-red-500",
    label: "T",
  },
  {
    platform: "OLX",
    price: "Rs. 199,999",
    rating: 4.2,
    delivery: "Pickup",
    sellerRating: 3.9,
    link: "#",
    iconColor: "bg-blue-500",
    label: "O",
  },
];

export default function PriceComparisonTable() {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Price Comparison</h2>
      <table className="min-w-full border-separate border-spacing-y-2">
        <thead className="text-left text-sm text-gray-600">
          <tr>
            <th>Platform</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Delivery Time</th>
            <th>Seller Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {priceData.map((item, idx) => (
            <tr key={idx} className="text-sm text-gray-800 bg-gray-50 rounded-lg">
              <td className="flex items-center gap-2 py-2">
                <span className={`text-white font-bold rounded-full w-6 h-6 flex items-center justify-center ${item.iconColor}`}>
                  {item.label}
                </span>
                {item.platform}
              </td>
              <td className="font-bold">{item.price}</td>
              <td>⭐ {item.rating}</td>
              <td>{item.delivery}</td>
              <td>⭐ {item.sellerRating}</td>
              <td>
                <a
                  href={item.link}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs"
                >
                  Visit Store
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
