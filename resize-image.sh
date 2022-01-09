convert image.jpg -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG image.jpg
convert image.jpg -resize 50% -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG image@0,5x.jpg
convert image.jpg -resize 25% -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG image@0,25x.jpg
convert image.jpg -resize 12.5% -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG image@0,125x.jpg

Get-ChildItem *.jpg | % { convert $_.FullName -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG $_.FullName }