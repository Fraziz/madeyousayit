param(
    [string]$FilePath,
    [switch]$ExportPdf
)

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0

try {
    $fullPath = [System.IO.Path]::GetFullPath($FilePath)
    $doc = $word.Documents.Open($fullPath, $false, $true)
    $pageCount = $doc.ComputeStatistics(2)
    Write-Host "DOCX_PAGE_COUNT: $pageCount"

    if ($ExportPdf) {
        $pdfPath = [System.IO.Path]::ChangeExtension($fullPath, ".pdf")
        # 17 = wdExportFormatPDF
        $doc.ExportAsFixedFormat($pdfPath, 17)
        Write-Host "PDF_EXPORTED: $pdfPath"
    }

    $doc.Close([ref][Microsoft.Office.Interop.Word.WdSaveOptions]::wdDoNotSaveChanges)
} catch {
    Write-Host "Error: $_"
} finally {
    if ($word -ne $null) {
        try {
            $word.Quit([ref][Microsoft.Office.Interop.Word.WdSaveOptions]::wdDoNotSaveChanges)
        } catch {}
        [System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null
        $word = $null
    }
    [System.GC]::Collect()
    [System.GC]::WaitForPendingFinalizers()
}
