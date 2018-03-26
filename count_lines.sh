(find src/**/* -not -path "src/node_modules/*" -not -path "src/internals/*" -not -path "src/flow-typed/*" -not -path "src/release/*" -not -path "src/dll/*" -print0 | xargs -0 cat ) | wc -l
