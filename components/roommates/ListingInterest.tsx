"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { Button } from "../ui/button";
import { IoMdPerson } from "react-icons/io";
import { ScrollArea } from "../ui/scroll-area";
import Seperator from "../Seperator";
import useWatchlist from "@/hooks/useWatchlist";
import { getUserEmails } from "@/actions/getUserEmails";
import { RentCastListing } from "@/types/RentCastListing";

const fadeInAnimationVariants = {
  initial: { opacity: 0, y: 100 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * index },
  }),
};

interface ListingInterestProps {
  images?: string[];
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFootage?: number;
  address: string;
  listingId: string;
  setClientListings: React.Dispatch<React.SetStateAction<any>>;
}

const ListingInterest: React.FC<ListingInterestProps> = ({
  images = [],
  price = 0,
  bedrooms = 1,
  bathrooms = 1,
  squareFootage = 0,
  address = "No Address",
  listingId,
  setClientListings,
}) => {
  const { toggleWatchlist } = useWatchlist({ listingId });
  const [userEmails, setUserEmails] = useState<string[]>([]);

  const handleUnsubscribe = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await toggleWatchlist(e);

      // Update client listings state
      setClientListings((prevListings: RentCastListing[]) =>
        prevListings.filter(
          (listing: RentCastListing) => listing.id !== listingId
        )
      );
    } catch (error) {
      console.error("Error toggling watchlist:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const emails = await getUserEmails(listingId);
        setUserEmails(emails);
      } catch (error) {
        console.error("Error fetching user emails:", error);
      }
    };

    fetchData();
  }, [listingId]);

  return (
    <motion.li
      className="relative list-item shadow-lg rounded-xl w-full"
      variants={fadeInAnimationVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <div className="h-full bg-[#3a3838] rounded-lg p-2 flex flex-row items-center gap-3">
        <div className="min-h-full hidden lg:block">
          <a href={`/listings/${listingId}`} target="_blank">
            <Image
              src={images[0]}
              alt="Roommate Listing"
              width={200}
              height={100}
              className="rounded-lg"
            />
          </a>
        </div>
        <div className="p-2 pb-4 truncate">
          <div>
            <span className="font-bold text-2xl text-neutral-300">
              ${price.toLocaleString()}/mo
            </span>
          </div>
          <div className="text-neutral-400 text-xl">
            {bedrooms} bds | {bathrooms} ba | {squareFootage.toLocaleString()}{" "}
            sqft
          </div>
          <div className="text-neutral-400 truncate text-xl">{address}</div>
        </div>
        <div className="ml-auto relative mr-2">
          <div className="flex flex-col gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="flex flex-row gap-2 items-center hover:bg-neutral-700 justify-center text-white bg-transparent border-neutral-500 border font-bold text-2xl rounded-lg p-1 py-6">
                  <IoMdPerson size={30} /> {userEmails?.length || 1}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="gap-4 bg-neutral-700 border-0 overflow-y-scroll h-[300px]">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none text-neutral-100">
                    Potential Roommates
                  </h4>
                  <p className="text-sm text-neutral-400">
                    Other students currently interested for roommates at this
                    listing.
                  </p>
                </div>
                <ScrollArea>
                  <div className="py-4">
                    <h4 className="mb-4 text-sm font-medium leading-none text-neutral-100">
                      Emails
                    </h4>
                    {userEmails && userEmails.length > 1 ? (
                      userEmails.map((email) => (
                        <>
                          <div key={email} className="text-sm text-neutral-400">
                            {email}
                          </div>
                          <Seperator className="my-2 bg-transparent" />
                        </>
                      ))
                    ) : (
                      <p className="text-destructive text-sm">
                        You are the only one watching this listing
                      </p>
                    )}
                  </div>
                </ScrollArea>
              </PopoverContent>
            </Popover>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="ml-auto bg-destructive hover:bg-destructive/80">
                  Unsubscribe
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-neutral-700 border-0">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-neutral-100">
                    Remove from watchlist?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-neutral-400">
                    <p>
                      Removing this will remove you from the emailing list
                      involving other students interested in this listing.
                    </p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-neutral-500 hover:bg-neutral-600 text-white border-0 hover:text-neutral-300">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    asChild
                    className="bg-destructive hover:bg-destructive/80 hover:text-neutral-300"
                  >
                    <Button
                      className="w-full sm:!w-32"
                      onClick={(e) => {
                        handleUnsubscribe(e);
                      }}
                    >
                      Unsubscribe
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </motion.li>
  );
};

export default ListingInterest;
