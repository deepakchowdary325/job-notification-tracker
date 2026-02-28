/**
 * Calculates a match score (0-100) based on user preferences and job details.
 * 
 * Rules:
 * +25 if any roleKeyword appears in job.title (case-insensitive)
 * +15 if any roleKeyword appears in job.description
 * +15 if job.location matches preferredLocations
 * +10 if job.mode matches preferredMode
 * +10 if job.experience matches experienceLevel
 * +15 if overlap between job.skills and user.skills (any match)
 * +5 if postedDaysAgo <= 2
 * +5 if source is LinkedIn
 */
export const calculateMatchScore = (job, preferences) => {
    if (!preferences) return 0;

    let score = 0;

    // 1. Role Keywords in Title (+25)
    const keywords = preferences.roleKeywords?.split(',').map(k => k.trim().toLowerCase()) || [];
    if (keywords.some(k => k && job.title.toLowerCase().includes(k))) {
        score += 25;
    }

    // 2. Role Keywords in Description (+15)
    if (keywords.some(k => k && job.description.toLowerCase().includes(k))) {
        score += 15;
    }

    // 3. Location Match (+15)
    const prefLocations = preferences.preferredLocations || [];
    if (prefLocations.includes(job.location)) {
        score += 15;
    }

    // 4. Mode Match (+10)
    const prefModes = preferences.preferredMode || [];
    if (prefModes.includes(job.mode)) {
        score += 10;
    }

    // 5. Experience Match (+10)
    if (preferences.experienceLevel === job.experience) {
        score += 10;
    }

    // 6. Skills Overlap (+15)
    const userSkills = preferences.skills?.split(',').map(s => s.trim().toLowerCase()) || [];
    const jobSkills = job.skills.map(s => s.toLowerCase());
    if (userSkills.some(s => s && jobSkills.includes(s))) {
        score += 15;
    }

    // 7. Freshness (+5)
    if (job.postedDaysAgo <= 2) {
        score += 5;
    }

    // 8. Source LikedIn (+5)
    if (job.source === 'LinkedIn') {
        score += 5;
    }

    return Math.min(score, 100);
};

export const getScoreColor = (score) => {
    if (score >= 80) return '#4A6741'; // Success Green
    if (score >= 60) return '#BC8F22'; // Warning Amber
    if (score >= 40) return '#111111'; // Neutral Black
    return 'rgba(17, 17, 17, 0.4)'; // Subtle Grey
};
