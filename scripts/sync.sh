#!/bin/bash

project=wordgame
branch=$(git symbolic-ref --short HEAD)

if [ -d dist/wp-content ]; then
	wordpress=1
else
	wordpress=0
fi

if [ "$1" = "db"  ] || [ "$1" = "" ]; then
	echo Sync Database
	mkdir -p ./db
	db="${project}_${branch}_dev"
	# echo "Exporting ${db}..."
	# shellcheck disable=SC2029
	ssh ubuntu@dev.enclos.ca "sudo mysqldump --hex-blob ${db}" > ./db/dump.sql
	sed 's/utf8mb4_0900_ai_ci/utf8mb4_unicode_ci/g' ./db/dump.sql > ./db/dump-fixed.sql
	rm ./db/dump.sql
	mv ./db/dump-fixed.sql ./db/dump.sql
	if [ "${wordpress}" = "1" ]; then
		if [ -f ./scripts/devops/peach.sh ]; then
			# echo Peaching ./db/dump.sql...
			. ./scripts/devops/peach.sh "${project}" "${branch}" dev "${branch}" local "$(pwd)/db/dump.sql"
		fi
    fi
	# echo "Importing ${project}_${branch}_local..."
	mysql --execute="DROP DATABASE IF EXISTS \`${project}_${branch}_local\`; CREATE DATABASE \`${project}_${branch}_local\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;"
	mysql -D "${project}_${branch}_local" < ./db/dump.sql
fi

if [ "$1" = "media"  ] || [ "$1" = "" ]; then
	echo Sync Media
	# shellcheck disable=SC2087
	ssh dev.enclos.ca bash <<EOF
sudo mkdir --parents /var/medias/${project}
sudo chown ubuntu:www-data -R /var/medias/${project}
sudo chmod 775 -R /var/medias/${project}
EOF
	rsync --recursive --compress dev.enclos.ca:/var/medias/${project}/ ./dist
fi

if [ "${wordpress}" = "0" ]; then
	exit
fi

if [ "$1" = "lang"  ] || [ "$1" = "" ]; then
	echo Sync WPML Language files
	rsync --recursive --compress dev.enclos.ca:"/var/www/${project}.${branch}.dev.enclos.ca/public_html/wp-content/languages/wpml" ./dist/wp-content/languages/
fi
