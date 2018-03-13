
cp -r src/ no-flow-src
for f in $(find no-flow-src/ -name "*.js")
do
	flow-remove-types $f > $f
done