#!/bin/bash

# Mengatur zona waktu
export TZ=Asia/Makassar

CURRENT_DATE=$(date +"%Y-%m-%d %H:%M:%S %z")
echo -e "\n\033[1;34mWaktu sekarang:\033[0m $CURRENT_DATE\n"

# Variabel untuk menyimpan jumlah file terpublish dan terjadwal
drafts_publish_count=0
drafts_schedule_count=0
draftsamp_publish_count=0
draftsamp_schedule_count=0

# Fungsi untuk memeriksa dan memindahkan file jika waktu sesuai
move_file_if_scheduled() {
  local src_file="$1"
  local dest_folder="$2"
  local date_in_file=$(grep "date: '" "$src_file" | awk -F"'" '{print $2}')
  
  # Bandingkan waktu dalam file dengan waktu saat ini
  if [[ "$date_in_file" < "$CURRENT_DATE" ]] || [[ "$date_in_file" == "$CURRENT_DATE" ]]; then
    # Pindahkan file ke folder tujuan
    if [[ "$dest_folder" == "_artikel" ]]; then
      dest_file=$(echo "$src_file" | sed "s|_drafts/|_artikel/|")
      drafts_publish_count=$((drafts_publish_count + 1))
    elif [[ "$dest_folder" == "_amp" ]]; then
      dest_file=$(echo "$src_file" | sed "s|_draftsamp/|_amp/|")
      draftsamp_publish_count=$((draftsamp_publish_count + 1))
    fi
    mkdir -p "$(dirname "$dest_file")"
    mv "$src_file" "$dest_file"
    echo -e "\033[1;32mFile $src_file dipindahkan ke $dest_file (Terpublish)\033[0m"
  else
    if [[ "$dest_folder" == "_artikel" ]]; then
      drafts_schedule_count=$((drafts_schedule_count + 1))
    elif [[ "$dest_folder" == "_amp" ]]; then
      draftsamp_schedule_count=$((draftsamp_schedule_count + 1))
    fi
    echo -e "\033[38;2;214;0;0mFile $src_file dijadwalkan untuk masa mendatang:\033[0m $date_in_file"
  fi
}

# Laporan terpisah untuk folder _drafts
echo -e "\033[1;34mMemeriksa folder _drafts:\033[0m"
for file in _drafts/*.md; do
  [ -e "$file" ] || continue
  move_file_if_scheduled "$file" "_artikel"
done

# Laporan akhir untuk folder _drafts
echo -e "\033[1;32mTotal file terpublish di _drafts: $drafts_publish_count\033[0m"
echo -e "\033[1;33mTotal file terjadwal di masa depan di _drafts: $drafts_schedule_count\033[0m"

# Laporan terpisah untuk folder _draftsamp
echo -e "\033[1;34mMemeriksa folder _draftsamp:\033[0m"
for file in _draftsamp/*.md; do
  [ -e "$file" ] || continue
  move_file_if_scheduled "$file" "_amp"
done

# Laporan akhir untuk folder _draftsamp
echo -e "\033[1;32mTotal file terpublish di _draftsamp: $draftsamp_publish_count\033[0m"
echo -e "\033[1;33mTotal file terjadwal di masa depan di _draftsamp: $draftsamp_schedule_count\033[0m"

# Memastikan isi folder tujuan setelah pemindahan
echo -e "\033[1;36mIsi folder _artikel setelah pemindahan:\033[0m"
ls -l _artikel || echo "_artikel folder is empty."

echo -e "\033[1;36mIsi folder _amp setelah pemindahan:\033[0m"
ls -l _amp || echo "_amp folder is empty."

if (( drafts_publish_count > 0 || draftsamp_publish_count > 0 )); then
  echo "HAS_PUBLISHED_FILES=true" >> $GITHUB_ENV
else
  echo "HAS_PUBLISHED_FILES=false" >> $GITHUB_ENV
fi