#! /bin/bash
cd /Users/jmaguirrei/MEGA/MEGAsync/Development/libs/client
npm run git
echo -e "\033[1;32m--------------------------------------------------------------> client: done. \033[0m"
cd /Users/jmaguirrei/MEGA/MEGAsync/Development/libs/server
npm run git
echo -e "\033[1;32m--------------------------------------------------------------> server: done. \033[0m"
cd /Users/jmaguirrei/MEGA/MEGAsync/Development/apps/myride/_root
npm run git
echo -e "\033[1;32m--------------------------------------------------------------> _root: done. \033[0m"
cd /Users/jmaguirrei/MEGA/MEGAsync/Development/apps/myride/www
npm run git
echo -e "\033[1;32m--------------------------------------------------------------> www: done. \033[0m"
cd /Users/jmaguirrei/MEGA/MEGAsync/Development/apps/myride/sign
npm run git
echo -e "\033[1;32m--------------------------------------------------------------> sign: done. \033[0m"
cd /Users/jmaguirrei/MEGA/MEGAsync/Development/apps/myride/app
npm run git
echo -e "\033[1;32m--------------------------------------------------------------> app: done. \033[0m"
cd /Users/jmaguirrei/MEGA/MEGAsync/Development/apps/myride/_root

