import React from "react";
import { InfiniteMovingCards } from "../InfiniteMovingCards";

const testimonials = [
  {
    quote:
      "Yeah, I actually stumbled upon Reside last week. It's been a lifesaver! Found a cozy apartment near campus within my budget and preferences.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "Tell me about it! But have you tried Reside? I found this amazing studio downtown through their website, and it's surprisingly affordable!",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote:
      "I totally get it. But Reside made it so much easier for me. Their filters helped narrow down options based on location, price, and amenities. Found my dream apartment without the hassle!",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "That's why I swear by Reside. Their listings are verified, and they have this rating system for landlords. I feel much more secure renting through them.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "You should give Reside a try. They aggregate listings from multiple sources, so you get a comprehensive view of what's available in the area. Saved me so much time.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];

const ScrollingCards = () => {
  return (
    <div className="flex gap-2 w-full items-center justify-center mb-40">
      <InfiniteMovingCards speed="slow" items={testimonials} />
    </div>
  );
};

export default ScrollingCards;
