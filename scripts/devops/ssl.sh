#!/bin/bash
# shellcheck disable=SC2154
# shellcheck disable=SC2087

mkdir -p ".ssl/${branch}"
root_certs="/etc/letsencrypt/live/$site"

php_fpm="<FilesMatch \.php$>
      		SetHandler \"proxy:unix:/run/php/php${php}-fpm.sock\|fcgi://localhost\"
      	</FilesMatch>";

if [ "${env}" = "local" ]; then
	php_fpm=""
fi

ssh ${env}.enclos.ca bash <<EOF
sudo su root
host="<VirtualHost *:80>
	ServerName ${site}
	${other_aliases_vhost}
	DocumentRoot /var/www/${site}/${vhost_root_public_html}
	ErrorLog \${APACHE_LOG_DIR}/error.log
	CustomLog \${APACHE_LOG_DIR}/access.log combined
	Alias /robots.txt /var/www/html/robots.txt
	<Directory /var/www/${site}/${vhost_root_public_html}>
		AllowOverride All
	</Directory>
	${php_fpm}
</VirtualHost>";
if [ "${force}" = "1" ]; then
	echo Deleting previous certificates.
	cd /etc/letsencrypt
	find -type d -name '*${site}*' -exec rm -rf {} \;
	find -type f -name '*${site}*' -exec rm -rf {} \;
	cd /etc/apache2
	find -name '*${site}*' -exec rm -rf {} \;
	cd
fi
if [ ! -d "$root_certs" ]; then
	echo "\$host" | sudo tee /etc/apache2/sites-available/"$site".conf > /dev/null
	a2ensite "$site".conf > /dev/null
	sudo certbot run -d ${site} ${other_aliases_certbot} -n --apache --redirect --expand 2>&1
fi
exit
user_certs="/home/\$USER/.ssl/$site"
mkdir -p "\$user_certs"
sudo cp "$root_certs/fullchain.pem" "\$user_certs/fullchain.pem"
sudo cp "$root_certs/privkey.pem" "\$user_certs/privkey.pem"
sudo chown \$USER:\$USER -R \$user_certs
sudo chmod 700 -R \$user_certs
EOF

if [ "${env}" = "local" ]; then
	scp ${env}.enclos.ca:"/etc/letsencrypt/options-ssl-apache.conf" "./.ssl/${branch}/options-ssl-apache.conf" > /dev/null
	scp ${env}.enclos.ca:"~/.ssl/$site/fullchain.pem" "./.ssl/${branch}/fullchain.pem" > /dev/null
	scp ${env}.enclos.ca:"~/.ssl/$site/privkey.pem" "./.ssl/${branch}/privkey.pem" > /dev/null
fi
