import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Empower Your API Strategy with Azure API Center ',
  tagline: 'Streamline API Development, Governance, Discovery & Consumption with API Center',
  favicon: 'img/logo.svg',
  url: 'https://Azure-Samples.github.io',
  baseUrl: '/API-Center-Workshop/', // Usually your repo name.
  organizationName: 'Azure-Samples', // Usually your GitHub org/user name.
  projectName: 'API-Center-Workshop', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          path: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'API Center Workshop',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Workshop',
        },
        // {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/Azure-Samples/API-Center-Workshop',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: "API Center Logo",
        src: "img/logo.svg",
        href: "https://developer.microsoft.com/en-us/build-apis",
        width: 160,
        height: 51,
      },
      copyright: `Copyright © ${new Date().getFullYear()} Microsoft - Made with ♥️ by API Center Team & JavaScript Advocacy`,
      links: [],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
