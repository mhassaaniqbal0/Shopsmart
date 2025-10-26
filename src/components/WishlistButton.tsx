import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

type WishlistButtonProps = {
  productId: string;
  lastKnownPrice?: number;
  targetPrice?: number | null;
};

const WishlistButton: React.FC<WishlistButtonProps> = ({
  productId,
  lastKnownPrice,
  targetPrice = null,
}) => {
  const [isInWishlist, setIsInWishlist] = useState<any>(false);
  const [loading, setLoading] = useState(false);

  // 🔍 Check if product is already in wishlist
  useEffect(() => {
    const checkWishlistStatus = async () => {
      try {
        const res = await axios.get(`/wishlist/check/${productId}`);
        console.log('get wishlist response', res);
        // setIsInWishlist(res.data ? true: false);
      } catch (err) {
        console.error("Error checking wishlist:", err);
      }
    };
    checkWishlistStatus();
  }, [productId]);

  // ❤️ Toggle wishlist (add/remove)
  const handleToggleWishlist = async () => {
    console.log('calling add to wishlist api');
    try {
      setLoading(true);
      if (isInWishlist) {
        await axios.delete(`/wishlist/remove/${productId}`);
        toast.success("Removed from Wishlist");
        setIsInWishlist(false);
      } else {
        await axios.post(`/wishlist/add`, {
          productId,
          lastKnownPrice,
          targetPrice,
        });
        toast.success("Added to Wishlist ❤️");
        setIsInWishlist(true);
      }
    } catch (err: any) {
      console.error("Wishlist toggle error:", err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleWishlist}
      disabled={loading}
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all 
      ${
        isInWishlist
          ? "bg-pink-500 text-white hover:bg-pink-600"
          : "bg-gray-100 text-gray-700 hover:bg-pink-100 hover:text-pink-600"
      }`}
    >
      <Heart
        className={`h-4 w-4 transition-transform ${
          isInWishlist ? "fill-white scale-110" : "stroke-pink-600"
        }`}
      />
      {loading ? "Please wait..." : isInWishlist ? "Wishlisted" : "Add to Wishlist"}
    </button>
  );
};

export default WishlistButton;
