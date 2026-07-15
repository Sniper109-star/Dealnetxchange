export const SITE = {
  name: "Dealnetxchange",
  email: "support@dealnetxchange.com",
  address: "128 City Road, London, United Kingdom, EC1V 2NX",
  phone: "VIP",
};

export const NAV = [
  { label: "Home", href: "/" },
  {
    label: "Company",
    children: [
      { label: "Legal", href: "/legal" },
      { label: "Investors Relation", href: "/investors" },
      { label: "KYC Policy", href: "/kyc" },
      { label: "Faqs", href: "/faq" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
  { label: "Services", href: "/services" },
  {
    label: "Who We Are",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    label: "Account",
    children: [
      { label: "Login", href: "/login" },
      { label: "Sign Up", href: "/signup" },
    ],
  },
];
