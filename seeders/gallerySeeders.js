const { Gallery } = require('../models/index'); 

module.exports = async () => {
    try {
        await Gallery.bulkCreate([
            {
            title: 'Project Planning Workshop',
            description: 'Images from our workshop on effective project planning.',
            image_url: 'https://res.cloudinary.com/dq6mvqivd/image/upload/v1750154332/ImpactAcross/images/xn7sv2oliyhvwlzdtnfd.jpg',
            video_url: 'https://example.com/videos/project-planning.mp4',
            category: 'Workshops',
            createdAt: new Date(),
            updatedAt: new Date(),
            },
            {
            title: 'Community Engagement Event',
            description: 'Snapshots from our community engagement event.',
            image_url: 'https://res.cloudinary.com/dq6mvqivd/image/upload/v1750155484/ImpactAcross/images/wpcammpxjonbhjdd2cay.jpg',
            video_url: 'https://example.com/videos/community-engagement.mp4',
            category: 'Events',
            createdAt: new Date(),
            updatedAt: new Date(),
            },
            {
            title: 'Consultancy Meeting',
            description: 'Photos from a consultancy meeting with stakeholders.',
            image_url: 'https://res.cloudinary.com/dq6mvqivd/image/upload/v1750155484/ImpactAcross/images/wpcammpxjonbhjdd2cay.jpg',
            video_url: 'https://example.com/videos/consultancy-meeting.mp4',
            category: 'Meetings',
            createdAt: new Date(),
            updatedAt: new Date(),
            },
        ]);

        console.log('Gallery seeders executed successfully.');
    } catch (error) {
        console.error('Error seeding gallery data:', error);
    }
};
