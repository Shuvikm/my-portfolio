$filePath = "c:\projects\project\src\components\Hero.tsx"
$content = Get-Content $filePath -Raw

# Remove the name plate below photo (lines 53-60)
$content = $content -replace '(?s)\s+{/\* Name Plate Below Photo \*/}.*?</div>\s+</div>\s+(?=\s+{/\* Download Resume)', ''

# Add whitespace-nowrap to the h1 to keep SHUVIK M on one line
$content = $content -replace '(<h1 className="text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight mb-4 text-outline-thick text-manga-white sfx-text relative)">', '$1 whitespace-nowrap">'

$content | Set-Content $filePath -NoNewline
Write-Host "Removed name badge and made heading single-line!"
