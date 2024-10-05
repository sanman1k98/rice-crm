/**
 * @file CRUD operations for labels.
 */
import { db, eq, Label, sql } from 'astro:db';

type LabelInfo = typeof Label.$inferSelect;
type LabelId = LabelInfo['id'];
type LabelInit = Omit<typeof Label.$inferInsert, | 'id'>;

export async function createLabel(opts: LabelInit) {
	return db
		.insert(Label)
		.values(opts)
		.returning()
		.get();
}

const selectLabel = db
	.select()
	.from(Label)
	.where(eq(Label.id, sql.placeholder('id')))
	.prepare();

export async function getLabelInfo(id: LabelId) {
	return selectLabel.get({ id });
}
