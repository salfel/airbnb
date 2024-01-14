<?php

namespace App;

enum Attribute: string
{
    case Kitchen = 'Kitchen';
    case Fireplace = 'Fireplace';
    case StudyOfficeNook = 'Study/Office Nook';
    case Parking = 'Parking';
    case Washer = 'Washer';
    case Gym = 'Gym';
    case Security = 'Security';
    case Pool = 'Pool';
    case Wlan = 'Wlan';
    case TV = 'TV';
    case WheelchairAccessible = 'Wheelchair accessible';
    case FirstAid = 'First Aid';
    case PublicTransport = 'Public Transport';
    case PetsAllowed = 'Pets Allowed';
    case KidFriendly = 'Kid Friendly';
    case AirConditioning = 'Air Conditioning';
    case SmokingAllowed = 'Smoking Allowed';
}
