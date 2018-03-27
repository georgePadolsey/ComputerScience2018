echo "cleaning directory"
rm -rf -- _screen_dir
for f in $(find src/ -name *.js -not -path "src/node_modules/*" -not -path "src/internals/*" -not -path "src/flow-typed/*" -not -path "src/dll/*"); do 
	echo ${f#src/}
	screenshotr --forceDir -O -f $f -o "_screen_dir/"${f#src/} -n "src/"${f#src/}
done