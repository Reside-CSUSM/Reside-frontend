import React from "react";
import Heading from "../Heading";
import AvatarCard from "../AvatarCard";

const ResideTeam = () => {
  return (
    <>
      <Heading
        title="Meet the Reside team"
        className="text-neutral-200 mb-20"
      />

      <div className="space-y-8 md:space-y-0 flex flex-row flex-wrap items-center justify-center gap-6 mb-40">
        <AvatarCard
          hostName="Jaedon"
          location="Oceanside, CA"
          language="English"
          role="Fullstack Developer"
        />
        <AvatarCard
          hostName="Yashaswi"
          location="San Diego, CA"
          language="English"
          role="Backend Developer"
        />
        <AvatarCard
          hostName="Gabriel"
          location="Somewhere, CA"
          language="English & Spanish"
          role="Backend Developer"
        />
      </div>
    </>
  );
};

export default ResideTeam;
