"use server";

import { auth } from "@/auth";
import { RentCastListing } from "@/types/RentCastListing";
import getListingById from "./getListingById";
import { db } from "@/lib/db";
import {
  sendRoommateInterestEmail,
  sendWatchlistConfirmationEmail,
} from "@/lib/mail";
import { getUserById } from "@/data/user";

export const getWatchlist = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user || !session) return null;

  const data = await db.user.findFirst({
    where: { id: user.id },
    select: {
      watchlist: true,
    },
  });

  let watchlist: RentCastListing[] = [];

  for (const listingId of data?.watchlist || []) {
    const newListing: RentCastListing = await getListingById({ listingId });
    watchlist.push(newListing);
  }

  return watchlist;
};

export const getFromWatchlist = async (listingId: string) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !session) return null;

  const listingFound = db.user.findFirst({
    where: { id: user.id, watchlist: { hasEvery: [listingId] } },
  });

  console.log("LISTING FOUND FROM WATCHLIST?", listingFound);

  return listingFound;
};

export const addToWatchlist = async (listingId: string) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !session) return;

  console.log(
    "ADDING TO WATCHLIST FOR USER ",
    user.id,
    " ON LISTING ",
    listingId
  );

  let watchlistIds = [...(user.watchlist || [])];
  watchlistIds.push(listingId);
  await db.user.update({
    where: { id: user.id },
    data: { watchlist: watchlistIds },
  });

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Send post request to delete user from viewBy array on listing
  const response = await fetch(
    `https://image-service-pi.vercel.app/addUserFavoriteListing?listingId=${listingId}&userId=${user?.id}`,
    requestOptions
  );

  console.log(response);

  const listing: RentCastListing = await getListingById({ listingId });

  // TODO: Check whether or not user has disabled recieving emails
  if (user) {
    sendWatchlistConfirmationEmail(
      user.email as string,
      listing.body.formattedAddress
    );
  }

  if (listing.viewedBy.length > 1) {
    let userEmails: string[] = [];
    console.log("SENDING ROOMMATE INTEREST EMAIL TO: ", ...userEmails);

    for (const userId of listing.viewedBy) {
      const currentUser = await getUserById(userId);
      if (currentUser) {
        userEmails.push(currentUser.email as string);
      }
    }

    sendRoommateInterestEmail(
      userEmails,
      listing.id,
      listing.body.formattedAddress
    );
  }

  return {
    success:
      "Listing added to watchlist! You are now listening for potential roommates!",
  };
};

export const removeFromWatchlist = async (listingId: string) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !session) return;

  console.log(
    "REMOVING FROM WATCHLIST FOR USER ",
    user.id,
    " ON LISTING ",
    listingId
  );

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Send post request to delete user from viewBy array on listing
  const response = await fetch(
    `https://image-service-pi.vercel.app/deleteUserFavoriteListing?listingId=${listingId}&userId=${user?.id}`,
    requestOptions
  );

  console.log(response);

  let watchlistIds = [...(user.watchlist || [])];
  watchlistIds = watchlistIds.filter((id) => id !== listingId);
  await db.user.update({
    where: { id: user.id },
    data: { watchlist: watchlistIds },
  });

  return { success: "Removed from watchlist!" };
};
