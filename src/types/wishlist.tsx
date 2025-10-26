// frontend/src/types/wishlist.tsx
// NOTE: This is a .tsx file (allowed even without JSX). These are plain TypeScript exports
// for your frontend typings.

export type WishlistItem = {
  _id?: string;
  productId: string;
  platform?: string | null;
  lastKnownPrice?: number | null;
  targetPrice?: number | null;
  addedAt?: string | Date;
  notes?: string | null;
};

export type Wishlist = {
  _id: string;
  owner: string; // user id
  title: string;
  description?: string | null;
  isPublic?: boolean;
  sharedToken?: string | null;
  items: WishlistItem[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

// Optional helper types for API responses
export type PaginatedWishlists = {
  data: Wishlist[];
  page?: number;
  pageSize?: number;
  total?: number;
};

export type CreateWishlistPayload = {
  title: string;
  description?: string;
};

export type AddItemPayload = {
  productId: string;
  platform?: string;
  targetPrice?: number | null;
  notes?: string | null;
  lastKnownPrice?: number | null;
};
