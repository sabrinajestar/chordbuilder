module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: "./app.ts",
    output: {
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        extensionAlias: {
            ".js": [".js", ".ts"],
            ".cjs": [".cjs", ".cts"],
            ".mjs": [".mjs", ".mts"]
        }
    },
    module: {
        rules: [
            {
                // Match only .ts and .tsx files (not .d.ts declaration files)
                test: /\.tsx?$/,
                loader: "ts-loader",
                // Exclude node_modules and any TypeScript declaration files
                exclude: [/node_modules/, /\.d\.ts$/],
                // It's often useful to run ts-loader in transpileOnly mode and use
                // a separate type-checker plugin (fork-ts-checker-webpack-plugin).
                // If you prefer strict loader-based type checking, remove this option.
                options: {
                    transpileOnly: false
                }
            }
        ]
    }
};
