
echo "cleaning directory"
rm -rf -- _no-flow-src
rsync -av --progress src/ _no-flow-src/ --exclude node_modules --exclude internals --exclude flow-typed --exclude dll --exclude release
echo "finished copy"
flow-remove-types -i "src\\\(flow-typed|internals|node_modules)\\\.*" src/ --out-dir _no-flow-src/ 
echo "removed flow types"
prettier --write "_no-flow-src/**/*.js"
echo "prettified :D"