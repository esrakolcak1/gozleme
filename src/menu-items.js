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
          url: "/app/dashboard/default",
        },
      ],
    },
    {
      id: "ui-element",
      title: "TABLOLAR",
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
              url: "/basic/breadcrumb",
            },
            {
              id: "badges",
              title: "Öğrenci",
              type: "item",
              url: "/basic/badges",
            },
            {
              id: "collapse",
              title: "Firma",
              type: "item",
              url: "/basic/collapse",
            },

            {
              id: "pagination",
              title: "Hami",
              type: "item",
              url: "/basic/pagination",
            },

            {
              id: "tabs-pills",
              title: "Eşleşme",
              type: "item",
              url: "/basic/tabs-pills",
            },
            {
              id: "typography",
              title: "Ziyaret",
              type: "item",
              url: "/basic/typography",
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
