module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "google",
        "plugin:prettier/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "prettier/prettier": [
            "error",
            {
                "trailingComma": "es5",
                "singleQuote": true,
                "printWidth": 120,
                "tabWidth": 4,
                "arrowParens": "always"
            }
        ],
        
    }
};