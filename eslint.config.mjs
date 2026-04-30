import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // SSR-safe lazy initialization 패턴(useEffect 내 setState 1회 호출)에는
      // 정상이라 룰을 끈다. cascading render 경고는 의도된 hydration 흐름이다.
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
