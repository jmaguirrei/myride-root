#! /bin/bash
clear
echo -e "\033[1;32m----------------------------------------------------------------------> Resize started ... \033[0m"
sips screen_640x1136.png -z 1334 750 --out screen_750x1334.png
sips screen_640x1136.png -z 2436 1125 --out screen_1125x2436.png
sips screen_640x1136.png -z 2208 1242 --out screen_1242x2208.png
sips screen_640x1136.png -z 1792 828 --out screen_828x1792.png
sips screen_640x1136.png -z 2688 1242 --out screen_1242x2688.png
sips screen_640x1136.png -z 2048 1536 --out screen_1536x2048.png
sips screen_640x1136.png -z 2224 1668 --out screen_1668x2224.png
sips screen_640x1136.png -z 2388 1668 --out screen_1668x2388.png
sips screen_640x1136.png -z 2732 2048 --out screen_2048x2732.png
echo -e "\033[1;32m----------------------------------------------------------------------> Resize done. \033[0m"
