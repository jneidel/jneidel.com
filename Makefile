all: tww serve

serve:
	${BROWSER} http://localhost:1313 >/dev/null 2>&1 &
	hugo server -D -p 1313 --navigateToChanged

tw: themes/congo/node_modules
	./themes/congo/node_modules/tailwindcss/lib/cli.js -c ./themes/congo/tailwind.config.js -i ./themes/congo/assets/css/main.css -o ./assets/css/compiled/main.css --jit >/dev/null
tww: themes/congo/node_modules
	./themes/congo/node_modules/tailwindcss/lib/cli.js -c ./themes/congo/tailwind.config.js -i ./themes/congo/assets/css/main.css -o ./assets/css/compiled/main.css --jit --watch >/dev/null

themes/congo/node_modules:
	git submodule init
	git submodule update
	npm install --prefix ./themes/congo

assets/css/compiled/main.css: themes/congo/node_modules
	./themes/congo/node_modules/tailwindcss/lib/cli.js -c ./themes/congo/tailwind.config.js -i ./themes/congo/assets/css/main.css -o ./assets/css/compiled/main.css ---minify

build: assets/css/compiled/main.css
	hugo --gc --minify -b ${URL}

preview: assets/css/compiled/main.css
	hugo --gc --minify -D -b ${DEPLOY_PRIME_URL}
