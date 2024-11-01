[CmdletBinding()]  
param(
    [string]$DraftsAmpPath = '_draftsamp',
    [string]$AmpPath = '_amp',
    [string]$DraftsPath = '_drafts',
    [string]$ArticlesPath = '_artikel',
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

function ProcessDrafts {
    param(
        [string]$DraftsPath,
        [string]$TargetPath
    )
    $BasePath = ($PSScriptRoot.Split([System.IO.Path]::DirectorySeparatorChar) | Select-Object -SkipLast 2) -join [System.IO.Path]::DirectorySeparatorChar
    $ResolvedDraftsPath = Join-Path -Path $BasePath -ChildPath $DraftsPath -AdditionalChildPath '*'
    $ResolvedTargetPath = Join-Path -Path $BasePath -ChildPath $TargetPath
    $RenameArticleList = [System.Collections.Generic.List[System.IO.FileInfo]]::new()
    $AddFilesToCommit = [System.Collections.Generic.List[String]]::new()
    $RemoveFilesFromCommit = [System.Collections.Generic.List[String]]::new()
    $DateRegex = '^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])'
    $ShouldPublish = $false

    # Checking Time Zone
    $TimeZone = (Get-TimeZone).StandardName
    try {
        if (Test-Path -Path $ConfigPath) {
            $TimeZone = (Get-Content -Path $ConfigPath | ConvertFrom-Yaml).timezone
        }
    } catch {
        Write-Output 'Default TimeZone used'
    }
    $CurrentDateTime = [System.TimeZoneInfo]::ConvertTime([DateTime]::Now, [System.TimeZoneInfo]::FindSystemTimeZoneById($TimeZone))
    $FormattedDate = $CurrentDateTime.ToString('yyyy-MM-dd')

    if (-Not (Test-Path -Path $ResolvedDraftsPath)) {
        '::error::The draft path ''{0}'' could not be found' -f $DraftsPath
        exit 1
    }

    $DraftArticles = Get-ChildItem -Path $ResolvedDraftsPath -Include *.md -Exclude template.md
    foreach ($Article in $DraftArticles) {
        $FrontMatter = Get-Content -Path $Article.FullName -Raw | ConvertFrom-Yaml -ErrorAction Ignore
        if ($FrontMatter.ContainsKey('date')) {
            $ArticleDateTime = [datetime]::Parse($FrontMatter['date']).ToUniversalTime()
            $ArticleDateTime = [System.TimeZoneInfo]::ConvertTimeFromUtc($ArticleDateTime, [System.TimeZoneInfo]::FindSystemTimeZoneById($TimeZone))
            $ArticleDate = $ArticleDateTime.ToString('yyyy-MM-dd')

            if ($ArticleDate -eq $FormattedDate -and $CurrentDateTime -ge $ArticleDateTime) {
                $RenameArticleList.Add($Article)
            } elseif ($ArticleDate -lt $FormattedDate) {
                $RenameArticleList.Add($Article)
            }
        }
    }

    foreach ($Article in $RenameArticleList) {
        $NewFileName = if ($PreserveDateFileName.IsPresent -and $Article.BaseName -match $DateRegex) {
            $Article.Name
        } else {
            '{0}-{1}' -f $FormattedDate, $Article.Name -replace $DateRegex, ''
        }

        try {
            Move-Item -Path $Article.FullName -Destination (Join-Path -Path $ResolvedTargetPath -ChildPath $NewFileName)
            $AddFilesToCommit.Add($NewFileName)
            $ShouldPublish = $true
        } catch {
            '::error::Failed to move {0}. Error: {1}' -f $Article.Name, $_.Exception.Message
            $RemoveFilesFromCommit.Add($Article.Name)
        }
    }
    OutputAction
}

# Process both draft paths
ProcessDrafts -DraftsPath $DraftsAmpPath -TargetPath $AmpPath
ProcessDrafts -DraftsPath $DraftsPath -TargetPath $ArticlesPath
