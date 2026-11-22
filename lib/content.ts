// SAMPLE CONTENT: replace reviews with genuine customer reviews, and the policies
// with the brand's finalised terms before launch.

export const reviews = [
  {
    name: "Priya S.",
    rating: 5,
    text: "The fit is lovely and the fabric stays light through a long day. I reach for it every week.",
    product: "Madurai A-Line Kurti",
  },
  {
    name: "Ananya R.",
    rating: 5,
    text: "The border detailing looks even better in person. It felt festive without being heavy.",
    product: "Kanchi Zari Straight Kurti",
  },
  {
    name: "Meera K.",
    rating: 4,
    text: "Comfortable, easy to style and the print is subtle. Exactly what I wanted for the office.",
    product: "Jaipur Block Print Kurti",
  },
  {
    name: "Divya L.",
    rating: 5,
    text: "The flare of the Anarkali is beautiful. I received so many compliments at the family function.",
    product: "Rani Anarkali Kurti",
  },
];

export interface Policy {
  title: string;
  intro: string;
  points: string[];
}

export const policies: Record<string, Policy> = {
  "shipping-information": {
    title: "Shipping Information",
    intro: "How your Maayil order reaches you.",
    points: [
      "Free standard shipping on orders of ₹1,999 and above; ₹99 on smaller orders.",
      "Estimated delivery is 3–7 business days, depending on your pincode.",
      "You will receive tracking details by email or WhatsApp once your order ships.",
    ],
  },
  "return-policy": {
    title: "Return Policy",
    intro: "We want you to love what you wear.",
    points: [
      "Unworn items with tags intact can be returned within 7 days of delivery.",
      "Customised and made-to-measure pieces cannot be returned unless faulty.",
      "Refunds go to the original payment method after the item passes inspection.",
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    intro: "How we handle your information.",
    points: [
      "We collect only what we need to process orders and respond to enquiries.",
      "We never sell your personal information.",
      "You can ask us to correct or delete your data at any time.",
    ],
  },
  "terms-and-conditions": {
    title: "Terms & Conditions",
    intro: "The basics of shopping with Maayil.",
    points: [
      "Product colours may vary slightly from screen to screen.",
      "Prices are in Indian Rupees and include applicable taxes.",
      "We may cancel orders affected by pricing or stock errors and refund you in full.",
    ],
  },
  "customer-support": {
    title: "Customer Support",
    intro: "We are happy to help with sizing, orders and customisation.",
    points: [
      "Message us on Instagram @maayil_clothing or on WhatsApp.",
      "For made-to-measure questions, use the customisation enquiry form.",
      "Please share your order number so we can help faster.",
    ],
  },
};
