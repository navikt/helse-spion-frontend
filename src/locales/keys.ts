export enum Keys {
	MY_PAGE = 'MY_PAGE',
	ALL_REFUNDS = 'ALL_REFUNDS',
}

export const translations: IncludedKeys = {
	[Keys.MY_PAGE]: {
		nb: 'Min side - refusjoner',
		nn: 'Mi side - refusjonar',
		en: 'My page - refunds',
	},
	
	[Keys.ALL_REFUNDS]: {
		nb: 'Alle refusjoner',
		nn: 'Alle refusjonar',
		en: 'All refunds',
	},
};

export enum Languages {
	nb = 'nb',
	nn = 'nn',
	en = 'en',
}

type IncludedKeys = {
	[P in Keys]: {
		[P in Languages]: string
	}
}

export const translationsToJson = (lan: Languages): Object => {
	let translatedKeys = {};
	Object.keys(translations).map(e => translatedKeys[e] = translations[e][lan]);
	return translatedKeys;
};
