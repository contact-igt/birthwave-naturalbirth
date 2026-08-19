// Verified business details — sourced from the official Birthwave Brand Guideline PDF
// (business card / letterhead / envelope pages). Do not alter without a verified source.
export const site = {
  name: "The Birth Wave",
  shortName: "Birthwave",
  byline: "By Dr. Santoshi Nandigam",
  doctor: {
    name: "Dr. Santoshi Nandigam",
    title: "Obstetrics & Gynaecology",
  },
  phone: "+91 93630 31925",
  phoneRaw: "9363031925",
  phoneHref: "tel:+919363031925",
  cugPhone: "+91 98407 98472",
  cugPhoneRaw: "9840798472",
  cugPhoneHref: "tel:+919840798472",
  whatsapp: "+91 93630 31925",
  whatsappHref:
    "https://wa.me/919363031925?text=" +
    encodeURIComponent("Hi, I'd like to book an appointment with The Birth Wave."),
  email: "drsantoshi@thebirthwave.com",
  address: {
    line1: "No. 8/15, Mahalingapuram Main Road",
    line2: "Nungambakkam, Chennai – 600034",
    full: "No. 8/15, Mahalingapuram Main Road, Nungambakkam, Chennai – 600034",
  },
  instagramHref: "https://instagram.com/thebirthwave",
  mapsHref: "https://maps.app.goo.gl/akYiVWGW8NTWTK3M9",
} as const;

// Nav labels are locked to the approved PDF, now pointing to real routes.
// Optional `children` render as an accessible dropdown (desktop) / accordion
// (mobile) rather than adding more top-level clutter.
export const nav = [
  { label: "About", href: "/about" },
  {
    label: "Care & Services",
    href: "/services",
    children: [
      { label: "Pregnancy & Antenatal Care", href: "/pregnancy-antenatal-care" },
      { label: "Natural Birth", href: "/natural-birth" },
      { label: "Fertility", href: "/fertility-preconception" },
      { label: "Gynaecology", href: "/gynaecology" },
      { label: "Vaginismus", href: "/vaginismus" },
      { label: "Lactation", href: "/lactation" },
      { label: "Newborn & Pediatrics", href: "/newborn-pediatric-care" },
    ],
  },
  {
    label: "Pregnancy",
    href: "/pregnancy-antenatal-care",
    children: [
      { label: "Pregnancy & Antenatal Care", href: "/pregnancy-antenatal-care" },
      { label: "Natural Birth", href: "/natural-birth" },
      { label: "Normal Birth", href: "/normal-birth-delivery" },
      { label: "VBAC", href: "/vbac" },
    ],
  },
  { label: "Fertility", href: "/fertility-preconception" },
  { label: "Pediatrics", href: "/newborn-pediatric-care" },
  { label: "Our Team", href: "/doctors" },
] as const;
