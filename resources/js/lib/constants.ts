import {
    MdFireplace,
    MdLocalParking,
    MdLocalLaundryService,
    MdFitnessCenter,
    MdApartment,
    MdPool,
    MdWifi,
    MdAccessible,
    MdTv,
    MdMedicalServices,
    MdPets,
    MdHeatPump,
    MdSmokingRooms,
} from "react-icons/md";
import { Cctv, Bus, UtensilsCrossed, AirVent } from "lucide-react";
import { Attribute } from "@/types";

export const attributes: Attribute[] = [
    { name: "Kitchen", category: "Amenities", icon: UtensilsCrossed },
    { name: "Fireplace", category: "Amenities", icon: MdFireplace },
    { name: "Study/Office Nook", category: "Spaces", icon: MdApartment },
    { name: "Parking", category: "Facilities", icon: MdLocalParking },
    { name: "Washer", category: "Amenities", icon: MdLocalLaundryService },
    { name: "Gym", category: "Facilities", icon: MdFitnessCenter },
    { name: "Security", category: "Safety", icon: Cctv },
    { name: "Pool", category: "Facilities", icon: MdPool },
    { name: "Wlan", category: "Amenities", icon: MdWifi },
    { name: "TV", category: "Amenities", icon: MdTv },
    {
        name: "Wheelchair accessible",
        category: "Accessibility",
        icon: MdAccessible,
    },
    { name: "First Aid", category: "Safety", icon: MdMedicalServices },
    { name: "Public Transport", category: "Location", icon: Bus },
    { name: "Pets Allowed", category: "Rules", icon: MdPets },
    { name: "Kid Friendly", category: "Rules", icon: AirVent },
    { name: "Air Conditioning", category: "Amenities", icon: MdHeatPump },
    { name: "Smoking Allowed", category: "Rules", icon: MdSmokingRooms },
];
