# O'zbek Lug'ati

Kelgindi va Asl O'zbek tillarini tarjima qiluvchi ikki tomonlama lug'at sayti.

## Xususiyatlar

- 🔄 **Ikki tomonlama tarjima**: Kelgindi ↔ Asl O'zbek
- 🔍 **Tezkor qidiruv**: Real-time qidiruv funksiyasi
- 🎨 **Dark/Light rejim**: Qulay interfeys
- 🔐 **Admin panel**: So'zlarni tahrirlash va o'chirish
- 💾 **Supabase integratsiyasi**: Cloud database

## Texnologiyalar

- React + TypeScript
- Vite
- Tailwind CSS
- Supabase
- React Query
- Zustand
- shadcn/ui

## O'rnatish

1. Repository ni clone qiling:
   ```bash
   git clone <repository-url>
   cd uzbek-lugat
   ```

2. Dependencies ni o'rnating:
   ```bash
   npm install
   ```

3. Environment variables ni sozlang:
   ```bash
   cp .env.example .env
   ```
   `.env` faylini ochib, Supabase ma'lumotlarini kiriting.

4. Supabase ni sozlang:
   - `SUPABASE_SETUP.md` faylini o'qing
   - Database table yarating
   - RLS policies ni o'rnating

5. Dasturni ishga tushiring:
   ```bash
   npm run dev
   ```

## Admin Kirish

- **Login**: admin
- **Parol**: 1234

Admin sifatida kirgandan keyin, har bir so'z kartasida tahrirlash va o'chirish tugmalari ko'rinadi.

## Database Struktura

### words table
- `id`: UUID (Primary Key)
- `modern`: TEXT (Kelgindi so'z)
- `traditional`: TEXT (Asl o'zbek so'z)
- `description`: TEXT (Izoh, ixtiyoriy)
- `created_at`: TIMESTAMP

## Qo'llab-quvvatlash

Muammolar yoki savollar uchun: [GitHub Issues](github-url/issues)

## Litsenziya

MIT License
