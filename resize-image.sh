convert sidebar-bg.jpg -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG sidebar-bg.jpg
convert sidebar-bg.jpg -resize 50% -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG sidebar-bg@0,5x.jpg
convert sidebar-bg.jpg -resize 25% -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG sidebar-bg@0,25x.jpg
convert sidebar-bg.jpg -resize 12.5% -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG sidebar-bg@0,125x.jpg
