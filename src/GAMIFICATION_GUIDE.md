# PlumbaFix Gamification System Guide

## Overview
The gamification system rewards users for completing DIY repairs with credits, badges, and levels.

## How to See the Gamification Features

### 1. **Home Screen (After Login)**
- At the top of the home screen, you'll see two cards showing:
  - **Credits**: Your available credits (currently showing 120)
  - **Level**: Your current level name (currently showing "Apprentice")

### 2. **Profile Screen (Quick Overview)**
To access your profile with quick stats:
1. Click the **"Profile"** icon in the bottom navigation (rightmost)
   - OR click the **Settings icon** at the top-right of Home
2. You'll see:
   - Profile photo and name
   - Quick stats: Credits, Badges, Rating
   - **"View Full Dashboard"** button
   - Personal information
   - Account settings

### 3. **Dashboard Profile Tab (Detailed Gamification)**
To access the comprehensive gamification dashboard:
1. Click the **"Jobs"** icon in the bottom navigation
2. Click the **"Profile"** tab at the top
3. You'll see:
   - **Credits & Level Overview Card** (Blue gradient)
     - Current level name
     - Trophy icon
     - Credits available to redeem
     - DIY repairs completed count
   
   - **Level Progress Card**
     - Progress bar showing progress to next level
     - How many more DIY repairs needed
   
   - **Badges Section**
     - 7 total badges available
     - Shows which badges are unlocked (2/7 currently unlocked)
     - Locked badges show requirements
     - Unlocked badges have golden border
   
   - **Your Achievements Card**
     - Total credits earned
     - Badges unlocked count
     - Current level
     - DIY repairs completed
   
   - **How to Earn Credits Info Card**

### 3. **DIY Completion Flow**
To see the full gamification experience:
1. Go to Home → Click "Diagnose My Issue"
2. Select "Camera" → Take/Upload photo
3. On Diagnostic Result → Click "DIY Repair"
4. Complete all steps in DIY Guide
5. Click "Claim Rewards" to see the **DIY Rewards Screen**
   - Confetti animation
   - Credits earned breakdown
   - Level up notification (if applicable)
   - New badges unlocked
   - Progress summary

### 4. **Credit Redemption**
When booking a plumber:
1. Complete diagnostic → Click "Book Expert Plumber"
2. On Job Request screen, you'll see:
   - **"Use Credits"** toggle switch
   - Available credits badge
   - Real-time cost calculation
   - Savings display when credits are applied
   - Updated total cost

## Current Test Data
The app is pre-loaded with sample progress:
- **Credits**: 120
- **Level**: 2 (Apprentice)
- **DIY Completed**: 4 repairs
- **Badges Unlocked**: 2/7
  - 🔧 First Fix
  - 🌟 Getting Started

## Levels System
1. **Level 1 - Beginner**: 0-2 DIY repairs
2. **Level 2 - Apprentice**: 3-6 DIY repairs ← YOU ARE HERE
3. **Level 3 - Handyman**: 7-14 DIY repairs
4. **Level 4 - Expert Plumber**: 15-24 DIY repairs
5. **Level 5 - Master Plumber**: 25+ DIY repairs

## All Available Badges
1. 🔧 **First Fix** - 1 repair (UNLOCKED)
2. 🌟 **Getting Started** - 3 repairs (UNLOCKED)
3. 💧 **Water Wizard** - 5 repairs (2 more needed)
4. 🛠️ **Tool Master** - 7 repairs (3 more needed)
5. 💰 **Money Saver** - 10 repairs (6 more needed)
6. ⚡ **DIY Pro** - 15 repairs (11 more needed)
7. 👑 **Plumbing Legend** - 25 repairs (21 more needed)

## Navigation Paths

### Quick Profile View:
1. Click **Profile** icon (user) in bottom navigation → Profile Screen
2. Click **"View Full Dashboard"** to see detailed gamification

### Detailed Gamification View:
1. Click **Jobs** icon (briefcase) in bottom navigation
2. Click **Profile** tab at the top
3. Scroll to see all gamification features

## Key Features to Test
✅ View credits and level on home screen
✅ Navigate to Profile tab to see full dashboard
✅ Complete a DIY repair to earn rewards
✅ Use credits when booking a plumber
✅ Check badge progress and unlock status
✅ Monitor level progression
