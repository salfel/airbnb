import { Attribute } from "@/types";
import { Baby, Bus, Cctv, UtensilsCrossed } from "lucide-react";
import {
	MdAccessible,
	MdApartment,
	MdFireplace,
	MdFitnessCenter,
	MdHeatPump,
	MdLocalLaundryService,
	MdLocalParking,
	MdMedicalServices,
	MdPets,
	MdPool,
	MdSmokingRooms,
	MdTv,
	MdWifi
} from "react-icons/md";

const attributes: Attribute[] = [
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
		icon: MdAccessible
	},
	{ name: "First Aid", category: "Safety", icon: MdMedicalServices },
	{ name: "Public Transport", category: "Location", icon: Bus },
	{ name: "Pets Allowed", category: "Rules", icon: MdPets },
	{ name: "Kid Friendly", category: "Rules", icon: Baby },
	{ name: "Air Conditioning", category: "Amenities", icon: MdHeatPump },
	{ name: "Smoking Allowed", category: "Rules", icon: MdSmokingRooms }
];

export default attributes;
