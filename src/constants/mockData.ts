import { Word } from '@/types';

export const MOCK_WORDS: Word[] = [
  {
    id: '1',
    modern: 'Kompyuter',
    traditional: 'Bigasayyor',
    description: "Hisoblash va ma'lumotlarni qayta ishlash uchun mo'ljallangan elektron qurilma",
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    modern: 'Mashina',
    traditional: 'Aroba',
    description: "Yo'lovchilar yoki yuklarni tashish uchun mo'ljallangan transport vositasi",
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    modern: 'Telefon',
    traditional: 'Uzaqsuhbat',
    description: "Masofadan ovozli aloqa qilish uchun mo'ljallangan qurilma",
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    modern: 'Internet',
    traditional: "Tor to'r",
    description: "Butun dunyo bo'ylab kompyuterlarni bog'laydigan axborot tarmog'i",
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    modern: 'Televizor',
    traditional: "Ko'rguncha",
    description: "Teleko'rsatuvlarni qabul qilib namoyish etuvchi qurilma",
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    modern: 'Radio',
    traditional: 'Radijo',
    description: "Radio to'lqinlar orqali ovoz eshitish qurilmasi",
    createdAt: new Date().toISOString(),
  },
];
