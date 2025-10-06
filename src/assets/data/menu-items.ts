import type { MenuItemType } from '@/types/menu'

export const MENU_ITEMS: MenuItemType[] = [
  {
    key: 'menu',
    label: 'MENU',
    isTitle: true,
  },
  {
    key: 'dashboard',
    icon: 'solar:home-2-broken',
    label: 'Dashboard',
    badge: {
      text: '9+',
      variant: 'success',
    },
    url: '/dashboard/analytics',
  },
  {
    key: 'apps',
    label: 'APPS',
    isTitle: true,
  },
  {
  key: 'apps-chat',
  icon: 'solar:chat-round-call-broken',
  label: 'Chat',
  // url: '/apps/chat',
  children: [
    {
      key: 'bis-chat',
      label: 'BIS-Chat',
      url: '/apps/chat/bis',
      parentKey: 'apps-chat',
    },
    {
      key: 'vendor-chat',
      label: 'Vendor-Chat',
      url: '/apps/chat/vendor',
      parentKey: 'apps-chat',
    }
  ]
},
  // {
  //   key: 'apps-calendar',
  //   icon: 'solar:calendar-broken',
  //   label: 'Calendar',
  //   children: [
  //     {
  //       key: 'calendar-schedule',
  //       label: 'Schedule',
  //       url: '/calendar/schedule',
  //       parentKey: 'apps-calendar',
  //     },
  //     {
  //       key: 'calendar-integration',
  //       label: 'Integration',
  //       url: '/calendar/integration',
  //       parentKey: 'apps-calendar',
  //     },
  //   ],
  // },
  
  {
    key: 'apps-contact',
    icon: 'solar:letter-broken',
    label: 'Contact',
    url: '/apps/contact',
  },
  {
    key: 'apps-todo',
    icon: 'solar:list-heart-minimalistic-broken',
    label: 'Buyer',
    url: '/apps/todo',
  },

  {
    key: 'apps-invoices',
    icon: 'solar:bill-list-broken',
    label: 'Supplier',
    children: [
      {
        key: 'invoices',
        label: 'Supplier',
        url: '/invoices',
        parentKey: 'apps-invoices',
      },
      {
        key: 'invoices-details',
        label: 'Supplier Details',
        url: '/invoices/RB6985',
        parentKey: 'apps-invoices',
      },
    ],
  },
  {
    key: 'custom',
    label: 'Custom',
    isTitle: true,
  },
  {
    key: 'pages',
    label: 'Pages',
    isTitle: false,
    icon: 'solar:folder-with-files-broken',
    children: [
      {
        key: 'page-welcome',
        label: 'Welcome',
        url: '/pages/welcome',
        parentKey: 'pages',
      },
      {
        key: 'page-faqs',
        label: 'About-us',
        url: '/pages/aboutus',
        parentKey: 'pages',
      },
      {
        key: 'category',
        label: 'Category',
        url: '/pages/category',
        parentKey: 'pages',
      },
       {
        key: 'page-timeline',
        label: 'Footer',
        url: '/footer',
        parentKey: 'pages',
      },
      // {
      //   key: 'page-coming-soon',
      //   label: 'Coming Soon',
      //   url: '/category',
      //   parentKey: 'pages',
        
      // },
      // {
      //   key: 'page-maintenance',
      //   label: 'Maintenance',
      //   url: '/maintenance',
      //   parentKey: 'pages',
      //   target: '_blank',
      // },
      // {
      //   key: 'page-404-error',
      //   label: '404 Error',
      //   url: '/error-404',
      //   parentKey: 'pages',
      //   target: '_blank',
      // },
      // {
      //   key: 'page-error-404-alt',
      //   label: 'Error 404 Alt',
      //   url: '/pages/error-404-alt',
      //   parentKey: 'pages',
      // },
    ],
  },
 
{
  key: 'blog',
  label: 'Blog',
  isTitle: false,
  icon: 'solar:notebook-broken',
  // children: [
  //   { key: 'Blog-list', label: 'Blog-List', url: '/pages/blog', parentKey: 'blog' },
  //   { key: 'blog-new', label: 'New Blog', url: '/blog/new', parentKey: 'blog' },
  //   // { key: 'blog-view', label: 'View Blog', url: '/blog-view/:id', parentKey: 'blog' },
  //   { key: 'blog-edit', label: 'Edit Blog', url: '/blog/:id/edit', parentKey: 'blog' },
  // ],
}



  
]
