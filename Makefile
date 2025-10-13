all: tww serve

serve:
	firefox http://localhost:1313 >/dev/null 2>&1 &
	hugo server -D -p 1313 --navigateToChanged --baseURL="http://localhost"

tw: themes/congo/node_modules  # tailwind
	./themes/congo/node_modules/tailwindcss/lib/cli.js -c ./themes/congo/tailwind.config.js -i ./themes/congo/assets/css/main.css -o ./assets/css/compiled/main.css --jit >/dev/null
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

buildDrafts: assets/css/compiled/main.css
	HUGO_ENV=production hugo --gc --minify --buildDrafts -b ${DEPLOY_PRIME_URL}

_:
	mkdir -p _
	ln -s ../content/review _/review
	ln -s ../content/guide _/guide
	ln -s ../content/project _/project
	ln -s ../content/essay _/essay
	ln -s ../content/newsletter _/newsletter
	ln -s ../layouts _/…layout
	ln -s ../layouts/shortcodes/glossary _/glossary

descriptions:
	short-descriptions .

titles:
	short-titles .

clear-cache:
	rm -r public
	git restore public/_redirects

bin:
	CGO_ENABLED=1 go install -tags extended github.com/gohugoio/hugo@v0.151.0

copy:
	cp -r public/en/* ~/html/jneidel.com
	cp -r public/de/* ~/html/jneidel.de

pull:
	git fetch origin master
	git reset --hard origin/master
	git submodule update

push:
	git push origin master

deploy: pull build copy

update: push
	ssh u 'zsh -lc "cd git/web; make deploy"'
