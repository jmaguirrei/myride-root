

## Update GIT Repos and restart PROCESS
bash /home/jmaguirrei/apps/myride/update.sh


## PM2
NODE_ENV=production pm2 start start.js --name myride-app
NODE_ENV=production pm2 start start.js --name myride-sign
NODE_ENV=production pm2 start start.js --name myride-www
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

