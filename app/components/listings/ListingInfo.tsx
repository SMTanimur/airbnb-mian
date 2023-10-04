'use client';

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import useCountries from "@/app/hooks/useCountries";
import { IUser, SafeUser } from "@/app/types";
import { GrGroup } from "react-icons/gr";
import { MdOutlineBedroomParent } from "react-icons/md";
import { FaShower } from "react-icons/fa";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";

const Map = dynamic(() => import('../Map'), { 
  ssr: false 
});

interface ListingInfoProps {
  user: IUser,
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng

  return ( 
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div 
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.avatar} />
        </div>
        <div
                    className="
                        flex
                        flex-row
                        items-center
                        gap-4
                        font-light
                        text-neutral-800
                        justify-between
                    "
                >
                    <div className="flex flex-row gap-3 items-center justify-center py-6 border rounded-xl border-neutral-300 flex-grow">
                        <GrGroup size={24} />
                        {guestCount} {guestCount > 1 ? 'guests' : 'guest'}
                    </div>
                    <div className="flex flex-row gap-3 items-center justify-center py-6 border rounded-xl border-neutral-300 flex-grow">
                        <MdOutlineBedroomParent size={24} />
                        {roomCount} {roomCount > 1 ? 'rooms' : 'room'}
                    </div>
                    <div className="flex flex-row gap-3 items-center justify-center py-6 border rounded-xl border-neutral-300 flex-grow">
                        <FaShower size={24} />
                        {bathroomCount} {bathroomCount > 1 ? 'bathrooms' : 'bathroom'}
                    </div>
                </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon} 
          label={category?.label}
          description={category?.description} 
        />
      )}
      <hr />
      <div className="
      text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr />
      <Map center={coordinates} />
    </div>
   );
}
 
export default ListingInfo;