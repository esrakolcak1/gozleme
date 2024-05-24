const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'SAYFALAR',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Anasayfa',
          type: 'item',
          icon: 'feather icon-home',
          url: '/app/dashboard/default'
        }
      ]
    },
    {
      id: 'ui-element',
      title: 'BİLGİ',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'component',
          title: 'Katagoriler',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'badges',
              title: 'Öğrenci',
              type: 'item',
              url: '/basic/badges'
            },
            {
              id: 'breadcrumb',
              title: 'Öğretmen',
              type: 'item',
              url: '/basic/breadcrumb'
            },
            {
              id: 'pagination',
              title: 'Hami',
              type: 'item',
              url: '/basic/pagination'
            },
            {
              id: 'collapse',
              title: 'Firma',
              type: 'item',
              url: '/basic/collapse'
            },
            {
              id: 'tabs-pills',
              title: 'Eşleşme',
              type: 'item',
              url: '/basic/tabs-pills'
            },
            {
              id: 'typography',
              title: 'Ziyaret',
              type: 'item',
              url: '/basic/typography'
            }
          ]
        }
      ]
    },
    {
      id: 'ui-forms',
      title: 'FORM ',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 'forms',
          title: 'Form ',
          type: 'item',
          icon: 'feather icon-file-text',
          url: '/forms/form-basic'
        }
      ]
    },
    // {
    //   id: 'chart-maps',
    //   title: 'GRAFİK',
    //   type: 'group',
    //   icon: 'icon-charts',
    //   children: [
    //     {
    //       id: 'charts',
    //       title: 'Grafikler',
    //       type: 'item',
    //       icon: 'feather icon-pie-chart',
    //       url: '/charts/nvd3'
    //     }
    //   ]
    // },
    {
      id: 'pages',
      title: 'Pages',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'auth',
          title: 'Authentication',
          type: 'collapse',
          icon: 'feather icon-lock',
          children: [
            {
              id: 'signup-1',
              title: 'Sign up',
              type: 'item',
              url: '/auth/signup-1',
              target: true,
              breadcrumbs: false
            },
            {
              id: 'signin-1',
              title: 'Sign in',
              type: 'item',
              url: '/auth/signin-1',
              target: true,
              breadcrumbs: false
            }
          ]
        },

        {
          id: 'documentation',
          title: 'Ostim Teknik Üniversitesi',
          type: 'item',
          icon: 'feather icon-book',
          classes: 'nav-item',
          url: 'https://www.ostimteknik.edu.tr/meslek-yuksekokulu-81',
          target: true,
          external: true
        },
        {
          id: 'maps',
          title: 'Maps',
          type: 'item',
          icon: 'feather icon-map',
          url: '/maps/google-map'
        }
      ]
    }
  ]
};

export default menuItems;
