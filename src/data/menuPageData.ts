export type MenuCategoryId = 'indian' | 'chinesethai' | 'noodles' | 'sushi'

export type MenuTag = 'SIGNATURE' | 'SPICY' | 'VERY SPICY' | 'VEGAN OPT'

export type MenuDish = {
  id: string
  name: string
  price: string
  description: string
  imageSrc: string
  imageAlt: string
  tags?: MenuTag[]
}

export type MenuSectionData = {
  id: string
  categoryId: MenuCategoryId
  title: string
  subtitle: string
  dishes: MenuDish[]
}

export const MENU_CATEGORIES: { id: MenuCategoryId; label: string }[] = [
  { id: 'indian', label: 'Indian' },
  { id: 'chinesethai', label: 'Chinese & Thai' },
  { id: 'noodles', label: 'Noodles & Rice' },
  { id: 'sushi', label: 'Sushi' },
]

export const MENU_SECTIONS: MenuSectionData[] = [
  {
    id: 'indian-tradition',
    categoryId: 'indian',
    title: 'Indian Tradition',
    subtitle: 'Rich, slow-cooked gravies and aromatic spices.',
    dishes: [
      {
        id: 'butter-chicken',
        name: 'Butter Chicken',
        price: '$21',
        description:
          'Tender chicken in a velvety tomato-butter sauce with fenugreek and warm spices.',
        imageSrc:
          'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'Bowl of butter chicken curry',
        tags: ['SIGNATURE'],
      },
      {
        id: 'tikka-masala',
        name: 'Tikka Masala',
        price: '$19',
        description:
          'Charred chicken tikka folded into a creamy, peppery masala with ginger and garlic.',
        imageSrc:
          'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'Chicken tikka masala',
        tags: ['SPICY'],
      },
      {
        id: 'lamb-madras',
        name: 'Lamb Madras',
        price: '$24',
        description:
          'Slow-braised lamb with coconut, curry leaves, and a bold chili-forward gravy.',
        imageSrc:
          'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'Lamb curry in a bowl',
        tags: ['VERY SPICY'],
      },
    ],
  },
  {
    id: 'wok-curry',
    categoryId: 'chinesethai',
    title: 'Wok & Curry',
    subtitle: 'High heat woks, coconut curries, and bright aromatics.',
    dishes: [
      {
        id: 'sweet-sour',
        name: 'Sweet & Sour',
        price: '$18',
        description:
          'Crispy protein, bell peppers, and pineapple in a glossy sweet-sour sauce.',
        imageSrc:
          'https://images.unsplash.com/photo-1606728035253-49e8a23146de?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'Sweet and sour dish',
      },
      {
        id: 'szechuan-beef',
        name: 'Szechuan Beef',
        price: '$22',
        description:
          'Flash-seared beef with dried chilies, Szechuan peppercorn, and seasonal vegetables.',
        imageSrc:
          'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'Szechuan beef stir fry',
        tags: ['SPICY'],
      },
      {
        id: 'green-curry',
        name: 'Green Curry',
        price: '$20',
        description:
          'Thai green curry with coconut milk, Thai basil, eggplant, and jasmine rice.',
        imageSrc:
          'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'Green curry bowl',
        tags: ['SPICY', 'VEGAN OPT'],
      },
    ],
  },
  {
    id: 'noodles-rice',
    categoryId: 'noodles',
    title: 'Noodles & Rice',
    subtitle: 'Comfort bowls, fried rice, and wok-tossed noodles.',
    dishes: [
      {
        id: 'pad-thai',
        name: 'Bangkok Pad Thai',
        price: '$17',
        description:
          'Rice noodles with tamarind, egg, peanuts, and lime—wok-fired to order.',
        imageSrc:
          'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'Pad Thai',
        tags: ['SIGNATURE'],
      },
      {
        id: 'fried-rice',
        name: 'Yangzhou Fried Rice',
        price: '$16',
        description:
          'Day-old rice stir-fried with egg, peas, carrots, and light soy aromatics.',
        imageSrc:
          'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'Fried rice',
      },
      {
        id: 'dan-dan',
        name: 'Dan Dan Noodles',
        price: '$18',
        description:
          'Springy noodles with sesame-chili sauce, preserved vegetables, and minced protein.',
        imageSrc:
          'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'Dan dan noodles',
        tags: ['SPICY'],
      },
    ],
  },
  {
    id: 'sushi-bar',
    categoryId: 'sushi',
    title: 'Sushi Bar',
    subtitle: 'Chef-selected cuts, rolls, and seasonal omakase bites.',
    dishes: [
      {
        id: 'chef-nigiri',
        name: 'Chef Nigiri Set',
        price: '$28',
        description:
          'Six pieces of seasonal nigiri with miso soup and house pickles.',
        imageSrc:
          'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'Nigiri sushi platter',
        tags: ['SIGNATURE'],
      },
      {
        id: 'spicy-tuna',
        name: 'Spicy Tuna Roll',
        price: '$15',
        description:
          'Tuna, cucumber, and chili-mayo topped with crispy shallots and tobiko.',
        imageSrc:
          'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'Spicy tuna roll',
        tags: ['SPICY'],
      },
      {
        id: 'veggie-roll',
        name: 'Garden Dragon',
        price: '$14',
        description:
          'Avocado, asparagus, and mango with sweet soy and microgreens.',
        imageSrc:
          'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'Vegetable sushi roll',
        tags: ['VEGAN OPT'],
      },
    ],
  },
]
