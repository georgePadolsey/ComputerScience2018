echo "cleaning directory"
rm -rf -- _screen_dir
for f in $(find _no-flow-src/ -name *.js -not -path "_no-flow-src/node_modules/*" -not -path "src/internals/*" -not -path "src/flow-typed/*" -not -path "src/dll/*"); do 
	echo ${f#_no-flow-src/}
	screenshotr --forceDir -O -f $f -o "_screen_dir/"${f#_no-flow-src/} -n "src/"${f#_no-flow-src/}
done