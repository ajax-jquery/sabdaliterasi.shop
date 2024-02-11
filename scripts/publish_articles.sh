#!/bin/bash

# Mendapatkan tanggal hari ini dalam format YYYYMMDD
today=$(date +%Y%m%d)

# Mendapatkan daftar file dalam direktori _drafts
drafts=(_drafts/*)

# Loop melalui setiap file dalam direktori _drafts
for draft in "${drafts[@]}"; do
    # Mendapatkan tanggal dari nama file dan mengonversinya ke dalam format YYYYMMDD
    date=$(basename "$draft" | cut -d'-' -f1-3 | sed 's/-//g')
    
    # Mengecek apakah tanggalnya kurang dari atau sama dengan tanggal hari ini
    if [[ "$date" -le "$today" ]]; then
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
    fi
done

# Mendorong perubahan ke repository
git push
