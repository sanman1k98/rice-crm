import { z } from 'astro:schema';

export const EmailInfoSchema = z.strictObject({
	label: z.string(),
	email: z.string().email(),
});

export const PhoneInfoSchema = z.strictObject({
	label: z.string(),
	phone: z.string(),
});

export const AddressInfoSchema = z.strictObject({
	label: z.string(),
	street1: z.string(),
	street2: z.string(),
	city: z.string(),
	state: z.string(),
	zip: z.number(),
});

export const LinkInfoSchema = z.strictObject({
	label: z.string(),
	link: z.string().url(),
});

export type EmailInfo = z.infer<typeof EmailInfoSchema>;
export type PhoneInfo = z.infer<typeof PhoneInfoSchema>;
export type AddressInfo = z.infer<typeof AddressInfoSchema>;
export type LinkInfo = z.infer<typeof LinkInfoSchema>;
