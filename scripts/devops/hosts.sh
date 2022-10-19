#!/bin/bash

ipv6=::1
ip=127.0.0.1

# shellcheck disable=SC2154
if ! grep -q "$site$" /etc/hosts ; then
	echo "$ipv6	$site" | sudo tee -a /etc/hosts > /dev/null
	echo "$ip	$site" | sudo tee -a /etc/hosts > /dev/null
fi

# shellcheck disable=SC2154
for alias in ${other_aliases[@]}; do
if ! grep -q "$alias$" /etc/hosts ; then
	echo "$ipv6	$alias" | sudo tee -a /etc/hosts > /dev/null
	echo "$ip	$alias" | sudo tee -a /etc/hosts > /dev/null
fi
done
