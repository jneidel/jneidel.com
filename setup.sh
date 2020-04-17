#! /bin/sh

if [ "$1" = "--help" ] || [ "$1" = "-h" ] || [ "$1" = "help" ]; then
  cat << EOF
$ ./setup.sh
Initial setup
EOF
  exit
fi

mkdir -p src/bundles/md src/data/md
