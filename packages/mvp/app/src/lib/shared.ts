export interface EmailInfo {
	label: string;
	email: string;
};

export interface PhoneInfo {
	label: string;
	phone: string;
};

export interface AddressInfo {
	label: string;
	street1: string;
	street2: string;
	city: string;
	state: string;
	zip: number;
};

export interface LinkInfo {
	label: string;
	/** A webpage URL. */
	link: string;
};
