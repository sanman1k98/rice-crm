import { type ContactInit, createContact } from '@/lib/contacts';
import { AddressInfoSchema, EmailInfoSchema, LinkInfoSchema, PhoneInfoSchema } from '@/lib/shared';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

const ContactInitSchema = z.strictObject({
	firstName: z.string(),
	lastName: z.string(),
	jobTitle: z.string().nullable(),
	company: z.number().nullable(),
	addresses: AddressInfoSchema.array().nullable(),
	emails: EmailInfoSchema.array().nullable(),
	phones: PhoneInfoSchema.array().nullable(),
	links: LinkInfoSchema.array().nullable(),
	note: z.string().nullable(),
}) satisfies z.ZodType<ContactInit>;

const create = defineAction({
	accept: 'form',
	input: ContactInitSchema,
	handler: async (input, _ctx) => {
		// TODO: make sure the user isn't creating duplicate contacts.
		return createContact(input);
	},
});

export const contact = { create };
