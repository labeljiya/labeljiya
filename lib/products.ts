export type Product = {
  id: string;
  name: string;
  mrp: number;
  discount: number;
  category: string;
  image: string;
  images: string[];
  description: string;
  sizes: string[];
};

export const products: Product[] = [
  {
    id: "off_white-anarkali-01",
    name: "Off-white Kalamkari Anarkali Suit",
    mrp: 1845,
    discount: 5,
    category: "Anarkali Set",
    image: "/images/anarkali/a3.jpg",
    images: [
      "/images/anarkali/a1.jpg",
      "/images/anarkali/a2.jpg",
      "/images/anarkali/a3.jpg",
      "/images/anarkali/a4.jpg",
      "/images/anarkali/a5.jpg",
    ],
    description:
      "Elegant pink anarkali suit designed for festive occasions and celebrations.",
    sizes: ["L", "XL", "2XL", "3XL"],
  },

  {
    id: "Orange-anarkali-04",
    name: "Orange A-line Set with Embroidered pink Yoke and Sleeves ",
    mrp: 3600,
    discount: 10,
    category: "Anarkali Set",
    image: "/images/anarkali/e1.png",
    images: [
      "/images/anarkali/e1.png",
      "/images/anarkali/e2.png",
      "/images/anarkali/e3.png",
      "/images/anarkali/e4.png",

      
    ],
    description:
      "Elegant pink A-Line suit designed for Daily Wear and Outing.",
    sizes: ["S", "M", "L", "XL"],
  },

  {
    id: "Purple-anarkali-05",
    name: "Purple A-line Set with Embroidered Yoke and Heavy Dupatta ",
    mrp: 2875,
    discount: 20,
    category: "Anarkali Set",
    image: "/images/anarkali/f1.png",
    images: [
      "/images/anarkali/f1.png",
      "/images/anarkali/f2.png",
      "/images/anarkali/f3.png",
      

      
    ],
    description:
      "Elegant purple A-Line suit designed for Festive Wear and Wedding Wear.",
    sizes: ["S", "M", "L", "XL"],
  },

  {
    id: "Green-anarkali-06",
    name: "Green A-line Set with Embroidered yoke and Dupatta",
    mrp: 3600,
    discount: 10,
    category: "Anarkali Set",
    image: "/images/anarkali/g1.png",
    images: [
      "/images/anarkali/g1.png",
      "/images/anarkali/g2.png",
     
         
    ],
    description:
      "Elegant pink A-Line suit designed for WEDDING WEAR and FESTIVE WEAR.",
    sizes: ["M", "L", "XL"],
  },

  
  

  {
    id: "Pink-anarkali-02",
    name: "Pink A-line Knot-Sleeves with Mandala Embroidery ",
    mrp: 1195,
    discount: 5,
    category: "Anarkali Set",
    image: "/images/anarkali/c2.png",
    images: [
      "/images/anarkali/c2.png",
      "/images/anarkali/c1.png",
      
    ],
    description:
      "Elegant pink A-Line suit designed for Daily Wear and Outing.",
    sizes: ["S", "M", "L", "XL"],
  },

  

  {
    id: "CORD-SET-01",
    name: "CORD-SET",
    mrp: 5999,
    discount: 20,
    category: "CORD-SETS",
    image: "/images/cordsets/1front.png",
    images: [
      "/images/cordsets/1front.png",
      "/images/cordsets/1back.png",
      "/images/cordsets/1left.png",
      "/images/cordsets/1right.png",
    ],
    description:
      "Highlighting the finishing and detailing of the CoRD Set.",
    sizes: ["XS", "S", "M", "L"],
  },

{
    id: "Hot-pink-anarkali-02",
    name: "Hot Pink A-line with Embroidered Yoke and Pockets ",
    mrp: 1845,
    discount: 5,
    category: "Anarkali Set",
    image: "/images/anarkali/d1.png",
    images: [
      "/images/anarkali/d1.png",
      "/images/anarkali/d2.png",
      "/images/anarkali/d3.png",
      "/images/anarkali/d4.png",
      "/images/anarkali/d5.jpg",
    ],
    description:
      "Elegant pink anarkali suit designed for festive occasions and celebrations.",
    sizes: ["L", "XL", "2XL", "3XL"],
  },



  {
    id: "straight-suits",
    name: "Straight Suit Set",
    mrp: 1245,
    discount: 5,
    category: "Straight-Set",
    image: "/images/designer-suits/b1.jpg",
    images: [
      "/images/designer-suits/b1.jpg",
      "/images/designer-suits/b2.jpg",
      "/images/designer-suits/b3.jpg",
      "/images/designer-suits/b4.jpg",
      "/images/designer-suits/b5.jpg",
    ],
    description:
      "Elegant pink anarkali suit designed for festive occasions and celebrations.",
    sizes: ["L", "XL", "2XL", "3XL"],
  },
];

/* ----------------------------------------
   SALE PRICE CALCULATION
----------------------------------------- */

export function getSalePrice(product: Product) {
  if (product.discount <= 0) {
    return product.mrp;
  }

  return Math.round(
    product.mrp -
      (product.mrp * product.discount) / 100
  );
}

/* ----------------------------------------
   SALE PRODUCTS
----------------------------------------- */

export const saleProducts = products.filter(
  (product) => product.discount > 0
);

/* ----------------------------------------
   CATEGORIES
----------------------------------------- */

export const categories = Array.from(
  new Set(products.map((product) => product.category))
);