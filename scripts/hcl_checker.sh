#!/bin/bash

# Human Contribution Log (HCL) Checker Script
# This script validates that the HCL_Report.md file exists and contains valid data
# Used in CI/CD pipeline as a pre-merge gate

set -e

echo "🔍 Checking Human Contribution Log (HCL)..."

# Check if HCL_Report.md exists in the root directory
if [ ! -f "HCL_Report.md" ]; then
    echo "❌ ERROR: HCL_Report.md file not found in root directory"
    echo "   The Human Curator must create this file with their contributions"
    exit 1
fi

echo "✅ HCL_Report.md file found"

# Check if the file contains "Total Time Spent" with a value >= 2.0
if ! grep -q "Total Time Spent:" HCL_Report.md; then
    echo "❌ ERROR: HCL_Report.md must contain 'Total Time Spent:' field"
    exit 1
fi

# Extract the time spent value and validate it's >= 2.0
TIME_SPENT=$(grep "Total Time Spent:" HCL_Report.md | sed 's/.*Total Time Spent: *\([0-9.]*\).*/\1/')

if [ -z "$TIME_SPENT" ]; then
    echo "❌ ERROR: Could not extract time spent value from HCL_Report.md"
    exit 1
fi

# Check if time spent is >= 2.0 hours
if (( $(echo "$TIME_SPENT < 2.0" | bc -l) )); then
    echo "❌ ERROR: Total Time Spent must be >= 2.0 hours (found: $TIME_SPENT hours)"
    echo "   The Human Curator must contribute at least 2.0 hours of non-trivial work"
    exit 1
fi

echo "✅ Time spent validation passed: $TIME_SPENT hours"

# Check if the file contains at least 5 contributions
CONTRIBUTION_COUNT=$(grep -c "^[0-9]\." HCL_Report.md || echo "0")

if [ "$CONTRIBUTION_COUNT" -lt 5 ]; then
    echo "❌ ERROR: HCL_Report.md must contain at least 5 non-trivial contributions (found: $CONTRIBUTION_COUNT)"
    exit 1
fi

echo "✅ Contribution count validation passed: $CONTRIBUTION_COUNT contributions"

# Check if Curator information is present
if ! grep -q "Curator:" HCL_Report.md; then
    echo "❌ ERROR: HCL_Report.md must contain 'Curator:' field with curator information"
    exit 1
fi

echo "✅ Curator information validation passed"

echo "🎉 HCL validation successful!"
echo "   - File exists: ✅"
echo "   - Time spent: $TIME_SPENT hours (>= 2.0) ✅"
echo "   - Contributions: $CONTRIBUTION_COUNT (>= 5) ✅"
echo "   - Curator info: ✅"
echo ""
echo "🚀 Ready to merge to main branch - IP defensibility established!"
