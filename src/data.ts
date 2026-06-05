/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, JournalPost, UserProfile, Order, Consultation } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "aurum-botanica",
    name: "Aurum Botanica",
    price: 185,
    collection: "The Signature Series",
    category: "Floral",
    concentration: "Eau de Parfum",
    volume: "100ml / 3.4 fl oz",
    description: "Sweet honey, warm liquid amber, and botanical sun-kissed fields.",
    longDescription: "An exquisite olfactory tapestry of liquid sun, Aurum Botanica balances the warm intensity of sun-ripened honey with the rich comfort of botanical amber and wild dry flowers. This singular scent captures the fleeting moment when day turns to twilight, casting golden rays over wild fields of jasmine and dry grass.",
    image: "https://lh3.googleusercontent.com/aida/AP1WRLtz4uHEMSWnAaMt5cHBUEDQW0Nyvn8h5GHMyY-1_vCCaa2MeFpxm28QbHV5sB-RU931Rq-c1PvCqSZxCvJ4SOsO0nDkuznChlwdvLdCbIe_XzWoMDhD-QOD8W4NV3BKyBXdWfs1U1pXA77GfJhXao0qa0Ch-YXru7_vF1ZkAbnZOPkrfNoWtYpZqJ_VbgjfrSsSdY3YSbg2daHxDvaDVfLkRQPmsvepRPnU0XEFBQ9njz2C0IajXLzasIA",
    isNewArrival: true,
    notes: {
      top: ["Wild Golden Honey", "Mandarin Zest", "Dewy Violet Leaves"],
      heart: ["Grasse Jasmine", "Turkish Rose", "Solar Grasses"],
      base: ["Siam Benzoin", "Warm Dark Amber", "Creamy Sandalwood"]
    },
    rating: 4.9
  },
  {
    id: "santal-noir",
    name: "Santal Noir",
    price: 240,
    collection: "The Signature Series",
    category: "Woody",
    concentration: "Extrait de Parfum",
    volume: "100ml / 3.4 fl oz",
    description: "Deep Mysore sandalwood, vintage papyrus, and dark, smoky oud.",
    longDescription: "A profound formulation that commands absolute presence. Santal Noir weaves an intricate tale of smoky woods, vintage libraries, and rich papyrus parchment. Heartwood from aged Mysore sandalwood trees is pressure-distilled with dense, dark oud resin to form a luxurious, tactile secondary skin that transitions into a creamy velvet dry-down.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-Ze23i97HyFj0pihIq9HMwPZUC0Is_ua30Hf2jBB6Ka3b6D6_3ypk8pq6MpIPbEXKegZ-SbZOCwUF1D6ttAM6XT10o6HnkzMlpFSZvSFKXLnaDgtyADHgb8X30FPJPbSVRHZibAY3R0BzJ9jxCFYmNHYkvuLJMsxcJKD5s2pog-V8CDOhZMq3bgvC-GkGqrV742RnRIfSGu8WdVhVs2kcHVtW6bjnPRlOPNAZQHKpQGUvFmf0ioEWpjo5d7z1oj1ttFRTuyNV1k8V",
    notes: {
      top: ["Ambrette Seeds", "Smoked Black Cardamom", "Cinnamon Bark"],
      heart: ["Mysore Sandalwood", "Virginia Cedar", "Egyptian Papyrus"],
      base: ["Assam Oud", "Haitian Vetiver", "Genuine Leather"]
    },
    rating: 4.8
  },
  {
    id: "rose-silence",
    name: "Rose Silence",
    price: 175,
    collection: "Les Saisons",
    category: "Floral",
    concentration: "Eau de Parfum",
    volume: "50ml / 1.7 fl oz",
    description: "Damask rose petals, crisp white musk, and soft incense smoke.",
    longDescription: "An ephemeral masterpiece of absolute purity. Rose Silence isolates the scent of a fresh, morning-cut Damask rose before the midday heat evaporates the dew. It features a quiet, crystalline backdrop of clean linen and white musks, accented with the briefest touch of soft, cold incense smoke.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVJo8ajLw4vtGKV8c2uEkx17QRXxca5b5YEQVV8hlICLTyk1qZrI7qA3bM3gbbpE3ggW3saTlXTtlpXzWvCeSl9s7FrJcfXZuRYy4YQLOtzVRwDT9CPHz7P0CLpFcE6W4JaXgNW9uiZ1PH6-mlen5AX7OmeatS3rqFI2TbEDr3Rk4Rkxr1bj8ls9TakU6zluqKpg-tOiq-tYBUQNDJKis2AylokfJ_6MniJiCFiD4cnNjeFs36SCgQEdS5HwY_zI38WJZHX6zdRnr8",
    notes: {
      top: ["Italian Bergamot", "Blackcurrant Buds", "Pink Pepper"],
      heart: ["Damask Rose", "Litchi Vibe", "Soft Peony"],
      base: ["White Musk", "Cedarwood", "Aura of Patchouli"]
    },
    rating: 4.7
  },
  {
    id: "midnight-oud",
    name: "Midnight Oud",
    price: 240,
    collection: "The Signature Series",
    category: "Oud",
    concentration: "Extrait de Parfum",
    volume: "100ml / 3.4 fl oz",
    description: "Opulent black oudwood, wet earthy moss, and mystical dark spices.",
    longDescription: "An intense exploration of gravity, Midnight Oud is formulated for cold nights and deep mysteries. Crafted with rare black patchouli leaves and heavy oils extracted from centuries-old Assam eaglewood, this scent creates a dark, velvety aura accented by smoke curls and dry, spicy cloves.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuChcHon3oocQcvf7qh4L2bYNmk3CmbB2Z255X3m_AoihhUy9Dq0Gnou-9nI38SZcjG9Hn4wLI9E6Stifi0AvG_1ZVzaKPBvhkpbt_Hu6X6XpiWt7RdmnXfu53ux-2bvfZfBEb3QGcT13QIBAGOaUv0s6gMJW0sFzNrLaW7PqkUxZIma6Jzmi0kZS5r3-z3cI5bDfE395wi-DjPxjaDvTJWZjH8pqKbRo51UWQNyStNRhG3dukEXfFl1t3rot-W2eFMqerI27UeniIYT",
    isNewArrival: true,
    notes: {
      top: ["Szechuan Pepper", "Clove Bud", "Incense Tears"],
      heart: ["Indonesian Patchouli", "Suede Accord", "Atlas Cedarwood"],
      base: ["Pure Black Oud", "Oakmoss", "Smoked Vetiver Roots"]
    },
    rating: 4.95
  },
  {
    id: "white-vetiver",
    name: "White Vetiver",
    price: 160,
    collection: "Les Saisons",
    category: "Citrus",
    concentration: "Eau de Parfum",
    volume: "50ml / 1.7 fl oz",
    description: "Bright Corsican grapefruit, fresh garden cedar, and salty Haitian vetiver.",
    longDescription: "Crisp, breezy, and fundamentally grounding. White Vetiver contrasts the biting, mineral sharpness of coastal seawater and squeezed citrus with the earthy, fibrous root architecture of wet Haitian vetiver. Perfect for a clean, sharp daytime presentation.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDg_9jasAldfqIz2phaZhqHq7Od6sjin0YlRWJLroy4LsvX5eCNqwE-jun9DlD0UC_nO81ZMlTPI8wrSKashOSar5ieNDThUZ4uWzq41stHMiO_lZM6Bi5XKzVJJIeW2kfPI0X8unDQauFsV2APJTvEZAoy-bza43lUtLFToQ68SFbaz4q8D-V7neW3nLTnHlZ7HlggdLQsqGeaoRrqM9oRLSUJMIx1-FTs7tgUPUk6_xxray9ARHu4XUtZj1_dY4DZ2vildPNur-cz",
    isNewArrival: true,
    notes: {
      top: ["Corsican Grapefruit", "Salty Sea Spray", "Lime Slices"],
      heart: ["Fresh Sage Leaves", "Siberian Pine Needle", "Nutmeg"],
      base: ["Haitian Vetiver Roots", "White Cedar", "Sensual Ambergris"]
    },
    rating: 4.6
  },
  {
    id: "discovery-set-i",
    name: "The Discovery Set",
    price: 65,
    collection: "The Discovery Set",
    category: "Oriental",
    concentration: "Discovery Set",
    volume: "3 x 10ml vials",
    description: "Sample sized decants of Aurum Botanica, Santal Noir, and Rose Silence.",
    longDescription: "The absolute entry point into our olfactory landscape. This sample flight contains elegant 10ml travel glass atomizers of our core trilogies: Aurum Botanica, Santal Noir, and Saint-Germain's Rose Silence. Includes a luxurious physical journal containing our scent lineage diagrams and an exchange card redeemable toward a full-sized bottle.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTxb1O1gaTt5ENrG82pTBGbZ63kmeTmCMO1uPUH0pSa9hCs5auiGAn5S5QzlfNehcS1SZ1YHRywZ9hrVy5bvu9H8Ct063LM8hw-HqnQt7pDldKCr8G0yjDBRGb3HERCFD2DMx1aFLFmgJT3CzVg8VuySGAtIXjTM1_epsfXrakIK3cD1ueVDfXeD-NfkdszmLqjSPkzrC3p0BJqw3rke964Y1uEIfEX5TYEl4btpC2ItnnI-EG1_-MkMj-QwWb9_jrP4RpmHyq9bLW",
    notes: {
      top: ["Various Fruity Accents", "Bergamot", "Szechuan Pepper"],
      heart: ["Turkish Rose", "Sandalwood Heart", "Botanical Honeys"],
      base: ["Warm Amber", "Smoky Oudwood", "Soft Linens"]
    },
    rating: 4.85
  }
];

export const JOURNAL_POSTS: JournalPost[] = [
  {
    id: "alchemy-of-grasse",
    title: "The Alchemy of Grasse: Sourcing May Rose",
    category: "Extraction",
    excerpt: "Before dawn, expert harvesters gather blooming Centifolia Rose buds in Grasse, capturing the perfect moment before the heat evaporates the precious dew.",
    content: "The story of fine perfume is written in the soil. Every May, the valleys of Grasse in the south of France bloom with Rosa Centifolia, colloquially known as the 'May Rose.' This flower is both prized and temperamental: its blossoms unfold once a year, and their blooming season lasts just a few short weeks.\n\nOur scent formulation team arrives before twilight. The harvest must begin at 5:00 AM, when temperatures are crisp, and the scent-retaining dew still coats each petal. Harvesting is physical, delicate poetry. A trained harvester snaps each stem with a single flick of the wrist. By midday, the fields are empty. The petals are rushed immediately to copper extraction silos scattered within 4 miles of the harvest to preserve their volatile oils. It takes over four hundred thousand fresh petals to synthesize a single ounce of May Rose absolute.",
    date: "May 12, 2026",
    author: "Dominic Pascal",
    readTime: "6 min read",
    bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3MSiOGjpUFZs5_XGPuqkBT7sgq-NCAuN3hQiWrzg1QY7-xwsvZgMx_9BIigja03Ndg3Exc3fgIy1zK9C_Vy6WbxyJbiRtJmjV-L8EYKfYQY6aLNoX_D8uuZG5qshdiGPZEaVVcoTb-8mCWhJL7hPINcHXq3HQppXCmTajpyTMpxyHok332PEnFV3yR-Nx1YBliHbWlmtZN10W2aYHHqMkaYklvS1QM_Pcif5nNXOnS0vG9Z0q1Fv_yKP2Vt3sRlO1SlO31Mvy1NeZ",
    tag: "Source Spotlight"
  },
  {
    id: "decades-of-distillation",
    title: "Decades of Distillation: Steam vs Absolute",
    category: "Heritage",
    excerpt: "Exploring the legendary copper stills of the Southern Alps and how traditional steam distillation extracts clean structural wood essences.",
    content: "At our distillery in the foothills of the Southern French Alps, time-worn copper alembics sit alongside state-of-the-art super-critical CO2 extractors. This juxtaposition represents our core philosophy: technical modernity paired with traditional craftsmanship.\n\nFor woods like Cedar and Sandalwood, steam distillation remains supreme. High-pressure steam is piped through stacked heartwood chips, bursting the oil cavities. The steam carries the volatile oils upwards, condensing into a pale amber mixture before separating. It is slow, requiring up to 36 hours of continuous heating. The result is dry, structural, and clean. For delicate flowers, however, heat destroys the scent's integrity, prompting us to use high-vacuum cold extractions that leave the flower's delicate heart pristine.",
    date: "April 18, 2026",
    author: "Gabrielle Moreau",
    readTime: "8 min read",
    bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDokwGTqq2yiw-CbJpDqvNn2ZreH_h_YBd9xIB8RKka7R9izzyxEZsAPYpwm1_85bpOWK84OqJIEvdKL86Qe7EPcnhQZs0TWUTxDK8GDURXlw7Vh0lTdaFFAENvHA4Kk1i92qxD1W3DmAW4xP1ZBNMXYyllraIRyNBkwFRZ_KqarilWBejzseQwUIh6gdSInnfa4VzGWpVt3iAKu_LPnm2ZN0IKERiPPY7IaqLopx7koWxgiNcYifZMKVQ2gBexDbCVCq0GhYlCEY-L"
  },
  {
    id: "evolution-of-flacon",
    title: "The Evolution of the Flacon: The Craft of Glassmaking",
    category: "Craftsmanship",
    excerpt: "How our hand-molded crystal vessels are mouth-blown, flame-polished, and detailed in Parisian studios.",
    content: "A fragrance is an invisible garment, and the flacon is its physical architecture. Our bottles are crafted by historical glassworks master blowers who have serviced luxury French cellars for generations.\n\nWe start with ultra-clear sand from the forests of Fontainebleau, melted in a hearth reaching 1400°C. Each heavy glass blank is mouth-blown into custom iron molds, ensuring a weighted, stable block-glass base reflecting golden refractive shafts. We deliberately keep a slight organic ripple inside the glass to acknowledge the trace of human hands. Finally, the brass spray collars are fitted using custom machinery designed to resist high alcohol concentrations while maintaining a seamless, tight aerosol spray.",
    date: "March 29, 2026",
    author: "Sophie Lenormand",
    readTime: "5 min read",
    bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ_kMfnovtl5ZkIUEMgs2hUSv017XzUXa-qs1K2hqq-b0nPxrmbXJmU1qsJfWEcXBxMYTXtoiJsX1OlzwCjvZYvBssrENVDEsx6kvrE87eT085LR5SjptbOtbsthhmn4_TWx-Np4vXcrhIg8dVwhCuOdAXoN1wBtOlcuiWZ_2WwuTQMiZBjy-EyxM8mblS8cqFHqbhqtDAtbVN4KWWPoELhzCERP6oyKqppfJVzXIV8U7bDHqgtmzYGeYEf7_WwU62x7cGQ7689VN_"
  },
  {
    id: "complexity-of-vetiver",
    title: "Understanding Base Notes: The Complexity of Vetiver",
    category: "Scent Theory",
    excerpt: "Demystifying dry down profiles. Why Haitian Vetiver roots evoke damp soil, rich hazelnut, and deep oceanic salt.",
    content: "Of all raw perfume components, Vetiver roots hold the most paradoxes. Native to tropical riverbeds, Vetiver is a structural grass whose massive underground roots grow downward in vertical columns, anchoring the earth. These roots act as chemical collectors of mountain soil.\n\nWhen processed, vetiver does not just smell 'woody.' A high-grade extraction evokes damp peat, morning smoke, fresh-baked sourdough bread, green grass, and sea salt. It acts as an olfactory anchor, interlocking volatile top citrus elements to the skin's surface. In our formulation laboratories, we utilize vetiver as an anchor for citrus and aquatic elements, creating an organic cohesion that lingers long after initial volatile evaporation.",
    date: "Feb 10, 2026",
    author: "Dr. Henri Dubois",
    readTime: "7 min read",
    bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDg_9jasAldfqIz2phaZhqHq7Od6sjin0YlRWJLroy4LsvX5eCNqwE-jun9DlD0UC_nO81ZMlTPI8wrSKashOSar5ieNDThUZ4uWzq41stHMiO_lZM6Bi5XKzVJJIeW2kfPI0X8unDQauFsV2APJTvEZAoy-bza43lUtLFToQ68SFbaz4q8D-V7neW3nLTnHlZ7HlggdLQsqGeaoRrqM9oRLSUJMIx1-FTs7tgUPUk6_xxray9ARHu4XUtZj1_dY4DZ2vildPNur-cz"
  }
];

export const INITIAL_PROFILE: UserProfile = {
  name: "Julianne Thorne",
  email: "julianne.thorne@editorial.com",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiyzPiwJYOZhcKtp7T1QAEvNJbuLNdn2KkB-ZMSwbAD2RVal_Oby3FDppo9lGXtj6xImfB_SCQhs00ZyCmuBamQfFq8pAgcZ-MuuNBktdz_nV6AP-Jyicj9tSMBa_foZGmyyOiUMuH3iJnWhXornTuNh3e-1WPRVMtLQlr9iKyK61lkKNi0rrSyz66KEEuqDLhzC2mHt51Xbq-nPibbsfGvElImLrjdScaCPkuDoGr1Ny62mI_iK77uugkLmAWNTuTaurr3W3xzwcW",
  shippingAddress: "450 Rue de l'Odéon, Appt 4B, 75006 Paris, France",
  signatureScentId: "aurum-botanica",
  notesSaved: ["Sandalwood", "Ambergris", "Jasmine", "Bergamot"]
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ORD-2026-9921",
    date: "May 28, 2026",
    status: "In Transit",
    total: 240.00,
    trackingNumber: "FR-982110-DHL",
    items: [
      {
        productName: "Santal Noir",
        quantity: 1,
        price: 240.00,
        volume: "100ml / 3.4 fl oz",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-Ze23i97HyFj0pihIq9HMwPZUC0Is_ua30Hf2jBB6Ka3b6D6_3ypk8pq6MpIPbEXKegZ-SbZOCwUF1D6ttAM6XT10o6HnkzMlpFSZvSFKXLnaDgtyADHgb8X30FPJPbSVRHZibAY3R0BzJ9jxCFYmNHYkvuLJMsxcJKD5s2pog-V8CDOhZMq3bgvC-GkGqrV742RnRIfSGu8WdVhVs2kcHVtW6bjnPRlOPNAZQHKpQGUvFmf0ioEWpjo5d7z1oj1ttFRTuyNV1k8V"
      }
    ]
  },
  {
    id: "ORD-2026-8712",
    date: "April 02, 2026",
    status: "Delivered",
    total: 250.00,
    trackingNumber: "FR-471204-DHL",
    items: [
      {
        productName: "Rose Silence",
        quantity: 1,
        price: 175.00,
        volume: "50ml / 1.7 fl oz",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVJo8ajLw4vtGKV8c2uEkx17QRXxca5b5YEQVV8hlICLTyk1qZrI7qA3bM3gbbpE3ggW3saTlXTtlpXzWvCeSl9s7FrJcfXZuRYy4YQLOtzVRwDT9CPHz7P0CLpFcE6W4JaXgNW9uiZ1PH6-mlen5AX7OmeatS3rqFI2TbEDr3Rk4Rkxr1bj8ls9TakU6zluqKpg-tOiq-tYBUQNDJKis2AylokfJ_6MniJiCFiD4cnNjeFs36SCgQEdS5HwY_zI38WJZHX6zdRnr8"
      },
      {
        productName: "The Discovery Set",
        quantity: 1,
        price: 65.00,
        volume: "3 x 10ml vials",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTxb1O1gaTt5ENrG82pTBGbZ63kmeTmCMO1uPUH0pSa9hCs5auiGAn5S5QzlfNehcS1SZ1YHRywZ9hrVy5bvu9H8Ct063LM8hw-HqnQt7pDldKCr8G0yjDBRGb3HERCFD2DMx1aFLFmgJT3CzVg8VuySGAtIXjTM1_epsfXrakIK3cD1ueVDfXeD-NfkdszmLqjSPkzrC3p0BJqw3rke964Y1uEIfEX5TYEl4btpC2ItnnI-EG1_-MkMj-QwWb9_jrP4RpmHyq9bLW"
      }
    ]
  }
];

export const INITIAL_CONSULTATIONS: Consultation[] = [
  {
    id: "CNS-004",
    date: "June 18, 2026",
    time: "14:30",
    expertName: "Sylvain Alarie",
    type: "Olfactory Identity",
    status: "Confirmed"
  },
  {
    id: "CNS-001",
    date: "Jan 12, 2026",
    time: "10:00",
    expertName: "Gabrielle Moreau",
    type: "Bespoke Curation",
    status: "Completed"
  }
];
