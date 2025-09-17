export default function Recommendations() {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 bg-pink-50 p-6 rounded-lg shadow">
      {[
        { label: "💡 Best Value", text: "iPhone 13 from OLX - Rs. 215,000" },
        { label: "⚡ Fastest Delivery", text: "Galaxy S22 from Daraz - 1 Day" },
        { label: "💰 Budget Pick", text: "Infinix Zero 30 - Rs. 63,000" },
      ].map((rec) => (
        <div key={rec.label} className="bg-white border rounded-lg p-4">
          <h3 className="text-pink-700 font-bold mb-1">{rec.label}</h3>
          <p className="text-sm text-gray-700">{rec.text}</p>
        </div>
      ))}
    </div>
  );
}
