all: tww serve

serve:
	brave http://localhost:1313 >/dev/null 2>&1 &
	hugo server -D -p 1313 --navigateToChanged

tw:
	./themes/congo/node_modules/tailwindcss/lib/cli.js -c ./themes/congo/tailwind.config.js -i ./themes/congo/assets/css/main.css -o ./assets/css/compiled/main.css --jit >/dev/null
tww:
	./themes/congo/node_modules/tailwindcss/lib/cli.js -c ./themes/congo/tailwind.config.js -i ./themes/congo/assets/css/main.css -o ./assets/css/compiled/main.css --jit --watch >/dev/null
