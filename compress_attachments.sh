#!/bin/bash

# Compress all JPEG and PNG images in assets/attachments (recursively)

set -e

echo "Compressing JPEGs..."
find assets/attachments -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -exec jpegoptim --strip-all --max=85 {} \;

echo "Compressing PNGs..."
find assets/attachments -type f -iname "*.png" -exec optipng -o7 {} \;

echo "Compression complete!" 