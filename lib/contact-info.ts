export const SUPPORT_EMAIL = "support@business.editandproofread.com";
export const ADMIN_EMAIL = "admin@business.editandproofread.com";
export const PAYMENTS_EMAIL = "payments@business.editandproofread.com";
export const COMPANY_PHONE = "US (+1) 408-872-8603";
export const COMPANY_PHONE_TEL = "+14088728603";
export const INTERNAL_NOTIFICATION_EMAIL = "mudyblast@gmail.com";
export const BRAND_NAME = "My Editing and Proofreading Desk";
export const FACEBOOK_URL = "https://web.facebook.com/profile.php?id=61593299712622";
export const INSTAGRAM_URL = "https://www.instagram.com/myepdesk/";

export interface OfficeLocation {
  id: string;
  name: string;
  shortName: string;
  country: string;
  countryCode: string;
  region: string;
  city: string;
  streetAddress: string;
  building?: string;
  postalCode: string;
  fullAddress: string;
  phone?: string;
  phoneTel?: string;
  email: string;
  timezone: string;
  hours: string;
  flag: string;
  isHeadquarters?: boolean;
}

export const COMPANY_OFFICES: OfficeLocation[] = [
  {
    id: "us",
    name: "United States Headquarters",
    shortName: "United States",
    country: "United States",
    countryCode: "US",
    region: "Delaware",
    city: "Wilmington",
    streetAddress: "1007 N Orange St. 4th Floor Suite #5723",
    postalCode: "19801",
    fullAddress: "1007 N Orange St. 4th Floor Suite #5723, Wilmington, Delaware 19801, United States",
    phone: "US (+1) 408-872-8603",
    phoneTel: "+14088728603",
    email: SUPPORT_EMAIL,
    timezone: "EST / EDT (UTC-5)",
    hours: "Mon – Fri: 8:00 AM – 6:00 PM EST (24/7 Portal)",
    flag: "🇺🇸",
    isHeadquarters: true,
  },
  {
    id: "uk",
    name: "United Kingdom Office",
    shortName: "United Kingdom",
    country: "United Kingdom",
    countryCode: "GB",
    region: "Scotland",
    city: "Edinburgh",
    streetAddress: "5 South Charlotte Street",
    postalCode: "EH2 4AN",
    fullAddress: "5 South Charlotte Street, Edinburgh, EH2 4AN, United Kingdom",
    email: SUPPORT_EMAIL,
    timezone: "GMT / BST (UTC+0 / UTC+1)",
    hours: "Mon – Fri: 8:30 AM – 5:30 PM GMT (24/7 Portal)",
    flag: "🇬🇧",
  },
  {
    id: "ca",
    name: "Canada Office",
    shortName: "Canada",
    country: "Canada",
    countryCode: "CA",
    region: "Ontario",
    city: "Toronto",
    streetAddress: "Hullmark Center, 4789 Yonge St, Hullmark Corporate Center",
    building: "Hullmark Center",
    postalCode: "M2N 0G3",
    fullAddress: "Hullmark Center, 4789 Yonge St, Hullmark Corporate Center, Toronto, ON M2N 0G3, Canada",
    email: SUPPORT_EMAIL,
    timezone: "EST / EDT (UTC-5)",
    hours: "Mon – Fri: 9:00 AM – 5:00 PM EST (24/7 Portal)",
    flag: "🇨🇦",
  },
  {
    id: "uae",
    name: "United Arab Emirates Office",
    shortName: "UAE (Dubai)",
    country: "United Arab Emirates",
    countryCode: "AE",
    region: "Dubai",
    city: "Dubai",
    streetAddress: "Marina Gate, RME Holdings - Dubai Branch, R-311-315, Jumeirah Living Marina Gate 3",
    building: "Marina Gate 3",
    postalCode: "121828",
    fullAddress: "Marina Gate, RME Holdings - Dubai Branch, R-311-315, Jumeirah Living Marina Gate 3, Dubai 121828, UAE",
    email: SUPPORT_EMAIL,
    timezone: "GST (UTC+4)",
    hours: "Mon – Fri: 9:00 AM – 6:00 PM GST (24/7 Portal)",
    flag: "🇦🇪",
  },
  {
    id: "ng",
    name: "African Regional Office",
    shortName: "Nigeria / Africa",
    country: "Nigeria",
    countryCode: "NG",
    region: "Federal Capital Territory",
    city: "Abuja",
    streetAddress: "Rivers House, Plot 83 Ralph Shodeinde Street, Central Business District",
    building: "Rivers House",
    postalCode: "901002",
    fullAddress: "Rivers House, Plot 83 Ralph Shodeinde Street, Central Business District, Abuja 901002, Nigeria",
    email: SUPPORT_EMAIL,
    timezone: "WAT (UTC+1)",
    hours: "Mon – Fri: 8:00 AM – 5:00 PM WAT (24/7 Portal)",
    flag: "🇳🇬",
  },
  {
    id: "cn",
    name: "China & East Asia Office",
    shortName: "China (East Asia)",
    country: "China",
    countryCode: "CN",
    region: "Zhejiang",
    city: "Ningbo",
    streetAddress: "The MAF Center, 6/F, No. 661 Fuming Road, Fuming Street",
    building: "The MAF Center",
    postalCode: "315042",
    fullAddress: "The MAF Center, 6/F, No. 661 Fuming Road, Fuming Street, Ningbo, Zhejiang 315042, China",
    email: SUPPORT_EMAIL,
    timezone: "CST (UTC+8)",
    hours: "Mon – Fri: 9:00 AM – 6:00 PM CST (24/7 Portal)",
    flag: "🇨🇳",
  },
];

export const COMPANY_ADDRESS = COMPANY_OFFICES[0].fullAddress;
export const UK_OFFICE_ADDRESS = COMPANY_OFFICES[1].fullAddress;
export const CANADA_OFFICE_ADDRESS = COMPANY_OFFICES[2].fullAddress;
export const UAE_OFFICE_ADDRESS = COMPANY_OFFICES[3].fullAddress;
export const AFRICA_OFFICE_ADDRESS = COMPANY_OFFICES[4].fullAddress;
export const CHINA_OFFICE_ADDRESS = COMPANY_OFFICES[5].fullAddress;


