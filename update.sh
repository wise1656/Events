kill -9 `lsof -t -i:3000`
git pull
cd ./frontend
npm run build
cd ../backend
npm run build
npm run start &