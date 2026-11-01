export interface Product {
  id: string;
  name: string;
  category: 'Sarees' | 'Lehengas' | 'Kurtis & Suits' | 'Bridal Couture' | 'Handloom Specials' | 'Dupattas';
  price: number;
  originalPrice: number;
  image: string;
  additionalImages?: string[];
  description: string;
  fabric: string;
  craft: string;
  origin: string;
  sizes: string[];
  inStock: boolean;
  isVideoCallReady: boolean;
  isBestseller?: boolean;
  rating: number;
  reviewCount: number;
  color: string;
}

export interface CollectionSlide {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  badge: string;
  ctaText: string;
  categoryTarget: string;
}

export const FEATURED_COLLECTIONS: CollectionSlide[] = [
  {
    id: 'col-1',
    title: 'The Royal Kosa Silk of Chhattisgarh',
    subtitle: 'Woven with pride in Baloda Bazar',
    tagline: 'Pure wild silkworm yarn with rich antique zari borders and natural madder dyes.',
    image: '/src/assets/images/product_kosa_silk_saree_1793511669691.jpg',
    badge: 'Artisanal Heritage',
    ctaText: 'Explore Kosa Sarees',
    categoryTarget: 'Sarees',
  },
  {
    id: 'col-2',
    title: 'Gulabi Shringaar · Bridal Couture 2026',
    subtitle: 'Heirloom Velvet & Rose-Red Lehengas',
    tagline: 'Hand-embroidered zardozi and dabka motifs crafted for the timeless Indian bride.',
    image: '/src/assets/images/product_bridal_lehenga_1793511670886.jpg',
    badge: 'Bridal Exclusive',
    ctaText: 'View Bridal Pieces',
    categoryTarget: 'Bridal Couture',
  },
  {
    id: 'col-3',
    title: 'Everyday Luxury · Chanderi & Organza Suits',
    subtitle: 'Bespoke Festive Kurti Sets',
    tagline: 'Featherlight silks paired with delicate scalloped cutwork dupattas in romantic hues.',
    image: '/src/assets/images/product_chanderi_kurti_1793511671127.jpg',
    badge: 'New Season Drop',
    ctaText: 'Shop Kurti Sets',
    categoryTarget: 'Kurtis & Suits',
  },
  {
    id: 'col-4',
    title: 'Live Boutique Video Tour Available',
    subtitle: 'Baloda Bazar Showroom Direct to Your Screen',
    tagline: 'Inspect fabric drape, authentic colors, and borders in real-time with our stylists.',
    image: '/src/assets/images/cozy_boutique_hero_1793511669825.jpg',
    badge: 'Live Shopping 📱',
    ctaText: 'Book a Video Session',
    categoryTarget: 'All',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'cozy-001',
    name: 'Baloda Bazar Heritage Kosa Silk Saree',
    category: 'Sarees',
    price: 8499,
    originalPrice: 12999,
    image: '/src/assets/images/product_kosa_silk_saree_1793511669691.jpg',
    description: 'An ode to Chhattisgarh craftsmanship. Woven from authentic wild Tussar/Kosa cocoon silk, featuring a rich ruby red body with antique gold temple zari borders and a contrasting blush pink pallu.',
    fabric: '100% Pure Kosa Wild Silk',
    craft: 'Baloda Bazar Traditional Pit-Loom Weaving',
    origin: 'Baloda Bazar, Chhattisgarh',
    sizes: ['Free Size (6.3m with blouse)'],
    inStock: true,
    isVideoCallReady: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 38,
    color: 'Crimson & Blush Pink',
  },
  {
    id: 'cozy-002',
    name: 'Gulab-Rang Bridal Velvet & Silk Lehenga',
    category: 'Bridal Couture',
    price: 28999,
    originalPrice: 38500,
    image: '/src/assets/images/product_bridal_lehenga_1793511670886.jpg',
    description: 'A masterpiece created for the modern bride. Features dense zardozi, hand-beaded french knots, and pita embroidery over deep rose-ruby micro velvet, complemented by a soft blush pink sheer organza veil dupatta.',
    fabric: 'Micro Velvet & Organza Silk',
    craft: 'Hand Zardozi & Resham Threadwork',
    origin: 'Crafted at Baloda Bazar Atelier',
    sizes: ['S (36)', 'M (38)', 'L (40)', 'XL (42)', 'Custom Made-to-Measure'],
    inStock: true,
    isVideoCallReady: true,
    isBestseller: true,
    rating: 5.0,
    reviewCount: 24,
    color: 'Rose Ruby & Vintage Gold',
  },
  {
    id: 'cozy-003',
    name: 'Gulmohar Chanderi Silk Anarkali Set',
    category: 'Kurtis & Suits',
    price: 4899,
    originalPrice: 6499,
    image: '/src/assets/images/product_chanderi_kurti_1793511671127.jpg',
    description: 'Bespoke three-piece festive silhouette featuring a blush pink flared kurti with gold neckline embroidery, paired with wine-red straight pants and a hand-cut scalloped floral organza dupatta.',
    fabric: 'Chanderi Silk & Pure Organza',
    craft: 'Gota Patti & Scallop Cutwork',
    origin: 'Central India Silk Cluster',
    sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)', 'XL (42)', 'XXL (44)'],
    inStock: true,
    isVideoCallReady: true,
    isBestseller: false,
    rating: 4.8,
    reviewCount: 52,
    color: 'Soft Blush & Wine Red',
  },
  {
    id: 'cozy-004',
    name: 'Padmavati Rose Organza Floral Saree',
    category: 'Sarees',
    price: 3699,
    originalPrice: 5200,
    image: '/src/assets/images/product_kosa_silk_saree_1793511669691.jpg',
    description: 'Weightless sheer organza infused with hand-painted botanical roses, accented with fine crimson glass beads along the hand-embroidered border. Includes an unstitched raw silk blouse fabric.',
    fabric: 'Pure Sheer Organza & Raw Silk Blouse',
    craft: 'Hand-painted florals & Moti work',
    origin: 'Baloda Bazar Design Studio',
    sizes: ['Free Size (5.5m + 0.8m Blouse)'],
    inStock: true,
    isVideoCallReady: true,
    isBestseller: true,
    rating: 4.7,
    reviewCount: 41,
    color: 'Dusty Rose & Crimson',
  },
  {
    id: 'cozy-005',
    name: 'Noor Hand-Embroidered Sharara Suit Set',
    category: 'Kurtis & Suits',
    price: 5450,
    originalPrice: 7200,
    image: '/src/assets/images/product_chanderi_kurti_1793511671127.jpg',
    description: 'Festive elegance designed for celebrations. Features a peplum kurti adorned with mirror embellishments and gota border, tiered flared sharara pants, and a matching crimson shaded dupatta.',
    fabric: 'Georgette Silk with Shantoon Lining',
    craft: 'Foil Mirror Work & Gota Patti',
    origin: 'Baloda Bazar Atelier',
    sizes: ['S (36)', 'M (38)', 'L (40)', 'XL (42)'],
    inStock: true,
    isVideoCallReady: true,
    isBestseller: false,
    rating: 4.9,
    reviewCount: 19,
    color: 'Baby Pink & Crimson',
  },
  {
    id: 'cozy-006',
    name: 'Chhattisgarh Handloom Kosa Zari Stole',
    category: 'Dupattas',
    price: 2499,
    originalPrice: 3499,
    image: '/src/assets/images/product_kosa_silk_saree_1793511669691.jpg',
    description: 'An artisanal wrap woven with unbleached natural Kosa silk warp and vegetable-dyed pink weft. Finished with handcrafted tassels and antique zari border.',
    fabric: '100% Handspun Kosa Silk',
    craft: 'Handspun Loomed Weave',
    origin: 'Baloda Bazar Weavers Cooperative',
    sizes: ['2.5m x 36 inch'],
    inStock: true,
    isVideoCallReady: true,
    isBestseller: false,
    rating: 4.8,
    reviewCount: 15,
    color: 'Natural Gold & Rose',
  },
  {
    id: 'cozy-007',
    name: 'Maharani Vermilion Banarasi Silk Saree',
    category: 'Sarees',
    price: 11200,
    originalPrice: 15800,
    image: '/src/assets/images/product_bridal_lehenga_1793511670886.jpg',
    description: 'Heirloom grade pure katan silk woven with kadwa meenakari motifs. A glorious red-crimson drape traditionally treasured in Indian bridal trousseaus.',
    fabric: 'Pure Katan Banarasi Silk',
    craft: 'Kadwa Brocade Weaving',
    origin: 'Heritage Weaver Guild',
    sizes: ['Free Size (6.3m with blouse)'],
    inStock: true,
    isVideoCallReady: true,
    isBestseller: true,
    rating: 5.0,
    reviewCount: 67,
    color: 'Deep Vermilion Red',
  },
  {
    id: 'cozy-008',
    name: 'Avani Hand-block Indigo & Rose Kurti',
    category: 'Kurtis & Suits',
    price: 2199,
    originalPrice: 2999,
    image: '/src/assets/images/product_chanderi_kurti_1793511671127.jpg',
    description: 'Boutique everyday comfort tailored in breathable organic cambric cotton. Hand block-printed with natural madder rose dye and subtle zari piping on sleeve hems.',
    fabric: '100% Organic Cambric Cotton',
    craft: 'Natural Hand Block Printing',
    origin: 'Cozy Attire Daily Line',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    isVideoCallReady: false,
    isBestseller: false,
    rating: 4.6,
    reviewCount: 88,
    color: 'Rose Pink & White',
  },
];

export interface Currency {
  code: string;
  symbol: string;
  rate: number; // relative to INR
}

export const CURRENCIES: Record<string, Currency> = {
  INR: { code: 'INR', symbol: '₹', rate: 1 },
  USD: { code: 'USD', symbol: '$', rate: 0.012 },
  AED: { code: 'AED', symbol: 'د.إ', rate: 0.044 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.0094 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.011 },
};

export const BOUTIQUE_INFO = {
  name: 'Cozy Attire Boutique',
  tagline: 'Luxury Ethnic Wear · Baloda Bazar',
  phone: '+91 99816 26248',
  phoneRaw: '919981626248',
  address: 'Shop No. 4 & 5, Heritage Market, Main Road, Baloda Bazar, Chhattisgarh - 493332',
  email: 'care@cozyattireboutique.com',
  workingHours: '10:30 AM – 8:30 PM (IST) Mon-Sun',
  upiId: '9981626248@upi',
  shippingWorldwide: 'Worldwide Express Courier with DHL & FedEx Tracking',
};
