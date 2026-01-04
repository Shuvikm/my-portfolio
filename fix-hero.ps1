$filePath = "c:\projects\project\src\components\Hero.tsx"
$content = Get-Content $filePath -Raw

# Remove the signature overlay section
$content = $content -replace '(?s)\s+{/\* Animated Signature Overlay \*/}.*?</div>\r?\n\s+</div>\r?\n\s+</div>', "`n            </div>`n          </div>`n`n          {/* Name Plate Below Photo */}`n          <div className=`"text-center mt-6`">`n            <div className=`"inline-block manga-panel bg-manga-accent px-8 py-4 -rotate-1 shadow-lg`">`n              <p className=`"text-3xl md:text-4xl font-black text-manga-ink tracking-widest sfx-text`">`n                SHUVIK M`n              </p>`n            </div>`n          </div>"

$content | Set-Content $filePath -NoNewline
Write-Host "Done! Signature removed and name added below photo."
