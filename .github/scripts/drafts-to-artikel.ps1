[CmdletBinding()]
param(
    [string]$DraftsPath = '_drafts',
    [string]$DataPath = '_artikel',
    [string]$ConfigPath = '_config.yml',
    [string]$DraftsAmpPath = '_draftsamp',  # Parameter baru untuk AMP
    [string]$AmpPath = '_amp',              # Parameter baru untuk tujuan AMP
    [switch]$AllowMultiplePostsPerDay,
    [switch]$PreserveDateFileName
)

# Fungsi dan variabel lain tetap sama ...

#region Draft AMP Article Discovery
'::group::Draft AMP Article Discovery'
$ResolvedDraftsAmpPath = Join-Path -Path $BasePath -ChildPath $DraftsAmpPath -AdditionalChildPath '*'
$RenameAmpList = [System.Collections.Generic.List[System.IO.FileInfo]]::new()

if (-Not (Test-Path -Path $ResolvedDraftsAmpPath)) {
    '::error::The draft AMP path ''{0}'' could not be found' -f $DraftsAmpPath
} else {
    $DraftAmpArticles = Get-ChildItem -Path $ResolvedDraftsAmpPath -Include *.md -Exclude template.md
    if ($DraftAmpArticles.Count -gt 0) {
        'Found {0} AMP articles in {1}.' -f $DraftAmpArticles.Count, $DraftsAmpPath
        $DraftAmpArticles.Name | ForEach-Object {
            '- {0}' -f $_
        }
    } else {
        'No AMP markdown files found in {0}.' -f $DraftsAmpPath
    }
}
'::endgroup::'
#endregion

#region Checking Draft AMP Article Date
'::group::Checking Draft AMP Article Date'
foreach ($AmpArticle in $DraftAmpArticles) {
    $FrontMatter = Get-Content -Path $AmpArticle.FullName -Raw | ConvertFrom-Yaml -ErrorAction Ignore
    if ($FrontMatter.ContainsKey('date')) {
        $AmpArticleDateTimeString = $FrontMatter['date']
        $AmpArticleDateTime = [datetime]::Parse($AmpArticleDateTimeString).ToUniversalTime()
        $AmpArticleDateTime = [System.TimeZoneInfo]::ConvertTimeFromUtc($AmpArticleDateTime, [System.TimeZoneInfo]::FindSystemTimeZoneById('Asia/Makassar'))
        
        # Format output date and time
        $AmpArticleDate = $AmpArticleDateTime.ToString('yyyy-MM-dd')
        $CurrentDateTime = [System.TimeZoneInfo]::ConvertTime([DateTime]::Now, [System.TimeZoneInfo]::FindSystemTimeZoneById('Asia/Makassar'))
        $CurrentDate = $CurrentDateTime.ToString('yyyy-MM-dd')

        # Cek tanggal untuk publikasi AMP
        if ($AmpArticleDate -eq $CurrentDate -and $CurrentDateTime -ge $AmpArticleDateTime) {
            $RenameAmpList.Add($AmpArticle)
        } elseif ($AmpArticleDate -lt $CurrentDate) { 
            $RenameAmpList.Add($AmpArticle)
        }
    }
}
'::endgroup::'
#endregion

#region Moving Draft AMP Articles to Amp folder
'::group::Moving Draft AMP Articles to Amp folder'
$ResolvedAmpPath = Join-Path -Path $BasePath -ChildPath $AmpPath

if (-Not (Test-Path -Path $ResolvedAmpPath)) {
    '::error::The AMP data path ''{0}'' could not be found' -f $AmpPath
} else {
    foreach ($AmpArticle in $RenameAmpList) {
        # Rename logic untuk AMP file
        if ($AmpArticle.BaseName -match $DateRegex) {
            if ($PreserveDateFileName.IsPresent) {
                $NewAmpFileName = $AmpArticle.Name
            } else {
                $NewAmpFileName = '{0}-{1}' -f $FormattedDate, $AmpArticle.Name -replace $DateRegex, ''
            }
        } else {
            $NewAmpFileName = '{0}-{1}' -f $FormattedDate, $AmpArticle.Name
        }

        # Memindahkan AMP file
        try {
            Move-Item -Path $AmpArticle.FullName -Destination (Join-Path -Path $ResolvedAmpPath -ChildPath $NewAmpFileName)
            $AddFilesToCommit.Add($NewAmpFileName)
            $ShouldPublish = $true
        } catch {
            $RemoveFilesFromCommit.Add($AmpArticle.Name)
        }
    }
}
'::endgroup::'
#endregion

OutputAction
