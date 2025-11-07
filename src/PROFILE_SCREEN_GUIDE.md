# Profile Screen Guide

## Overview
The new Profile Screen provides a centralized view of your account, personal information, and quick access to gamification stats.

## How to Access

### Method 1: Bottom Navigation
- Click the **Profile icon** (rightmost) in the bottom navigation bar
- Icon: User avatar
- Label: "Profile"

### Method 2: Home Screen
- Click the **Settings icon** (gear) in the top-right corner of the Home screen
- This will navigate to your Profile

## What's on the Profile Screen

### 1. **Profile Card (Top Section)**
**Blue gradient header with:**
- Back button (returns to Home)
- "My Profile" title
- Subtitle: "Manage your account and preferences"

**White card overlapping header with:**
- Large profile photo (with edit button)
- User name: "Sarah Anderson"
- Member since date: "January 2024"
- Level badge: "Apprentice Plumber" (gold gradient)

### 2. **Quick Stats (3 Cards)**
Three colorful stat boxes showing:

- **Credits** (Blue)
  - Icon: Lightning bolt (Zap)
  - Value: 120
  - Label: "Credits"

- **Badges** (Gold)
  - Icon: Trophy
  - Value: 2
  - Label: "Badges"

- **Rating** (Green)
  - Icon: Star
  - Value: 4.9
  - Label: "Rating"

**"View Full Dashboard" Button**
- Opens the detailed gamification dashboard
- Shows all badges, level progress, and achievements

### 3. **Personal Information Card**
Displays your account details with colorful icons:

- **Full Name**: Sarah Anderson (Blue user icon)
- **Email**: sarah.anderson@email.com (Purple mail icon)
- **Phone**: +1 (555) 123-4567 (Green phone icon)
- **Address**: 123 Main Street, San Francisco, CA 94102 (Orange location icon)
- **Member Since**: January 2024 (Pink calendar icon)

**Edit Button** at the top-right of this section

### 4. **Account Settings Card**
Four clickable options with right arrows:

- **Privacy & Security** (Blue shield icon)
  - "Manage your privacy settings"

- **Notifications** (Purple bell icon)
  - "Push, email, and SMS preferences"

- **Payment Methods** (Green credit card icon)
  - "Manage cards and payment options"

- **Help & Support** (Orange help icon)
  - "FAQs, contact us, and feedback"

### 5. **Bottom Actions**
- **Log Out** button (red, outline style)
  - Icon: Log out arrow
  - Text: "Log Out"

- **App Version**: "PlumbaFix v1.0.0"

### 6. **Bottom Navigation**
Standard 4-icon navigation bar (Profile is highlighted)

## Key Features

### ✅ Edit Profile
- Click the small edit icon on the profile photo
- Click "Edit" next to "Personal Information"

### ✅ View Full Dashboard
- Click the blue "View Full Dashboard" button
- Opens the detailed gamification view with:
  - All badges and unlock progress
  - Level progression bar
  - Complete achievement stats
  - Credits earned history

### ✅ Quick Access to Settings
- Privacy & Security
- Notifications
- Payment Methods
- Help & Support

### ✅ Account Management
- View all personal information at a glance
- Quick access to edit options
- Log out securely

## Design Details

### Color Scheme
- **Primary**: #007AFF (Blue)
- **Background**: #F4F8FB (Light blue-gray)
- **Accent Colors**: Purple, Green, Orange, Pink for different info types
- **Gold Gradient**: For level badge (#FFD700 to #FFA500)

### Layout
- Mobile-first design (428px × 926px)
- Overlapping header card design
- Rounded corners (rounded-xl, rounded-2xl)
- Soft shadows
- Colorful icon backgrounds

### Typography
- User name: Large (text-xl)
- Section headers: Medium (text-gray-900)
- Labels: Small (text-xs, text-gray-500)
- Values: Standard (text-gray-900)

## Navigation Flow

```
Home → Profile Icon/Settings Icon → Profile Screen
                                    ↓
                    ← "View Full Dashboard" → User Dashboard (Profile Tab)
                    ← "Privacy & Security" → User Settings
                    ← Other settings options → (Future screens)
```

## Integration with Gamification

The Profile Screen acts as a **hub** for your PlumbaFix account:

1. **Quick Stats** show your gamification progress at a glance
2. **View Full Dashboard** button provides deep dive into:
   - All 7 badges with unlock requirements
   - 5-level progression system
   - Complete achievement tracking
   - Credits earned and available
3. **Seamless navigation** between overview and detailed views

## User Experience Flow

### First-Time User (New Account)
- Profile shows: 0 Credits, 0 Badges, No Rating
- Level badge: "Beginner Plumber"
- Encourage to complete first DIY to earn rewards

### Active User (Current Test State)
- Profile shows: 120 Credits, 2 Badges, 4.9 Rating
- Level badge: "Apprentice Plumber"
- Clear progress indicators
- Easy access to redeem credits

### Power User (Advanced)
- Profile shows: 500+ Credits, 7 Badges, 5.0 Rating
- Level badge: "Master Plumber"
- Achievements prominently displayed
- Recognition of status

## Tips for Users

1. **Check your profile regularly** to see credit balance
2. **Click "View Full Dashboard"** to see all unlockable badges
3. **Edit your information** to keep your account up to date
4. **Manage notifications** to stay informed about plumber arrivals
5. **Add payment methods** for faster checkout

## Future Enhancements (Potential)

- [ ] Profile photo upload/change functionality
- [ ] Edit profile inline editing
- [ ] Notification preferences screen
- [ ] Payment methods management
- [ ] Help & Support FAQ section
- [ ] Achievement timeline/history
- [ ] Social sharing of achievements
- [ ] Referral program integration
