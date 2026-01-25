# Simple static file server in PowerShell (works on Windows PowerShell 5.1)
# Usage: .\serve.ps1 [port]
param(
    [int]$Port = 8000
)

$root = (Get-Location).Path
$prefix = "http://localhost:$Port/"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
try {
    $listener.Start()
} catch {
    Write-Error "Failed to start HttpListener on $prefix. Try running PowerShell as Administrator or choose another port. $_"
    exit 1
}

Write-Host "Serving directory: $root" -ForegroundColor Green
Write-Host "Open http://localhost:$Port in your browser. Press Ctrl+C to stop." -ForegroundColor Green

function Get-MimeType([string]$path) {
    $ext = [System.IO.Path]::GetExtension($path).ToLower()
    switch ($ext) {
        '.html' { 'text/html' }
        '.htm'  { 'text/html' }
        '.css'  { 'text/css' }
        '.js'   { 'application/javascript' }
        '.json' { 'application/json' }
        '.png'  { 'image/png' }
        '.jpg'  { 'image/jpeg' }
        '.jpeg' { 'image/jpeg' }
        '.gif'  { 'image/gif' }
        '.svg'  { 'image/svg+xml' }
        '.webp' { 'image/webp' }
        '.avif' { 'image/avif' }
        '.woff' { 'font/woff' }
        '.woff2'{ 'font/woff2' }
        '.ttf'  { 'font/ttf' }
        default { 'application/octet-stream' }
    }
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        Start-Job -ArgumentList $context, $root -ScriptBlock {
            param($context, $rootDir)
            try {
                $req = $context.Request
                $res = $context.Response
                $rawUrl = $req.Url.AbsolutePath
                $decoded = [System.Net.WebUtility]::UrlDecode($rawUrl)
                if ($decoded -eq '/') { $decoded = '/index.html' }
                $localPath = Join-Path $rootDir ($decoded.TrimStart('/').Replace('/', '\\'))

                if ((Test-Path $localPath) -and -not (Get-Item $localPath).PSIsContainer) {
                    $mime = Get-MimeType $localPath
                    $res.ContentType = $mime
                    $bytes = [System.IO.File]::ReadAllBytes($localPath)
                    $res.ContentLength64 = $bytes.Length
                    $res.OutputStream.Write($bytes, 0, $bytes.Length)
                    $res.OutputStream.Close()
                } else {
                    $res.StatusCode = 404
                    $msg = "404 Not Found"
                    $buf = [System.Text.Encoding]::UTF8.GetBytes($msg)
                    $res.OutputStream.Write($buf, 0, $buf.Length)
                    $res.OutputStream.Close()
                }
            } catch {
                # ignore per-request errors
            }
        } | Out-Null
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
