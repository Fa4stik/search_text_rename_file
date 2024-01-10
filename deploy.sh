echo "Check master branch"
git checkout master

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r build/* root@94.241.142.115:/var/www/94.241.142.115/

echo "Done!"