import js from "@eslint/js";
import ts, { config as defineConfig } from "typescript-eslint";

const NAME_PREFIX = "user";

/**
 * @param {...string} scopes 
 * @returns {string} 
 */
function createRuleName(...scopes) {
  return [NAME_PREFIX, ...scopes].join("/");
}

export default defineConfig(
  {
    // Global ignores
    // @see https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores
    name: createRuleName("ignores"),
    ignores: ["**/dist/"],
  },

  {
    name: "eslint/js/recommended",
    ...js.configs.recommended,
  },

  ...ts.configs.strictTypeChecked,
  ...ts.configs.stylisticTypeChecked,

  {
    name: createRuleName("ts"),
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: [
          "./tsconfig.eslint.json",
          "./packages/mvp/app/tsconfig.json",
        ],
      },
    },
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  {
    name: createRuleName("ts", "tmp-hack"),
    files: ["packages/mvp/app/{db,src}/**"],
    rules: {
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
    }
  },
);
