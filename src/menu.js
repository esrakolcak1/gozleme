const menuItems = {
  items: [
    {
      id: "navigation",
      title: "SAYFALAR",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "dashboard",
          title: "Anasayfa",
          type: "item",
          icon: "feather icon-home",
          url: "/app/anasayfa/anasayfa",
        },
      ],
    },
    {
      id: "ui-element",
      title: "Menu",
      type: "group",
      icon: "icon-ui",
      children: [
        {
          id: "component",
          title: "Katagoriler",
          type: "collapse",
          icon: "feather icon-box",
          
          children: [
            {
              id: "breadcrumb",
              title: "Öğretmen",
              type: "item",
              url: "/basic/ogretmen",
            },
            {
              id: "badges",
              title: "Öğrenci",
              type: "item",
              url: "/basic/ogrenci",
            },
            {
              id: "collapse",
              title: "Firma",
              type: "item",
              url: "/basic/firma",
            },

            {
              id: "pagination",
              title: "Hami",
              type: "item",
              url: "/basic/hami",
            },

            {
              id: "tabs-pills",
              title: "Eşleşme",
              type: "item",
              url: "/basic/eslesme",
            },
            {
              id: "typography",
              title: "Ziyaret",
              type: "item",
              url: "/basic/ziyaret",
            },
          ],
        },
      ],
    },

    {
      id: "pages",
      title: "OKUL YÖNLENDİRME",
      type: "group",
      icon: "icon-pages",
      children: [
        {
          id: "documentation",
          title: "Ostim Teknik Üniversitesi",
          type: "item",
          icon: "feather icon-book",
          classes: "nav-item",
          url: "https://www.ostimteknik.edu.tr/meslek-yuksekokulu-81",
          target: true,
          external: true,
        },
      ],
    },
  ],
};

export default menuItems;
