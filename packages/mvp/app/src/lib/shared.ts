import { z } from 'astro:schema';

export interface EmailInfo {
	label: string;
	email: string;
};

export const EmailInfoSchema = z.strictObject({
	label: z.string(),
	email: z.string().email(),
}) satisfies z.ZodType<EmailInfo>;

export interface PhoneInfo {
	label: string;
	phone: string;
};

export const PhoneInfoSchema = z.strictObject({
	label: z.string(),
	phone: z.string(),
}) satisfies z.ZodType<PhoneInfo>;

export interface AddressInfo {
	label: string;
	street1: string;
	street2: string;
	city: string;
	state: string;
	zip: number;
};

export const AddressInfoSchema = z.strictObject({
	label: z.string(),
	street1: z.string(),
	street2: z.string(),
	city: z.string(),
	state: z.string(),
	zip: z.number(),
}) satisfies z.ZodType<AddressInfo>;

export interface LinkInfo {
	label: string;
	/** A webpage URL. */
	link: string;
};

export const LinkInfoSchema = z.strictObject({
	label: z.string(),
	link: z.string().url(),
}) satisfies z.ZodType<LinkInfo>;
