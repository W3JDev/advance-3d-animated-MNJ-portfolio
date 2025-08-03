# 🚀 MN Jewel Portfolio - Automated Deployment Script
# Run this script to upload your codebase to GitHub and trigger Vercel deployment

Write-Host "🚀 Starting MN Jewel Portfolio Deployment..." -ForegroundColor Cyan

# Check if git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git is not installed. Please install Git first." -ForegroundColor Red
    exit 1
}

# Initialize git repository
Write-Host "📁 Initializing Git repository..." -ForegroundColor Yellow
git init

# Configure git user (update with your details)
Write-Host "👤 Configuring Git user..." -ForegroundColor Yellow
git config user.name "W3JDev"
git config user.email "w3j.btc@gmail.com"

# Add remote repository
Write-Host "🔗 Adding remote repository..." -ForegroundColor Yellow
git remote add origin https://github.com/W3JDev/advance-3d-animated-MNJ-portfolio.git

# Add all files
Write-Host "📦 Adding all files..." -ForegroundColor Yellow
git add .

# Create commit
Write-Host "💾 Creating commit..." -ForegroundColor Yellow
git commit -m "🚀 Deploy: Premium 3D Animated MN Jewel Portfolio - Ready for production deployment!"

# Push to GitHub
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "⚠️  You may need to authenticate with GitHub..." -ForegroundColor Magenta

try {
    git push -u origin main
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 Next Steps:" -ForegroundColor Cyan
    Write-Host "1. Go to https://vercel.com/dashboard" -ForegroundColor White
    Write-Host "2. Click 'New Project'" -ForegroundColor White
    Write-Host "3. Import from GitHub: advance-3d-animated-MNJ-portfolio" -ForegroundColor White
    Write-Host "4. Deploy with default Vite settings" -ForegroundColor White
    Write-Host ""
    Write-Host "🌟 Your billion-dollar portfolio will be live in minutes!" -ForegroundColor Green
}
catch {
    Write-Host "❌ Failed to push to GitHub. Please check your authentication." -ForegroundColor Red
    Write-Host "💡 You may need to:" -ForegroundColor Yellow
    Write-Host "   - Set up GitHub CLI: gh auth login" -ForegroundColor White
    Write-Host "   - Or use GitHub Desktop" -ForegroundColor White
    Write-Host "   - Or push manually from your Git client" -ForegroundColor White
}

Write-Host ""
Write-Host "📖 For detailed instructions, see DEPLOYMENT.md" -ForegroundColor Cyan
