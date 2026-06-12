# WorldExplorer — Dunyo Davlatlari Ma’lumotlar Platformasi

**WorldExplorer** - Next.js 15 (App Router) va Tailwind CSS yordamida yaratilgan, barcha dunyo davlatlarini izlash, saralash, tahlili va batafsil ma’lumotlarini o'rganish imkoniyatini taqdim etuvchi zamonaviy ma'lumotlar platformasi.

---

## 🚀 Asosiy Imkoniyatlar va Funksiyalar

1. **Server-Side Rendering (SSR) & Dynamic Caching**: Barcha davlatlar ro'yxati va individual ma'lumotlar sahifasi server-side rendering orqali yuklanadi va Next.js CDN keshlash tizimi yordamida tezkor yuklanishi kafolatlanadi.
2. **Kengaytirilgan Qidiruv (SearchBar)**: Davlatlar nomi, rasmiy nomi, poytaxt nomlari yoki alfa kodlari (`cca3` / `cca2`) bo'yicha tezkor matnli qidiruv.
3. **Region bo'yicha Saralash (RegionFilter)**: Davlatlarni kontinentlar (Afrika, Amerika, Osiyo, Yevropa, Okeaniya, Antarktika) kesimida tezkor filtrlovchi responsive piller.
4. **Kuchli Saralash Tizimi (SortDropdown)**: Aholisi, quruqlik maydoni yoki nomi bo'yicha o'sish va kamayish tartibida saralash.
5. **Sevimli Davlatlar (Favorites)**: Foydalanuvchi faqat o'ziga ma'qul bo'lgan davlatlarni sevimlilar ro'yxatiga qo'shishi va ushbu ma'lumotlarni `localStorage` orqali saqlab qolishi mumkin.
6. **Batafsil Ma'lumotlar Sahifasi (`/country/[cca3]`)**:
   - Davlat bayrog'i, rasmiy gerbi (Coat of arms).
   - Mahalliy nomi va rasmiy TLD tizimi.
   - Demografik/geografik ma'lumotlar bento-grid kartalari shaklida (Aholi zichligi, pul birligi, so'zlashuvchi tillar, vaqt zonalari, koordinatalari).
   - Chiquvchi yo'nalish: Google Maps orqali koordinatasini xaritada ko'rish.
   - **Chegaradosh Qo'shni Davlatlar**: Qo'shni davlatlar bayroqlari va nomlari bilan interaktiv linklar orqali bog'langan.
7. **Statistika Paneli (Bento-metrics)**: Bosh sahifada joriy saralangan davlatlar, jami aholi soni, jami maydoni hamda eng yirik aholilik davlat ko'rsatkichlari dinamik tarzda hisoblab ko'rsatiladi.

---

## 📂 Loyiha Tuzilmasi

Loyiha quyidagi professional arxitektura bo'yicha tashkil qilingan:

```text
world-explorer/
├── app/
│   ├── layout.tsx         # Google Fonts (Inter) & Responsiv Navigatsiya paneli kishi layouti
│   ├── page.tsx           # Bosh sahifa server component & Hero banner
│   ├── globals.css        # Tailwind kiritishlar
│   ├── loading.tsx        # Umumiy root yuklanish sahifasi
│   ├── error.tsx          # Xatoliklarni boshqaruvchi Client modullar
│   ├── not-found.tsx      # Custom 404 sahifa
│   ├── country/
│   │   └── [cca3]/
│   │       ├── page.tsx    # Davlat batafsil sahifasi dinamik router params
│   │       └── loading.tsx # Davlat sahifasi preloader
│   └── favorites/
│       └── page.tsx       # Sevimli davlatlar uchun entrypoint
│
├── components/
│   ├── CountryCard.tsx     # Davlat kartasi (nomi, poytaxti, bayrog'i va sevimli toggle)
│   ├── SearchBar.tsx       # Matnli input qidiruv paneli
│   ├── RegionFilter.tsx    # Kontinent pills
│   ├── SortDropdown.tsx    # Saralash selektori
│   ├── FavoriteButton.tsx  # Yurak shaklidagi sevimli tugma (LocalStorage aloqasi)
│   ├── Loading.tsx         # Glow spinner loader
│   ├── ErrorMessage.tsx    # O'ziga xos xatolik vizuallari
│   ├── StatCard.tsx        # Bento-statistik karta
│   ├── BorderCountry.tsx   # Chegaradosh davlatlarni bog'lovchi mini karta
│   └── CountriesClient.tsx # Bosh sahifaning interaktiv state coordinator moduli
│
├── hooks/
│   ├── useFavorites.ts     # Sevimlilarni localStorage bilan koordinatsiya qiluvchi hook
│   └── useDebounce.ts      # Qidiruv davomida inputlarni debouncing qilish hooki
│
├── lib/
│   └── api.ts              # REST Countries API fetch funksiyalari
│
├── types/
│   └── index.ts            # Type/Interface deklaratsiyasi (Davlat, Region va Saralash)
│
├── utils/
│   └── formatters.ts       # Aholi soni va maydon birliklari formatlovchilar
│
└── README.md
```

---

## 🛠️ O'rnatish va Ishga Tushirish

### 1. Bog'liqliklarni o'rnatish

Loyiha kerakli barcha paketlarni o'rnatish uchun:

```bash
npm install
```

### 2. Ishga tushirish (Development muhitda)

```bash
npm run dev
```

Platforma sukut bo'yicha [http://localhost:3000](http://localhost:3000) manzilida ishlaydi.

### 3. Production Build tayyorlash

```bash
npm run build
npm start
```

---

## 🎨 Ishlatilgan Texnologiyalar va Kutubxonalar

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)
- **Animations**: [motion (from motion/react)](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **API service**: [REST Countries (V3.1)](https://restcountries.com/)
