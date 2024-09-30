module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ["eslint:recommended", "plugin:node/recommended"],
    parserOptions: {
        ecmaVersion: 12, // ECMAScript 2021 version
        sourceType: "module",
    },
    rules: {
        // Customize rules if necessary
        "no-console": "off", // Example: allow console statements
        "node/no-unsupported-features/es-syntax": [
            "error",
            {
                ignores: ["modules"], // Allow ES Modules (import/export)
            },
        ],
    },
};
