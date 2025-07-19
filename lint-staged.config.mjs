const config = {
  "*.{js,jsx,ts,tsx}": [
    "bun format:check",
    "cross-env SKIP_ENV_VALIDATION=1 bun lint:ts",
  ],
  "*.{json,md,css,scss,html,yml,yaml}": ["bun format:check"],
};

export default config;
