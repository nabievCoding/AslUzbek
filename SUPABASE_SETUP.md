# Supabase O'rnatish Qo'llanmasi

## 1. Supabase Projektini Ulash

### OnSpace orqali ulash (Tavsiya etiladi):
1. OnSpace saytining yuqori o'ng burchagidagi **Supabase** tugmasini bosing
2. Sizning Supabase projektingizni tanlang yoki yangi yarating
3. Avtomatik ulash jarayoni tugagandan keyin davom eting

### Manual ulash:
1. `.env.example` faylini `.env` ga nusxalang
2. Supabase dashboarddan URL va Anon Key ni oling
3. `.env` faylini to'ldiring:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

## 2. Database Table Yaratish

Supabase SQL Editor da quyidagi SQL ni ishga tushiring:

```sql
-- Words table yaratish
CREATE TABLE words (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  modern TEXT NOT NULL,
  traditional TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index qo'shish (qidiruv uchun)
CREATE INDEX idx_words_modern ON words(modern);
CREATE INDEX idx_words_traditional ON words(traditional);
CREATE INDEX idx_words_created_at ON words(created_at DESC);

-- RLS (Row Level Security) yoqish
ALTER TABLE words ENABLE ROW LEVEL SECURITY;

-- Hamma o'qishi mumkin
CREATE POLICY "Hamma so'zlarni o'qiy oladi"
  ON words FOR SELECT
  USING (true);

-- Faqat authenticated foydalanuvchilar yozishi mumkin
CREATE POLICY "Authenticated foydalanuvchilar qo'sha oladi"
  ON words FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated foydalanuvchilar yangilashi mumkin"
  ON words FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated foydalanuvchilar o'chira oladi"
  ON words FOR DELETE
  USING (auth.role() = 'authenticated');
```

## 3. Test Ma'lumotlari Qo'shish (ixtiyoriy)

```sql
INSERT INTO words (modern, traditional, description) VALUES
  ('Kompyuter', 'Bigasayyor', 'Hisoblash va ma''lumotlarni qayta ishlash uchun elektron qurilma'),
  ('Telefon', 'Suhbatdor', 'Ovozli muloqot uchun qurilma'),
  ('Internet', 'Umumbog''lam', 'Global kompyuter tarmog''i'),
  ('Mashina', 'Aroba', 'Transport vositasi'),
  ('Samolyot', 'Havo kemasi', 'Havo transporti');
```

## 4. Admin Autentifikatsiya (ixtiyoriy)

Hozirda admin login local storage da saqlanadi (login: admin, parol: 1234).

Xavfsizlik uchun Supabase Auth qo'shish:

1. Supabase Dashboard → Authentication → Users
2. Yangi foydalanuvchi yaratish
3. `src/stores/authStore.ts` da Supabase Auth integratsiyasi qilish

## 5. Test Qilish

1. Dasturni ishga tushiring: `npm run dev`
2. Yangi so'z qo'shib ko'ring
3. So'zni tahrirlang
4. So'zni o'chirib ko'ring
5. Qidiruv funksiyasini sinab ko'ring

## Muammolarni Bartaraf Etish

### "So'zlarni yuklashda xatolik"
- `.env` faylini tekshiring
- Supabase URL va Anon Key to'g'riligini tasdiqlang
- Supabase projekt aktiv ekanligini tekshiring

### "So'z qo'shishda xatolik"
- RLS policy larni tekshiring
- Authenticated ekanligingizni tekshiring
- Table columns to'g'ri yaratilganligini tasdiqlang

### Browser Console da xatolar
- F12 ni bosing va Console tabini oching
- Xatolarni o'qib, yuqoridagi qadamlarni qaytadan tekshiring

## Qo'shimcha Resurslar

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
