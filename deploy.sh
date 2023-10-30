echo "Check master branch"
git checkout master

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r build/* root@213.171.5.243:/var/www/213.171.5.243/

echo "Done!"