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
      type: "linkedin",
      url: "https://www.linkedin.com/in/p3aga",
    },
    { type: "github", url: "https://github.com/p3aga" },
    { type: "codeberg", url: "https://codeberg.org/p3aga" },
    { type: "mail", url: `mailto:${author.Email}` },
  ],
  menuLinks: [
    { path: "blog", title: "Blog" },
    { path: "projects", title: "Projetos" },
    { path: "about", title: "Sobre" },
  ],
};

export default siteConfig;
