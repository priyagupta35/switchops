# PowerShell Script to simulate a live 500 incident from the TechPulse project
Write-Host "Sending live P0 incident from TechPulse to SwitchOps War Room..." -ForegroundColor Cyan

$body = @{
    alert = @{
        id = "INC-7701"
        title = "NullPointerException in RegisterRequest"
        service = "techpulse-auth-service"
        errorMessage = "NullPointerException: Cannot invoke getEmail() on null RegisterRequest"
        stackTrace = "java.lang.NullPointerException: Cannot invoke getEmail() on null RegisterRequest`n    at com.techpulse.service.UserService.registerUser(UserService.java:38)`n    at com.techpulse.controller.AuthController.register(AuthController.java:24)"
        severity = "P0_CRITICAL"
        timestamp = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
        source = "SENTRY"
        environment = "production"
    }
} | ConvertTo-Json -Depth 5

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/webhook/alert" -Method Post -ContentType "application/json" -Body $body
    Write-Host "`n✓ SUCCESS! SwitchOps acknowledged incident: $($response.alertId)" -ForegroundColor Green
    Write-Host "✓ Hotfix PR generated: $($response.pr.prUrl)" -ForegroundColor Green
    Write-Host "`nCheck your browser at http://localhost:3000 to see the live Slack War Room update in real-time!" -ForegroundColor Yellow
} catch {
    Write-Host "`nError connecting to SwitchOps: $_" -ForegroundColor Red
    Write-Host "Make sure SwitchOps is running with 'npm run ui' first!" -ForegroundColor Yellow
}
