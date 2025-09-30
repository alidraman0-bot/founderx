@echo off
echo Starting FounderX GitHub Upload Process...
echo.

REM Check if Git is available
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git from: https://git-scm.com/download/win
    echo Then restart this script
    pause
    exit /b 1
)

echo Git found! Proceeding with upload...
echo.

REM Initialize Git repository
echo Step 1: Initializing Git repository...
git init

REM Add all files
echo Step 2: Adding all files...
git add .

REM Create commit
echo Step 3: Creating commit...
git commit -m "Initial commit: FounderX MVP - Complete startup launch platform

🚀 Features:
- Launch page with branding generator and landing builder
- Stripe payment integration (Free, Pro, Premium plans)
- Founder dashboard with analytics and user management
- Professional YC/Stripe-style design
- Responsive mobile-first design
- Complete API routes and webhook handlers
- Real-time startup analytics and growth tracking"

REM Add remote origin
echo Step 4: Adding GitHub remote...
git remote add origin https://github.com/alidraman0-bot/founderx.git

REM Set main branch
echo Step 5: Setting main branch...
git branch -M main

REM Push to GitHub
echo Step 6: Pushing to GitHub...
git push -u origin main

echo.
echo ✅ Upload complete! Your FounderX MVP is now on GitHub!
echo Visit: https://github.com/alidraman0-bot/founderx
echo.
pause
