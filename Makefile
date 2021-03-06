
COMPONENT = node_modules/component/bin/component
UGLIFY = node_modules/uglify-js/bin/uglifyjs
PHANTOM = node_modules/.bin/mocha-phantomjs
LINT = node_modules/.bin/jslint

build: components scripts/*.js styles/*.css
	@component build --dev

components: component.json
	@component install --dev

dist: components scripts/*.js styles/*.css
	$(COMPONENT) build --standalone tsld --out dist --name tsld
	$(UGLIFY) dist/tsld.js --output dist/tsld.min.js

test: lint build
	$(PHANTOM) test/index.html

lint:
	$(LINT) scripts/*.js

clean:
	rm -fr build components template.js

.PHONY: clean dist test release
