project=wordgame
branch=$(git symbolic-ref --short HEAD)

echo Backup Database
mkdir -p ./db
db="${project}_${branch}_dev"
ssh ubuntu@dev.enclos.ca "sudo mysqldump --hex-blob ${db}" > ./db/backup.sql
