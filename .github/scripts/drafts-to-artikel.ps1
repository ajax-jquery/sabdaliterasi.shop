[CmdletBinding()]
param(
    [string]$DraftsAmpPath = '_draftamp',
    [string]$DataAmpPath = '_amp',
    [string]$DraftsPath = '_drafts',
    [string]$DataPath = '_artikel',
    [string]$ConfigPath = '_config.yml',
    [switch]$AllowMultiplePostsPerDay,
    [switch]$PreserveDateFileName
)

function OutputAction {
    param (
        [bool]$ShouldPublish,
        [string[]]$AddFilesToCommit,
        [string[]]$RemoveFilesFromCommit
    )
    
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

function MoveDrafts {
    param (
        [string]$DraftsPath,
        [string]$DataPath,
        [string]$ShouldPublish,
        [string[]]$AddFilesToCommit,
        [string[]]$RemoveFilesFromCommit
    )

    $ResolvedDraftsPath = Join-Path -Path $BasePath -ChildPath $DraftsPath -AdditionalChildPath '*'
    $ResolvedDataPath = Join-Path -Path $BasePath -ChildPath $DataPath
    $RenameArticleList = [System.Collections.Generic.List[System.IO.FileInfo]]::new()

    # Code untuk discovery dan pemindahan artikel
    if (-Not (Test-Path -Path $ResolvedDraftsPath)) {
        '::error::The draft path ''{0}'' could not be found' -f $DraftsPath
        OutputAction -ShouldPublish $ShouldPublish -AddFilesToCommit $AddFilesToCommit -RemoveFilesFromCommit $RemoveFilesFromCommit
        exit 1
    }

    $DraftArticles = Get-ChildItem -Path $ResolvedDraftsPath -Include *.md -Exclude template.md
    if ($DraftArticles.Count -gt 0) {
        foreach ($DraftArticle in $DraftArticles) {
            # Get the article's date from its filename or front matter
            $FileDate = $null
            if ($PreserveDateFileName) {
                $FileNameParts = $DraftArticle.Name -split '-'
                if ($FileNameParts.Count -gt 1) {
                    $FileDate = $FileNameParts[0]
                }
            } else {
                # Read front matter from the article to get the date
                $FrontMatter = Get-Content $DraftArticle.FullName -Raw | Select-String -Pattern 'date:\s*(.+)'
                if ($FrontMatter) {
                    $FileDate = $FrontMatter.Matches.Groups[1].Value
                }
            }

            if ($FileDate) {
                $DateTime = [datetime]::Parse($FileDate)
                $CurrentDateTime = Get-Date

                if ($AllowMultiplePostsPerDay -or $DateTime.Date -eq $CurrentDateTime.Date) {
                    # Construct the destination file path
                    $DestinationFile = Join-Path -Path $ResolvedDataPath -ChildPath $DraftArticle.Name
                    Move-Item -Path $DraftArticle.FullName -Destination $DestinationFile -Force
                    $AddFilesToCommit += $DestinationFile
                    $RenameArticleList.Add($DraftArticle)
                } else {
                    $RemoveFilesFromCommit += $DraftArticle.FullName
                }
            }
        }
        OutputAction -ShouldPublish $ShouldPublish -AddFilesToCommit $AddFilesToCommit -RemoveFilesFromCommit $RemoveFilesFromCommit
    } else {
        'No markdown files found in {0}.' -f $DraftsPath
        OutputAction -ShouldPublish $ShouldPublish -AddFilesToCommit $AddFilesToCommit -RemoveFilesFromCommit $RemoveFilesFromCommit
    }
}

#region Set Variables
$BasePath = ($PSScriptRoot.Split([System.IO.Path]::DirectorySeparatorChar) | Select-Object -SkipLast 2) -join [System.IO.Path]::DirectorySeparatorChar

$ShouldPublishAmp = $false
$AddFilesToCommitAmp = [System.Collections.Generic.List[String]]::new()
$RemoveFilesFromCommitAmp = [System.Collections.Generic.List[String]]::new()

$ShouldPublish = $false
$AddFilesToCommit = [System.Collections.Generic.List[String]]::new()
$RemoveFilesFromCommit = [System.Collections.Generic.List[String]]::new()
#endregion

# Move from _draftamp to _amp
MoveDrafts -DraftsPath $DraftsAmpPath -DataPath $DataAmpPath -ShouldPublish $ShouldPublishAmp -AddFilesToCommit $AddFilesToCommitAmp -RemoveFilesFromCommit $RemoveFilesFromCommitAmp

# Move from _drafts to _artikel
MoveDrafts -DraftsPath $DraftsPath -DataPath $DataPath -ShouldPublish $ShouldPublish -AddFilesToCommit $AddFilesToCommit -RemoveFilesFromCommit $RemoveFilesFromCommit

# Kode di bawah ini berfungsi untuk output akhir
OutputAction -ShouldPublish $ShouldPublish -AddFilesToCommit $AddFilesToCommit -RemoveFilesFromCommit $RemoveFilesFromCommit
