export default {
    pipelines: {
        // new (not yet proposed) feature: Allows shared defaults for all pipeline targets with *.
        "*": {
            options: {
                // Set some BuildXL options  for all targets.
                // When environment is set, all env vars will stop flowing in by default under BuildXL and only these
                // will be allowed in
                environment: {
                    "SRCROOT": {passthrough: true} // Tells BuildXL to take the SRCROOT variable as-is and pass it to the child process.
                    "BUILDROOT": {passthrough: true} // Tells BuildXL to take the SRCROOT variable as-is and pass it to the child process.
                }
            }
        },
        build: {
            dependsOn: ["^build"],
            inputs: ["src/**" ],
            outputs: ["lib/**", "logs/**" ] // all build outputs go to lib folder and all detailed log files go to logs folder
        },
        bundle: {
            dependsOn: ["build"],
            inputs: ["src/**", "assets/**", "^lib/**"], // Uses all source files and all asset files as well as the generated files from build verb
            outputs: ["dist/**", "logs/**"] // all bundle outputs go to dist folder and all detailed log files go to logs folder
        }
    }
}
