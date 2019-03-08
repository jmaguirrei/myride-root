

## Update GIT Repos and restart PROCESS
bash /home/jmaguirrei/apps/myride/update.sh


## PM2
pm2 start start.js --env production --name myride-app
pm2 start start.js --env production --name myride-sign
pm2 start start.js --env production --name myride-www
pm2 flush
pm2 del 0 1 2
pm2 list
pm2 logs 1


## NGINX
sudo service nginx restart
sudo nano /var/log/nginx/access.log
sudo nano /var/log/nginx/error.log
sudo nano /etc/nginx/nginx.conf
sudo nano /etc/nginx/conf.d/jmaguirre.conf
sudo nano /home/jmaguirrei/apps/myride/_root/env/nginx_conf

