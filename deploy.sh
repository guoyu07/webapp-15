ember build --environment=production

echo 'Removing old webapp archive...'
rm tmp/webapp.zip

echo 'Creating new webapp archive...'
tar -zcvf tmp/webapp.tar.gz -C dist .

echo 'Copying webapp archive to remote machine...'
scp tmp/webapp.tar.gz admin@app.wwoof.fr:/home/admin

echo 'Performing remote deployment steps...'
ssh admin@app.wwoof.fr 'bash -s' < extract_archive.sh

echo 'Deployment complete. Aww yeah!'
