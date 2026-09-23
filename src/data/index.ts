import siteData from './site.json';

export type NavItem = {
    label: string;
    href: string;
    show: boolean;
    children?: { label: string; href: string; show: boolean; }[];
};

/**
 * Site configuration loaded from src/data/site.json.
 */
export const siteConfig = {
    url: siteData.site.url,
    language: siteData.site.language,
    title: siteData.site.title,
    description: siteData.site.description,
    favicon: siteData.site.favicon,

    author: {
        email: siteData.contact.email,
        ...siteData.author
    },
    contact: {
        tel: '',
        ...siteData.contact
    },
    social: siteData.contact.social,
    contactPage: siteData.contactPage,

    nav: siteData.nav as NavItem[],
} as const;
