
export default {
    extends: "../lage.config.js", // allows extending settings similar to tsconfig. This can be a path -or- a resolvable node module.
    pipelines: {
        // inherits the build and bundle from common settings, but at this layer we are adding test support.
        // in reality we'll share test and lint, just illustrative :)
        test: {
            dependsOn: ["build"],
            inputs: "src/test/**",
        },
        lint: {
            inputs: ["src/**", ".eslintrc.js", "{workspaceRoot}/.eslintrc.js", "{workspaceRoot}/prettier.config.js" ], // this repo uses shared prettier config 
            outputs: ["logs/**"], // Lint should only have outputs.
            options: {
                "untrackedFolder": "node_modules/.cache", // Tell BuildXL to ignore the node_modules/.cache folder because we will place our trust in eslints incrementality
                "environment": {
                    // set environment variable so that eslint's cache is forced into the shared untracked cache folder.
                    "ESLINT_CACHE": "node_modules/.cache/eslint"
                }
            }
        }
    }
}
