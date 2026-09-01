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
];
