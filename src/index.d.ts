interface Author {
  Name: string;
  Email: string;
  Year: number;
}

interface UserLink {
  type: "linkedin" | "github" | "codeberg" | "mail" | "x" | "instagram";
  url: string;
}

interface SiteConfig {
  Lang: string;
  SiteName: string;
  Author: Author;
  UserLinks: Array<UserLink>;
  menuLinks: Array<{
    path: string;
    title: string;
  }>;
}

export type { Author, UserLink, SiteConfig };
