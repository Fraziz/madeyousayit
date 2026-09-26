Add-Type -AssemblyName System.Drawing
$dir = "c:\Users\User\.gemini\antigravity-ide\scratch\made-you-say-it\public\cards"
$results = @()
for ($i = 1; $i -le 78; $i++) {
    $file = "$dir\$i.png"
    if (Test-Path $file) {
        $bmp = [System.Drawing.Bitmap]::FromFile($file)
        $p = $bmp.GetPixel(60, 70)
        $bmp.Dispose()
        $cat = "UNKNOWN"
        # Green (Guess): High G, low R, low B
        # Orange (Together): High R, mid G, low B
        # Blue (Connect): High B, low R, low G
        # Red (Battle): High R, low G, low B
        # Purple (Chaos): Mid R, low G, High B
        # Pink (Love): High R, mid G, High B
        # Cyan (Create): Low R, High G, High B
        if ($p.G -gt 80 -and $p.R -lt 40 -and $p.B -lt 60) { $cat = "GUESS" }
        elseif ($p.R -gt 200 -and $p.G -gt 80 -and $p.B -lt 50) { $cat = "TOGETHER" }
        elseif ($p.R -lt 30 -and $p.G -lt 100 -and $p.B -gt 130) { $cat = "CONNECT" }
        elseif ($p.R -gt 200 -and $p.G -lt 70 -and $p.B -lt 70) { $cat = "BATTLE" }
        elseif ($p.R -gt 60 -and $p.G -lt 50 -and $p.B -gt 180) { $cat = "CHAOS" }
        elseif ($p.R -gt 220 -and $p.B -gt 150) { $cat = "LOVE" }
        elseif ($p.G -gt 180 -and $p.B -gt 180) { $cat = "CREATE" }

        $results += [PSCustomObject]@{
            Card = $i
            Category = $cat
            R = $p.R
            G = $p.G
            B = $p.B
        }
    }
}
$results | Format-Table -AutoSize
