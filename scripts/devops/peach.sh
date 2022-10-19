#!/bin/bash

project=$1
source_branch=$2
source_env=$3
destination_branch=$4
destination_env=$5
dump=$6

cd scripts/devops

old="${other_client}.${source_branch}.${source_env}.enclos.ca"
new="${other_client}.${destination_branch}.${destination_env}.enclos.ca"
node peach_manager.js "${old}" "${new}" "${dump}"
node peach_manager.js "http://${new}" "https://${new}" "${dump}"

if [ -f ../../config/peach.sh ]; then
        . ../../config/peach.sh "${project}" "${source_branch}" "${source_env}" "${destination_branch}" "${destination_env}" "${dump}"
fi

# shellcheck disable=SC2154
if [ -f "../../config/${destination_branch}-${destination_env}/peach.sh" ]; then
        # shellcheck disable=SC1090
        . "../../config/${destination_branch}-${destination_env}/peach.sh" "${project}" "${source_branch}" "${source_env}" "${destination_branch}" "${destination_env}" "${dump}"
fi

cd ../..
