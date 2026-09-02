export interface NavMenuItem {
  id: number;
  icon?: string;
  menuTitle: string;
  route: string;
  children?: NavMenuItem[];
}

export const navMenu: NavMenuItem[] = [
  // {
  //   id: 1,
  //   menuTitle: 'داشبورد',
  //   route: '/',
  // },
  {
    id: 2000,
    menuTitle: 'مدیریت سامانه',
    route: '/reports',
    children: [
      {
        id: 2001,
        menuTitle: 'نقش‌های کاربردی ',
        route: '/reports/daily',
      },
      {
        id: 2002,
        menuTitle: 'مدیریت کاربران',
        route: '/reports/monthly',
      },
      {
        id: 2003,
        menuTitle: 'تقویم',
        route: '/reports/monthly',
      },
      {
        id: 2004,
        menuTitle: 'رنگ بندی نقشه ها ',
        route: '/reports/monthly',
      },
      {
        id: 2005,
        menuTitle: 'به روز رسانی گزارشات',
        route: '/reports/monthly',
      },
    ],
  },
  {
    id: 3000,
    menuTitle: 'مدیریت سامانه شرکت ها ',
    route: '/reports',
    children: [
      {
        id: 3001,
        menuTitle: 'سطوح دسترسی شرکت ها',
        route: '/reports/daily',
      },
      {
        id: 3002,
        menuTitle: 'اطلاعیه شرکت ها',
        route: '/reports/monthly',
      },
      {
        id: 3003,
        menuTitle: 'فرم های اطلاعاتی مدیریت مصرف',
        route: '/reports/monthly',
      },
      {
        id: 3004,
        menuTitle: 'سقف ساعت همکاری مولد خودتامین',
        route: '/reports/monthly',
      },
    ],
  },
  {
    id: 4000,
    menuTitle: ' گزارش های قرائت پروفیل بار',
    route: '/reports',
    children: [
      {
        id: 4001,
        menuTitle: 'گزارش های همکاری',
        route: '/reports/daily',
      },
      {
        id: 4002,
        menuTitle: 'گزارش های ثبت نام',
        route: '/reports/monthly',
      },
      {
        id: 4003,
        menuTitle: 'گزارش های پیش بینی کاهش بار',
        route: '/reports/monthly',
      },
      {
        id: 4004,
        menuTitle: 'گزارش های عملکرد کاهش بار',
        route: '/activity-report',
      },
      {
        id: 4004,
        menuTitle: 'گزارش های مدیریت بار',
        route: '/reports/monthly',
      },
      {
        id: 4004,
        menuTitle: 'گزارش های پاداش',
        route: '/reports/monthly',
      },
      {
        id: 4004,
        menuTitle: 'گزارش های شهرک های صنعتی و فیدر و نیروگاه های خورشیدی',
        route: '/reports/monthly',
      },
      {
        id: 4004,
        menuTitle: 'گزارش های تکمیلی',
        route: '/reports/monthly',
      },
    ],
  },
];
