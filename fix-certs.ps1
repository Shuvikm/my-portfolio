$filePath = "c:\projects\project\src\components\Journey.tsx"
$content = Get-Content $filePath -Raw

# Find and replace the certificate cards section
$oldPattern = '(?s)<div className="relative bg-\[#fdfbf7\] p-4.*?<div className="absolute inset-0 opacity-5 pointer-events-none" style=\{\{ backgroundImage: ''radial-gradient\(black 1px, transparent 1px\)'', backgroundSize: ''4px 4px'' \}\}\></div>\s+</div>'

$newContent = @'
<div
                key={i}
                onClick={() => {
                  setSelectedCert({ image: cert.image, title: cert.name });
                  setShowModal(true);
                }}
                className="flex gap-4 cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                {/* Certificate Dot */}
                <div className="relative flex flex-col items-center flex-shrink-0">
                  <div className="w-6 h-6 bg-manga-red border-4 border-manga-ink rounded-full relative z-10"></div>
                </div>

                {/* Content - SAME AS ACHIEVEMENT CARDS */}
                <div className="flex-1 manga-panel p-6 bg-white">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-manga-red rounded-lg flex-shrink-0">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black uppercase text-manga-ink mb-2 sfx-text">
                        {cert.name}
                      </h3>
                      <p className="text-manga-ink font-semibold mb-1">{cert.issuer}</p>
                      {cert.code && <p className="text-manga-ink font-semibold text-sm">Code: {cert.code}</p>}
                      <p className="text-manga-ink font-semibold text-sm">{cert.date}</p>
                      
                      {/* Click to zoom indicator */}
                      <div className="mt-3 flex items-center gap-2 text-manga-red">
                        <ZoomIn className="w-4 h-4" />
                        <span className="text-sm font-bold uppercase">Click to Zoom</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
'@

$content = $content -replace $oldPattern, $newContent

$content | Set-Content $filePath -NoNewline
Write-Host "Certificate cards updated to match achievement cards!"
