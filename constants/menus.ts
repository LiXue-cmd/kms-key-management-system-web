import type { NavMenu, NavMenuItems } from '~/types/nav';
import { useAuthorization } from '~/composables/useAuthorization';

const { user } = useAuthorization();

const superAdminMenu: NavMenu[] = [
  {
    heading: 'General',
    items: [
      {
        title: 'Home',
        icon: 'i-lucide-home',
        link: '/'
      },
      {
        title: 'Email',
        icon: 'i-lucide-mail',
        link: '/email'
      },
      {
        title: 'Tasks',
        icon: 'i-lucide-calendar-check-2',
        link: '/tasks',
        new: true
      }
    ]
  },
  {
    heading: 'Admin',
    items: [
      {
        title: 'Manage Users',
        icon: 'i-lucide-users',
        link: '/manage-users'
      },
      {
        title: 'Manage Posts',
        icon: 'i-lucide-file-text',
        link: '/manage-posts'
      },
      {
        title: 'Settings',
        icon: 'i-lucide-settings',
        link: '/settings'
      }
    ]
  }
];

const normalUserMenu: NavMenu[] = [
  {
    heading: 'General',
    items: [
      {
        title: 'Home',
        icon: 'i-lucide-home',
        link: '/'
      },
      {
        title: 'Email',
        icon: 'i-lucide-mail',
        link: '/email'
      },
      {
        title: 'Profile',
        icon: 'i-lucide-user',
        link: '/profile'
      }
    ]
  }
];

export const getNavMenu = () => {
  if (user.value?.role === 'super-admin') {
    return superAdminMenu;
  } else {
    return normalUserMenu;
  }
};

export const navMenuBottom: NavMenuItems = [
  {
    title: 'Help & Support',
    icon: 'i-lucide-circle-help',
    link: 'https://github.com/dianprata/nuxt-shadcn-dashboard'
  },
  {
    title: 'Feedback',
    icon: 'i-lucide-send',
    link: 'https://github.com/dianprata/nuxt-shadcn-dashboard'
  }
];