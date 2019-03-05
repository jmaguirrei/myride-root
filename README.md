
## Start Process at PM2 with names
pm2 start start.js --env production --name myride-app
pm2 start start.js --env production --name myride-sign
pm2 start start.js --env production --name myride-www

## Erase logs
pm2 flush

## Stop and Del process
pm2 del 0 1 2

# Update GIT Repos and restart PROCESS
bash /home/jmaguirrei/apps/myride/update.sh
