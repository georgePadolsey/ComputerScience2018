echo "cleaning directory"
rm -rf -- _screen_dir
find _no-flow-src/ -name *.js -not -path "_no-flow-src/node_modules/*" -not -path "src/internals/*" -not -path "src/flow-typed/*" -not -path "src/dll/*" -exec screenshotr --forceDir -O -f {} -o "_screen_dir/{}" --name {} \;