"use client";

import React from "react";
import ListingCard from "./ListingCard";
import { RentCastListing } from "@/types/RentCastListing";

interface GridProps {
  listings: RentCastListing[];
  showNav?: boolean;
  showFullscren?: boolean;
}

export default function Grid({
  listings = [],
  showNav = true,
  showFullscren = true,
}: GridProps) {
  return (
    <ul className="mt-4 grid gap-[12px] grid-cols-auto-fill min-w-[286px] grid-flow-row mb-16">
      {listings?.map((listing, index) => (
        <ListingCard
          key={index}
          address={listing.body.formattedAddress}
          price={listing.body.price}
          bedrooms={listing.body.bedrooms}
          bathrooms={listing.body.bathrooms}
          squareFootage={listing.body.squareFootage}
          images={listing.images}
          listingId={listing.id}
          showFullscreen={showFullscren}
          showNav={showNav}
        />
      ))}
    </ul>
  );
}
