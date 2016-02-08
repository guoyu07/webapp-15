echo 'Removing old webapp...'
rm -rf webapp
mkdir webapp

echo 'Unzipping new webapp...'
tar -zxvf webapp.tar.gz -C webapp
