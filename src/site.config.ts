import type { Author, SiteConfig } from "@/index";

const author: Author = {
  Name: "Pedro Henrick Queiroz",
  Email: "pedrohenrickqa@gmail.com",
  Year: 2026,
};

const siteConfig: SiteConfig = {
  Lang: "pt-BR",
  SiteName: "P3AGA",
  Author: author,
  UserLinks: [
    {
      icon: "linkedin",
      url: "https://www.linkedin.com/in/p3aga",
      alt: "LinkedIn",
    },
    { icon: "github", url: "https://github.com/p3aga", alt: "GitHub" },
    { icon: "codeberg", url: "https://codeberg.org/p3aga", alt: "Codeberg" },
    { icon: "maildotru", url: `mailto:${author.Email}`, alt: "Email" },
  ],
  menuLinks: [
    { path: "blog", title: "Blog" },
    { path: "projects", title: "Projetos" },
    { path: "about", title: "Sobre" },
  ],
};

export default siteConfig;
