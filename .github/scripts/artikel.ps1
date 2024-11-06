[CmdletBinding()]
param(
    [string]$DraftsPath = '_drafts',
    [string]$DataPath = '_artikel',
    [string]$ConfigPath = '_config.yml',
    [switch]$AllowMultiplePostsPerDay,
    [switch]$PreserveDateFileName
)

function OutputAction {
    if ($ShouldPublish) {
        $AddFileList = $AddFilesToCommit -join ','
        $RemoveFileList = $RemoveFilesFromCommit -join ','
        'DRAFTS_ARTICLES_RENAMED=true' >> $env:GITHUB_ENV
        'DRAFTS_COMMIT_RENAMED_FILES={0}' -f $AddFileList >> $env:GITHUB_ENV
        'DRAFTS_COMMIT_REMOVED_FILES={0}' -f $RemoveFileList >> $env:GITHUB_ENV
    } else {
        'DRAFTS_ARTICLES_RENAMED=false' >> $env:GITHUB_ENV
        'DRAFTS_COMMIT_RENAMED_FILES=false' >> $env:GITHUB_ENV
        'DRAFTS_COMMIT_REMOVED_FILES=false' >> $env:GITHUB_ENV
    }
}

#region Set Variables
$BasePath = ($PSScriptRoot.Split([System.IO.Path]::DirectorySeparatorChar) | Select-Object -SkipLast 2) -join [System.IO.Path]::DirectorySeparatorChar
$ResolvedDraftsPath = Join-Path -Path $BasePath -ChildPath $DraftsPath -AdditionalChildPath '*'
$ResolvedDataPath = Join-Path -Path $BasePath -ChildPath $DataPath
$ResolvedConfigPath = Join-Path -Path $BasePath -ChildPath $ConfigPath
$RenameArticleList = [System.Collections.Generic.List[System.IO.FileInfo]]::new()
$AddFilesToCommit = [System.Collections.Generic.List[String]]::new()
$RemoveFilesFromCommit = [System.Collections.Generic.List[String]]::new()
$DateRegex = '^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])'
$ShouldPublish = $false

# Debugging pada tahap inisialisasi
Write-Output "::debug::Checking RenameArticleList initialization: Count = $($RenameArticleList.Count)"
Write-Output "::debug::Checking AddFilesToCommit initialization: Count = $($AddFilesToCommit.Count)"
Write-Output "::debug::Checking RemoveFilesFromCommit initialization: Count = $($RemoveFilesFromCommit.Count)"
#endregion

#region Set TimeZone
'::group::Set TimeZone'
$TimeZone = (Get-TimeZone).StandardName
$DefaultTimeZoneMessage = 'Setting TimeZone to default ''{0}''.' -f $TimeZone
try {
    if (Test-Path -Path $ResolvedConfigPath) {
        $TimeZone = (Get-Content -Path $ResolvedConfigPath | ConvertFrom-Yaml).timezone
        if (-Not [string]::IsNullOrEmpty($TimeZone)) {
            'Setting TimeZone from {0} to ''{1}''.' -f $ConfigPath, $TimeZone
        } else {
            Write-Output $DefaultTimeZoneMessage
        }
    } else {
        Write-Output $DefaultTimeZoneMessage
    }
} catch {
    Write-Output $DefaultTimeZoneMessage
}
$CurrentDate = [System.TimeZoneInfo]::ConvertTimeBySystemTimeZoneId((Get-Date), $TimeZone)
$FormattedDate = $CurrentDate.ToString('yyyy-MM-dd')
'::endgroup::'
#endregion

#region Draft Article Discovery
'::group::Draft Article Discovery'
if (-Not (Test-Path -Path $ResolvedDraftsPath)) {
    '::error::The draft path ''{0}'' could not be found' -f $DraftsPath
    exit 1
}
$DraftArticles = Get-ChildItem -Path $ResolvedDraftsPath -Include *.md -Exclude template.md
if ($DraftArticles.Count -gt 0) {
    if ($DraftArticles.Count -eq 1) {
        'Found 1 article in {0}.' -f $DraftsPath
    } else {
        'Found {0} articles in {1}.' -f $DraftArticles.Count, $DraftsPath
    }
    $DraftArticles.Name | ForEach-Object {
        '- {0}' -f $_
    }
} else {
    'No markdown files found in {0}.' -f $DraftsPath
    OutputAction
}
'::endgroup::'
#endregion

#region Checking Draft Article Date
'::group::Checking Draft Article Date'
foreach ($Article in $DraftArticles) {
    $FrontMatter = Get-Content -Path $Article.FullName -Raw | ConvertFrom-Yaml -ErrorAction Ignore
    Write-Output "::debug::FrontMatter for $($Article.FullName): $FrontMatter"

    if ($FrontMatter.ContainsKey('date')) {
        $ArticleDateTimeString = $FrontMatter['date']
        Write-Output "::debug::ArticleDateTimeString: $ArticleDateTimeString"
        
        # Mengonversi tanggal dari string ke DateTime
        $ArticleDateTime = [datetime]::Parse($ArticleDateTimeString).ToUniversalTime()
        $ArticleDateTime = [System.TimeZoneInfo]::ConvertTimeFromUtc($ArticleDateTime, [System.TimeZoneInfo]::FindSystemTimeZoneById('Asia/Makassar'))
        Write-Output "::debug::ArticleDateTime: $ArticleDateTime"

        # Mendapatkan waktu saat ini
        $CurrentDateTime = [System.TimeZoneInfo]::ConvertTime([DateTime]::Now, [System.TimeZoneInfo]::FindSystemTimeZoneById('Asia/Makassar'))
        Write-Output "::debug::CurrentDateTime: $CurrentDateTime"

        # Memeriksa apakah artikel memenuhi syarat untuk dipindahkan
        if ($ArticleDateTime.Date -eq $CurrentDateTime.Date -and $CurrentDateTime -ge $ArticleDateTime) {
            $RenameArticleList.Add($Article)
            Write-Output "::notice::Including article to rename: $($Article.Name)"
        } else {
            Write-Output "::warning::Article 'date' is set in the future. SKIPPED"
        }
    } else {
        Write-Output "::warning::Article does not contain a date value. SKIPPED"
    }
}
'::endgroup::'
#endregion

# ===> Tambahkan kode ini setelah pengecekan tanggal selesai <===
Write-Output "::debug::Jumlah artikel untuk dipindahkan: $($RenameArticleList.Count)"
Write-Output "::debug::Isi RenameArticleList: $RenameArticleList"

# Jika tidak ada artikel yang memenuhi syarat, hentikan proses
if ($RenameArticleList.Count -eq 0) {
    Write-Output "::warning::Tidak ada artikel yang memenuhi syarat untuk dipindahkan. Menghentikan proses."
    OutputAction  # Tetap panggil OutputAction untuk memperbarui status GitHub Actions
    return
}



#region Handling Multiple Draft Articles with Current Date
'::group::Handling Multiple Draft Articles with Current Date'
switch ($RenameArticleList.Count) {
    0 {
        'No articles matched the criteria to be renamed and published.'
        OutputAction
        return
    }
    1 {
        'Found 1 article to rename.'
    }
    default {
        '::warning::More than one draft article found with front matter date value of {0}.' -f $FormattedDate
        $RenameArticleList = $RenameArticleList | Sort-Object -Property LastWriteTimeUtc
        if ($AllowMultiplePostsPerDay.IsPresent) {
            '::warning::Multiple draft articles will be published per day chronologically.'
        } else {
            '::warning::Multiple draft articles with today''s date and ''AllowMultiplePostsPerDay'' is not enabled. The last edited file will be published.'
            $RenameArticleList = $RenameArticleList | Select-Object -Last 1
        }
    }
}
'::endgroup::'
#endregion

#region Moving Draft Articles to Data folder
if (-Not (Test-Path -Path $ResolvedDataPath)) {
    '::error::The data path ''{0}'' could not be found' -f $DataPath
    OutputAction
    exit 1
}
'::group::Moving Draft Articles to Data folder'

foreach ($Article in $RenameArticleList) {
    Write-Output "::debug::Attempting to move article: $($Article.FullName)"
    Write-Output "::debug::NewFileName for move operation: $NewFileName"

    # Pastikan artikel dan nama file baru tidak null sebelum operasi Move-Item
    if ($Article -ne $null -and -not [string]::IsNullOrEmpty($NewFileName)) {
        try {
            Move-Item -Path $Article.FullName -Destination (Join-Path -Path $ResolvedDataPath -ChildPath $NewFileName)
            $AddFilesToCommit.Add($NewFileName)
            Write-Output "::notice::Article $($Article.Name) has been moved to $ResolvedDataPath"
            $ShouldPublish = $true
        } catch {
            Write-Output "::error::Failed to move $($Article.Name). Error: $($_.Exception.Message)"
            $RemoveFilesFromCommit.Add($Article.Name)
        }
    } else {
        Write-Output "::error::Skipping article because it is null or has an invalid file name."
    }
}
'::endgroup::'
#endregion


OutputAction
