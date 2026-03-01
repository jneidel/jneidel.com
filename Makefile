export BROWSERSLIST_IGNORE_OLD_DATA=1

all: tww serve install-hooks

serve:
	firefox http://localhost:1313 >/dev/null 2>&1 &
	hugo server -D -p 1313 --navigateToChanged --baseURL="http://localhost"

tw: themes/congo/node_modules  # tailwind
	./themes/congo/node_modules/tailwindcss/lib/cli.js -c ./themes/congo/tailwind.config.js -i ./themes/congo/assets/css/main.css -o ./assets/css/compiled/main.css --minify
tww: themes/congo/node_modules # tailwind watch
	./themes/congo/node_modules/tailwindcss/lib/cli.js -c ./themes/congo/tailwind.config.js -i ./themes/congo/assets/css/main.css -o ./assets/css/compiled/main.css --jit --watch >/dev/null

themes/congo/node_modules:
	git submodule init
	git submodule update
	npm install --prefix ./themes/congo

assets/css/compiled/main.css: themes/congo/node_modules
	./themes/congo/node_modules/tailwindcss/lib/cli.js -c ./themes/congo/tailwind.config.js -i ./themes/congo/assets/css/main.css -o ./assets/css/compiled/main.css ---minify

build: assets/css/compiled/main.css
	HUGO_ENV=production hugo --gc --minify

test: assets/css/compiled/main.css
	HUGO_ENV=production hugo --gc --minify --templateMetrics --templateMetricsHints --printPathWarnings

_:
	mkdir -p _
	ln -s ../content/review _/review
	ln -s ../content/guide _/guide
	ln -s ../content/project _/project
	ln -s ../content/essay _/essay
	ln -s ../content/newsletter _/newsletter
	ln -s ../layouts _/…layout
	ln -s ../layouts/shortcodes/glossary _/glossary

install-hooks: .git/hooks/pre-commit .git/hooks/pre-push

.git/hooks/pre-commit: git-hooks/pre-commit .git/hooks
	cp $< $@

.git/hooks/pre-push: git-hooks/pre-push .git/hooks
	cp $< $@

descriptions:
	short-descriptions .

titles:
	short-titles .

clear-cache:
	rm -r public
	git restore public/_redirects

write-hugo-version:
	hugo version | grep -Po "\d+\.\d+\.\d+" >.hugo-version

install-hugo:
	required_version="$$(cat .hugo-version)"; \
	local_version="$$(hugo version | grep -Po "\d+\.\d+\.\d+")"; \
	if [ "$$local_version" != "$$required_version" ]; then \
		CGO_ENABLED=1 go install -tags extended github.com/gohugoio/hugo@v$$required_version; \
	fi

copy:
	rm -rf public/de/de public/de/en public/en/de public/en/en
	cp -r public/en/* ~/html/jneidel.com
	cp -r public/de/* ~/html/jneidel.de

pull:
	git fetch origin master
	git reset --hard origin/master
	git submodule update

sync-generated-md:
	rsync -avrp --delete content u:git/web

reset:
	git reset --hard
	git clean -df

deploy: reset tw build copy

publish: # run via a custom git publish
	ssh u 'zsh -lc "cd git/web; make pull; make install-hugo"'
	$(MAKE) sync-generated-md
	ssh u 'zsh -lc "cd git/web; make deploy"'
