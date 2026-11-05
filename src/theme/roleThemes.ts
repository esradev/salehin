import { UserRole } from '../types';

export interface RoleTheme {
  id: UserRole;
  nameFa: string;
  badgeTitle: string;
  // Color codes
  primaryHex: string;
  accentHex: string;
  // Tailwind utility classes
  headerBg: string;
  headerBorder: string;
  activeNavTab: string;
  accentBg: string;
  accentHoverBg: string;
  accentText: string;
  bannerGradient: string;
  bannerBorder: string;
  badgeBg: string;
  badgeText: string;
  pillBorder: string;
}

export const ROLE_THEMES: Record<UserRole, RoleTheme> = {
  // 1. Admin: سرمه‌ای اقتدار و امنیت کشوری
  admin: {
    id: 'admin',
    nameFa: 'سرمه‌ای اقتدار ستادی',
    badgeTitle: 'فرماندهی ارشد ستادی',
    primaryHex: '#0F1D2A',
    accentHex: '#D4AF37',
    headerBg: 'bg-[#0F1D2A]',
    headerBorder: 'border-[#1B2F42]',
    activeNavTab: 'bg-[#182C3D] text-[#E5C365] border-[#D4AF37]/40',
    accentBg: 'bg-[#D4AF37]',
    accentHoverBg: 'hover:bg-[#E5C365]',
    accentText: 'text-[#D4AF37]',
    bannerGradient: 'from-[#0B151F] via-[#0F1D2A] to-[#182B3E]',
    bannerBorder: 'border-[#223B52]',
    badgeBg: 'bg-[#182C3D]',
    badgeText: 'text-[#E5C365]',
    pillBorder: 'border-[#D4AF37]/30',
  },

  // 2. مسئول ناحیه: سبز نظامی مقتدر ناحیه
  nahieh_officer: {
    id: 'nahieh_officer',
    nameFa: 'سبز زیتونی نظامی ناحیه',
    badgeTitle: 'فرماندهی قرارگاه ناحیه',
    primaryHex: '#1A3326',
    accentHex: '#D8B244',
    headerBg: 'bg-[#1A3326]',
    headerBorder: 'border-[#2A4E3B]',
    activeNavTab: 'bg-[#12241B] text-[#E5C365] border-[#D8B244]/40',
    accentBg: 'bg-[#D8B244]',
    accentHoverBg: 'hover:bg-[#E8C55E]',
    accentText: 'text-[#D8B244]',
    bannerGradient: 'from-[#122219] via-[#1A3326] to-[#264A38]',
    bannerBorder: 'border-[#36614A]',
    badgeBg: 'bg-[#12241B]',
    badgeText: 'text-[#E5C365]',
    pillBorder: 'border-[#D8B244]/30',
  },

  // 3. استادیار ناحیه: عنابی و زرشکی فاخر حوزوی و علمی
  nahieh_ostadyar: {
    id: 'nahieh_ostadyar',
    nameFa: 'عنابی فاخر حوزوی',
    badgeTitle: 'استادیار علمی و معرفتی',
    primaryHex: '#3A171E',
    accentHex: '#E5B84B',
    headerBg: 'bg-[#3A171E]',
    headerBorder: 'border-[#52232B]',
    activeNavTab: 'bg-[#280F14] text-[#F3CD68] border-[#E5B84B]/40',
    accentBg: 'bg-[#E5B84B]',
    accentHoverBg: 'hover:bg-[#F0C964]',
    accentText: 'text-[#E5B84B]',
    bannerGradient: 'from-[#280F14] via-[#3A171E] to-[#54212B]',
    bannerBorder: 'border-[#692C37]',
    badgeBg: 'bg-[#280F14]',
    badgeText: 'text-[#F3CD68]',
    pillBorder: 'border-[#E5B84B]/30',
  },

  // 4. مسئول حوزه: زیتونی خاکی تاکتیکی عملیاتی
  hozeh_officer: {
    id: 'hozeh_officer',
    nameFa: 'زیتونی تاکتیکی حوزه',
    badgeTitle: 'مسئول عملیات تربیتی حوزه',
    primaryHex: '#29351E',
    accentHex: '#D1A741',
    headerBg: 'bg-[#29351E]',
    headerBorder: 'border-[#3D4F2E]',
    activeNavTab: 'bg-[#1B2414] text-[#E5C365] border-[#D1A741]/40',
    accentBg: 'bg-[#D1A741]',
    accentHoverBg: 'hover:bg-[#E0B958]',
    accentText: 'text-[#D1A741]',
    bannerGradient: 'from-[#1B2314] via-[#29351E] to-[#3B4D2B]',
    bannerBorder: 'border-[#4D6339]',
    badgeBg: 'bg-[#1B2414]',
    badgeText: 'text-[#E5C365]',
    pillBorder: 'border-[#D1A741]/30',
  },

  // 5. سرمربی حوزه: فیروزه‌ای و یشمی عمیق تربیتی
  hozeh_sarmarbi: {
    id: 'hozeh_sarmarbi',
    nameFa: 'یشمی و فیروزه‌ای تربیتی',
    badgeTitle: 'سرمربی صالحین حوزه',
    primaryHex: '#143032',
    accentHex: '#DE9E3B',
    headerBg: 'bg-[#143032]',
    headerBorder: 'border-[#21494C]',
    activeNavTab: 'bg-[#0E2021] text-[#E8AE4D] border-[#DE9E3B]/40',
    accentBg: 'bg-[#DE9E3B]',
    accentHoverBg: 'hover:bg-[#EDB04F]',
    accentText: 'text-[#DE9E3B]',
    bannerGradient: 'from-[#0C1E1F] via-[#143032] to-[#1E484B]',
    bannerBorder: 'border-[#2B6064]',
    badgeBg: 'bg-[#0E2021]',
    badgeText: 'text-[#E8AE4D]',
    pillBorder: 'border-[#DE9E3B]/30',
  },

  // 6. مربی پایگاه: قهوه‌ای گرم سفالین و مسجد
  morabbi: {
    id: 'morabbi',
    nameFa: 'قهوه‌ای گرم سفال مسجد',
    badgeTitle: 'مربی پایگاه مقاومت',
    primaryHex: '#33251A',
    accentHex: '#E5A138',
    headerBg: 'bg-[#33251A]',
    headerBorder: 'border-[#4A3728]',
    activeNavTab: 'bg-[#231911] text-[#F0B24F] border-[#E5A138]/40',
    accentBg: 'bg-[#E5A138]',
    accentHoverBg: 'hover:bg-[#F0B24F]',
    accentText: 'text-[#E5A138]',
    bannerGradient: 'from-[#211811] via-[#33251A] to-[#4A3728]',
    bannerBorder: 'border-[#5F4633]',
    badgeBg: 'bg-[#231911]',
    badgeText: 'text-[#F0B24F]',
    pillBorder: 'border-[#E5A138]/30',
  },

  // 7. سرگروه حلقه: خردلی و برنز صمیمی حلقه
  sargorouh: {
    id: 'sargorouh',
    nameFa: 'برنز و خردلی گرم حلقه',
    badgeTitle: 'سرگروه نمونه حلقه',
    primaryHex: '#3D3014',
    accentHex: '#F0C450',
    headerBg: 'bg-[#3D3014]',
    headerBorder: 'border-[#55431E]',
    activeNavTab: 'bg-[#29200D] text-[#F3CD68] border-[#F0C450]/40',
    accentBg: 'bg-[#F0C450]',
    accentHoverBg: 'hover:bg-[#F7D26E]',
    accentText: 'text-[#F0C450]',
    bannerGradient: 'from-[#261E0D] via-[#3D3014] to-[#54431C]',
    bannerBorder: 'border-[#6A5424]',
    badgeBg: 'bg-[#29200D]',
    badgeText: 'text-[#F3CD68]',
    pillBorder: 'border-[#F0C450]/30',
  },

  // 8. بسیجی عادی: سبز زمردی باطراوت جوانان
  basiji: {
    id: 'basiji',
    nameFa: 'سبز زمردی و خورشیدی جوانان',
    badgeTitle: 'متربی فعال صالحین',
    primaryHex: '#163B2D',
    accentHex: '#ECC760',
    headerBg: 'bg-[#163B2D]',
    headerBorder: 'border-[#245743]',
    activeNavTab: 'bg-[#0E261D] text-[#F0CF73] border-[#ECC760]/40',
    accentBg: 'bg-[#ECC760]',
    accentHoverBg: 'hover:bg-[#F3D77B]',
    accentText: 'text-[#ECC760]',
    bannerGradient: 'from-[#0E241B] via-[#163B2D] to-[#225642]',
    bannerBorder: 'border-[#307257]',
    badgeBg: 'bg-[#0E261D]',
    badgeText: 'text-[#F0CF73]',
    pillBorder: 'border-[#ECC760]/30',
  },
};
