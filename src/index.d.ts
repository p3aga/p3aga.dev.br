interface Author {
  Name: string;
  Email: string;
  Year: number;
}

interface SiteConfig {
  Lang: string;
  SiteName: string;
  Author: Author;
  UserLinks: Array<{
    icon: string;
    url: string;
    alt: string;
  }>;
  menuLinks: Array<{
    path: string;
    title: string;
  }>;
}

export type { Author, SiteConfig };
