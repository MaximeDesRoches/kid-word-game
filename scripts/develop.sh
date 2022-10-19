#!/bin/bash

project=wordgame

source_branch=$1
source_env=$2
destination_branch=$3
destination_env=$4

if [ -d dist/wp-content ]; then
	wordpress=1
else
	wordpress=0
fi

echo Sync Database
mkdir -p ./db
source_db="${project}_${source_branch}_${source_env}"
destination_db="${project}_${destination_branch}_${destination_env}"
# shellcheck disable=SC2029
ssh ubuntu@dev.enclos.ca "sudo mysqldump --hex-blob ${source_db}" > ./db/${source_db}.sql
sed 's/utf8mb4_0900_ai_ci/utf8mb4_unicode_ci/g' ./db/${source_db}.sql > ./db/${source_db}_fixed.sql
rm ./db/${source_db}.sql
mv ./db/${source_db}_fixed.sql ./db/${source_db}.sql
if [ "${wordpress}" = "1" ]; then
	if [ -f ./scripts/devops/peach.sh ]; then
		. ./scripts/devops/peach.sh "${project}" "${source_branch}" "${source_env}" "${destination_branch}" "${destination_env}" "$(pwd)/db/${source_db}.sql"
	fi
fi
ssh ubuntu@dev.enclos.ca "sudo mysql --execute=\"DROP DATABASE IF EXISTS \\\`${destination_db}\\\`; CREATE DATABASE \\\`${destination_db}\\\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;\""
ssh ubuntu@dev.enclos.ca "sudo mysql -D \"${destination_db}\"" < ./db/${source_db}.sql

if [ "${wordpress}" = "0" ]; then
		password=$(python3 ./scripts/devops/regex_helper.py "((['\"]dbPass['\"]\W*=>)|(dbPass\W*=))\W*['\"](?P<target>[^'\"]*)[\"']" ./config/${destination_branch}-${destination_env}/config/EnvConfig.php)
fi
if [ "${wordpress}" = "1" ]; then
		password=$(python3 ./scripts/devops/regex_helper.py "['\"]DB_PASSWORD['\"]\W*,\W*['\"](?P<target>[^'\"]*)[\"']" ./config/${destination_branch}-${destination_env}/config.php)
fi
if [ "${password}" != "" ] ; then
		ssh ubuntu@dev.enclos.ca "sudo mysql --execute=\"DROP USER IF EXISTS '${project}_${destination_branch}_${destination_env}'@'localhost';\""
		ssh ubuntu@dev.enclos.ca "sudo mysql --execute=\"CREATE USER '${project}_${destination_branch}_${destination_env}'@'localhost' IDENTIFIED WITH mysql_native_password BY '${password}';\""
		ssh ubuntu@dev.enclos.ca "sudo mysql --execute=\"GRANT ALL ON \\\`${project}_${destination_branch}_${destination_env}\\\`.* TO '${project}_${destination_branch}_${destination_env}'@'localhost' WITH GRANT OPTION;\""
fi
