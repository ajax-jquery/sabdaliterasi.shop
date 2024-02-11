# Set the path to the drafts directory
$draftsDirectory = "_drafts"

# Get the current date in the format "YYYY-MM-DD"
$currentDate = Get-Date -Format "yyyy-MM-dd"

# Get a list of draft files
$draftFiles = Get-ChildItem -Path $draftsDirectory -File

# Loop through each draft file
foreach ($draftFile in $draftFiles) {
    # Get the name of the draft file
    $fileName = $draftFile.Name
    
    # Get the date part of the file name
    $fileDate = $fileName.Substring(0, 10)
    
    # Check if the draft file has a date in its name and if it's less than or equal to the current date
    if ($fileDate -match "^\d{4}-\d{2}-\d{2}$" -and $fileDate -le $currentDate) {
        # Rename the draft file to move it to the _artikel directory
        $newFileName = "_artikel\$fileName"
        Rename-Item -Path $draftFile.FullName -NewName $newFileName -Force
        Write-Host "Renamed $($draftFile.FullName) to $newFileName"
        $env:DRAFTS_ARTICLES_RENAMED = "true"
    }
}

# Set output variable indicating whether any draft articles were renamed
if ($env:DRAFTS_ARTICLES_RENAMED -eq $null) {
    $env:DRAFTS_ARTICLES_RENAMED = "false"
}
