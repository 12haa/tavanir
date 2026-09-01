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
    menuTitle: 'گزارشات',
    route: '/reports',
    children: [
      {
        id: 2001,
        menuTitle: 'گزارش روزانه',
        route: '/reports/daily',
      },
      {
        id: 2002,
        menuTitle: 'گزارش ماهانه',
        route: '/reports/monthly',
      },
    ],
  },
];
