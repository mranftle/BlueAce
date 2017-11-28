docker-compose up --build -d nginx-proxy
docker-compose up --build -d letsencrypt-nginx
docker-compose up --build -d pairs_api
docker-compose up --build -d pairs_app
