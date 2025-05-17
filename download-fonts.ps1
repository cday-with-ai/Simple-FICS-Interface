# Create fonts directory if it doesn't exist
$fontsDir = "fonts"
if (-not (Test-Path $fontsDir)) {
    New-Item -ItemType Directory -Path $fontsDir | Out-Null
}

# Define font URLs and file names
$fonts = @(
    @{
        Url = "https://fonts.gstatic.com/s/notosans/v39/o-0IIpQlx3QUlC5A4PNr5TRA.woff2"
        FileName = "NotoSans-Regular.woff2"
    },
    @{
        Url = "https://fonts.gstatic.com/s/notosans/v39/o-0NIpQlx3QUlC5A4PNjXhFVZNyB.woff2"
        FileName = "NotoSans-Bold.woff2"
    },
    @{
        Url = "https://fonts.gstatic.com/s/materialicons/v140/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2"
        FileName = "MaterialIcons-Regular.woff2"
    },
    @{
        Url = "https://fonts.gstatic.com/s/orbitron/v29/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyGy6BoWgz.woff2"
        FileName = "Orbitron-Regular.woff2"
    },
    @{
        Url = "https://fonts.gstatic.com/s/orbitron/v29/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1ny_-6BoWgz.woff2"
        FileName = "Orbitron-Bold.woff2"
    },
    @{
        Url = "https://fonts.gstatic.com/s/sharetechmono/v15/J7aHnp1uDWRBEqV98dVQztYldFcLowEF.woff2"
        FileName = "ShareTechMono-Regular.woff2"
    }
)

# Download each font
foreach ($font in $fonts) {
    $outputPath = Join-Path $fontsDir $font.FileName
    if (-not (Test-Path $outputPath)) {
        Write-Host "Downloading $($font.FileName)..."
        Invoke-WebRequest -Uri $font.Url -OutFile $outputPath
        Write-Host "Downloaded $($font.FileName)"
    } else {
        Write-Host "$($font.FileName) already exists, skipping download"
    }
}

Write-Host "All fonts downloaded successfully!"
