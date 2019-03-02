#! /bin/bash
clear
echo -e "\033[1;32m----------------------------------------------------------------------> Resize started ... \033[0m"
sips icon_512x512.png -Z 16 --out icon_16x16.png
sips icon_512x512.png -Z 32 --out icon_32x32.png
sips icon_512x512.png -Z 57 --out icon_57x57.png
sips icon_512x512.png -Z 60 --out icon_60x60.png
sips icon_512x512.png -Z 72 --out icon_72x72.png
sips icon_512x512.png -Z 76 --out icon_76x76.png
sips icon_512x512.png -Z 114 --out icon_114x114.png
sips icon_512x512.png -Z 120 --out icon_120x120.png
sips icon_512x512.png -Z 144 --out icon_144x144.png
sips icon_512x512.png -Z 152 --out icon_152x152.png
sips icon_512x512.png -Z 180 --out icon_180x180.png
sips icon_512x512.png -Z 192 --out icon_192x192.png
sips icon_512x512.png -Z 256 --out icon_256x256.png
echo -e "\033[1;32m----------------------------------------------------------------------> Resize done. \033[0m"
