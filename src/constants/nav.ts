export interface NavMenuItem {
  id: number;
  icon?: string;
  menuTitle: string;
  route: string;
  children?: NavMenuItem[];
}

export const navMenu: NavMenuItem[] = [
  {
    id: 1,
    menuTitle: 'داشبورد',
    route: '/',
  },
  {
    id: 2,
    menuTitle: 'گزارشات',
    route: '/reports',
    children: [
      {
        id: 21,
        menuTitle: 'گزارش روزانه',
        route: '/reports/daily',
      },
      {
        id: 22,
        menuTitle: 'گزارش ماهانه',
        route: '/reports/monthly',
      },
    ],
  },
];
