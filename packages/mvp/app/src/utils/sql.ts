import { sql } from "astro:db";

/**
 * Used to creaet SQL placeholders for prepared statements using the columns of tables.
 *
 * @deprecated This function is pretty hacky trying to work around the Astro DB API.
 */
export function createInsertPlaceholders<
  const TTable extends {
    _: { columns: Record<string, any> };
    $inferInsert: Record<string, any>;
  },
  TPlaceholders extends {
    [k in keyof TTable["$inferInsert"]]: ReturnType<typeof sql.placeholder<k & string>>;
  },
>(table: TTable): TPlaceholders {
  return Object.fromEntries(
    // @ts-ignore Astro DB types are wack
    Object.keys(table[Symbol.for("drizzle:Columns")]).map(col => [col, sql.placeholder(col)])
  ) as TPlaceholders;
}
