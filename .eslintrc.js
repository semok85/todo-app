module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['airbnb', 'prettier'],
    plugins: ['prettier'],
    rules: {
        'import/no-extraneous-dependencies': 'off',
        'prettier/prettier': ['error'],
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    overrides: [
        {
            files: ['**/*.test.js', '**/*.spec.js'],
            env: {
                jest: true,
            },
        },
    ],
}
