#!/bin/bash

other_aliases=()
other_aliases_vhost=""
other_aliases_certbot=""

if [ -f ./config/other_aliases.sh ]; then
        sudo chmod +x ./config/other_aliases.sh
        . ./config/other_aliases.sh
fi

if [ -f "./config/${branch}-${env}/other_aliases.sh" ]; then
        sudo chmod +x "./config/${branch}-${env}/other_aliases.sh"
        # shellcheck disable=SC1090
        . "./config/${branch}-${env}/other_aliases.sh"
fi

for i in ${!other_aliases[@]}; do
	other_aliases_vhost="${other_aliases_vhost}ServerAlias ${other_aliases[$i]}"
	if [[ $((i+1)) -lt ${#other_aliases[@]} ]]; then
		other_aliases_vhost="${other_aliases_vhost}
	"
	fi
done

for i in ${!other_aliases[@]}; do
	other_aliases_certbot="${other_aliases_certbot}-d ${other_aliases[$i]}"
	if [[ $((i+1)) -lt ${#other_aliases[@]} ]]; then
		other_aliases_certbot="${other_aliases_certbot} "
	fi
done
