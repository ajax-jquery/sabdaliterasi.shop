#!/bin/bash

# Mendapatkan daftar file dalam direktori _drafts
drafts=(_drafts/*)

# Loop melalui setiap file dalam direktori _drafts
for draft in "${drafts[@]}"; do
    # Mendapatkan tanggal dari nama file
    date=$(basename "$draft" | cut -d'-' -f1-3)
    # Mendapatkan nama file tanpa tanggal
    filename=$(basename "$draft" | cut -d'-' -f4-)
    # Membuat nama baru untuk file yang terpublish
    new_filename="_artikel/$date-$filename"
    # Memindahkan dan mengubah nama file ke direktori _artikel
    mv "$draft" "$new_filename"
    # Menambahkan file yang dipindahkan ke git
    git add "$new_filename"
    # Membuat commit dengan pesan yang sesuai
    git commit -m "Publish artikel $date-$filename"
done

# Mendorong perubahan ke repository
git push
