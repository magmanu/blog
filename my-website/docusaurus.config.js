// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const editUrl = 'https://github.com/magmanu/blog/tree/main/';

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Manu Magalhães',
    tagline: 'DevSecOps Engineer',
    favicon: 'img/logo_accent_light.png',

    url: 'https://magmanu.github.io/',
    baseUrl: '/blog', // For GitHub pages deployment, it is often '/<projectName>/'
    organizationName: 'magmanu', // Usually your GitHub org/user name.
    projectName: 'blog', // Usually your repo name.
    
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'pt-BR'],
        localeConfigs: {
            en: {
                htmlLang: 'en',
            }
        },
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    editUrl
                },
                blog: {
                    id: 'blog',
                    routeBasePath: 'blog',
                    blogTitle: 'Easter Egg',
                    showReadingTime: true,
                    blogDescription: 'Testing space',
                    postsPerPage: 5,
                    blogSidebarTitle: 'Recent Articles',
                    blogSidebarCount: 10,
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: 'img/logo_accent_light.png',
            navbar: {
                title: 'Manu Magalhães',
                logo: {
                    alt: 'magmanu',
                    src: 'img/logo_accent_light.png',
                },
                items: [
                    {
                        to: '/tech',
                        label: 'Tech',
                        position: 'right'
                    },
                    {
                        to: '/personal',
                        label: 'Personal',
                        position: 'right'
                    },
                    // {
                    //   href: 'https://github.com/magmanu/blog',
                    //   label: 'Source',
                    //   position: 'right',
                    // },
                    //   {
                    //     type: 'docSidebar',
                    //     sidebarId: 'tutorialSidebar',
                    //     position: 'right',
                    //     label: '[Series]',
                    //   },
                    {
                        type: 'localeDropdown',
                        position: 'right',
                    }
                ],
                hideOnScroll: true,
            },
            footer: {
                style: 'dark',
                links: [
                    //   {
                    //     title: 'Docs',
                    //     items: [
                    //       {
                    //         label: 'Tutorial',
                    //         to: '/docs/intro',
                    //       },
                    //     ],
                    //   },
                    {
                        title: 'Social',
                        items: [
                            {
                                label: 'LinkedIn',
                                href: 'https://www.linkedin.com/in/manumagalhaes/',
                            },
                            {
                                label: 'Twitter',
                                href: 'https://twitter.com/manumagalhaes',
                            },
                        ],
                    },
                    {
                        title: 'More',
                        items: [
                            //   {
                            //     label: 'Blog',
                            //     to: '/blog',
                            //   },
                            {
                                label: 'GitHub',
                                href: 'https://github.com/magmanu',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Manu Magalhães. Built with Docusaurus.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
    plugins: [
        [
            'content-blog',
            /** @type {import('@docusaurus/plugin-content-blog').Options} */
            {
                id: 'personal',
                routeBasePath: 'personal',
                path: 'personal',
                blogTitle: "I've been thinking...",
                blogDescription: 'Thinking Out Loud',
                authorsMapPath: 'authors.yml',
                blogSidebarTitle: 'Recent Thoughts',
                feedOptions: {
                    type: 'all',
                    title: 'Blog by Manu Magalhães',
                    description: 'Who on Earth still has blog?',
                },
            },
        ],
        [
            'content-blog',
            /** @type {import('@docusaurus/plugin-content-blog').Options} */
            {
                id: 'tech',
                routeBasePath: 'tech',
                path: 'tech',
                authorsMapPath: 'authors.yml',
                blogSidebarTitle: 'Most Recent Articles',
                blogTitle: "Tech Musings",
                feedOptions: {
                    type: 'all',
                    title: 'Code, Cloud, App Security and more',
                    description: 'A Journey in Tech',
                },
            },
        ],
    ],
};

module.exports = config;
