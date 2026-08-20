export interface Office {
  id: string;
  city: string;
  country: string;
  label: string;
  address: string;
  phone?: string;
  mapsUrl: string;
}

export const OFFICES: Office[] = [
  {
    id: "us-hq",
    city: "Alpharetta, GA",
    country: "United States",
    label: "US Headquarters",
    address: "1740 Grassland Pkwy, Suite 301, Alpharetta, GA 30004",
    phone: "+1 678 825 8222",
    mapsUrl: "https://maps.google.com/?q=1740+Grassland+Pkwy+Suite+301+Alpharetta+GA+30004",
  },
  {
    id: "us-clt",
    city: "Charlotte, NC",
    country: "United States",
    label: "United States",
    address: "14835 Ballantyne Village Way, Suite 225, Charlotte, NC 28277",
    mapsUrl: "https://maps.google.com/?q=14835+Ballantyne+Village+Way+Suite+225+Charlotte+NC+28277",
  },
  {
    id: "ca",
    city: "Toronto",
    country: "Canada",
    label: "Canada",
    address: "3080 Yonge Street, Suite 6060, Toronto, M4N 3N1, Canada",
    mapsUrl: "https://maps.google.com/?q=3080+Yonge+Street+Suite+6060+Toronto+Ontario+Canada",
  },
  {
    id: "in",
    city: "Hyderabad",
    country: "India",
    label: "India",
    address: "First Floor, Shyam Arihant, Patigadda Road, Secunderabad, 500003 Hyderabad, TS, India",
    mapsUrl: "https://maps.google.com/?q=Shyam+Arihant+Patigadda+Road+Secunderabad+Hyderabad+Telangana+India",
  },
];

export interface Contact {
  name: string;
  title: string;
  phone: string;
  email: string;
}

export const CONTRACT_CONTACTS: Contact[] = [
  { name: "Tulika Varma", title: "Contract quotes & purchase orders", phone: "678 400 0814", email: "tulika.varma@topsysit.com" },
  { name: "Charan Mandapalle", title: "Contract inquiries", phone: "+1 678 940 8889", email: "charan.m@topsysit.com" },
];
