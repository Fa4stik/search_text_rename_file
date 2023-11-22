echo "Check master branch"
git checkout master

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r build/* root@:/var/www/217.18.62.178/

echo "Done!"