export const links: (
	| { name: { en: string; fr?: string }; href: { en: string; fr?: string } }
	| 'divider'
)[] = [
	{
		name: {
			en: 'Folio'
		},
		href: {
			en: '/'
		}
	},
	{
		name: {
			en: 'Books',
			fr: 'Livres'
		},
		href: {
			en: '/books',
			fr: '/livres'
		}
	},
	'divider',
	{
		name: {
			en: 'About',
			fr: 'À propos'
		},
		href: {
			en: '/about',
			fr: '/a-propos'
		}
	},

	// {
	// 	name: {
	// 		en: 'Shop',
	// 		fr: 'Boutique'
	// 	},
	// 	href: {
	// 		en: '/shop',
	// 		fr: '/boutique'
	// 	}
	// },
	{
		name: {
			en: 'Contact'
		},
		href: {
			en: '/contact'
		}
	},
	{
		name: {
			en: 'Linktree'
		},
		href: {
			en: '/linktree'
		}
	}

	// {
	// 	name: {
	// 		en: 'Instagram'
	// 	},
	// 	href: 'https://www.instagram.com/gduboisstudio/'
	// 	en: '/contact',

	// 	}
	// },
	// {
	// 	name: {
	// 		en: 'Folio'
	// 	},
	// 	href: '/contact'
	// }
];
