const { Gallery } = require('../models/index'); 

module.exports = async () => {
    try {
        await Gallery.bulkCreate([
            {
                title: 'Project Planning Workshop',
                description: 'Images from our workshop on effective project planning.',
                media_url: 'https://res.cloudinary.com/dq6mvqivd/image/upload/v1750154332/ImpactAcross/images/xn7sv2oliyhvwlzdtnfd.jpg',
                media_type: 'image',
                category: 'Workshops',
                createdAt: new Date('2025-06-15T10:00:00Z'),
                updatedAt: new Date('2025-06-15T10:00:00Z')
            },
            {
                title: 'Community Engagement Event',
                description: 'Snapshots from our community engagement event.',
                media_url: 'https://res.cloudinary.com/dq6mvqivd/image/upload/v1750155484/ImpactAcross/images/wpcammpxjonbhjdd2cay.jpg',
                media_type: 'image',
                category: 'Events',
                createdAt: new Date('2025-06-15T10:00:00Z'),
                updatedAt: new Date('2025-06-15T10:00:00Z')
            },
            {
                title: 'Consultancy Meeting',
                description: 'Photos from a consultancy meeting with stakeholders.',
                media_url: 'https://res.cloudinary.com/dq6mvqivd/image/upload/v1750155484/ImpactAcross/images/wpcammpxjonbhjdd2cay.jpg',
                media_type: 'image',
                category: 'Meetings',
                createdAt: new Date('2025-06-15T10:00:00Z'),
                updatedAt: new Date('2025-06-15T10:00:00Z')
            },
            {
                title: 'Annual Review Conference',
                description: 'Highlights from our annual review conference.',
                media_url: 'https://res.cloudinary.com/dq6mvqivd/image/upload/v1750097294/ImpactAcross/images/photo_5944760772829759996_x_omvwji.jpg',
                media_type: 'image',
                category: 'Conferences',
                createdAt: new Date('2025-05-05T11:00:00Z'),
                updatedAt: new Date('2025-05-05T10:00:00Z'),
            },
            {
                title: 'Training Session on Leadership',
                description: 'Photos from our leadership training session.',
                media_url: 'https://res.cloudinary.com/dq6mvqivd/image/upload/v1750097294/ImpactAcross/images/photo_5944760772829759996_x_omvwji.jpg',
                media_type: 'image',
                category: 'Training',
                createdAt: new Date('2025-05-12T13:45:00Z'),
                updatedAt: new Date('2025-05-12T10:00:00Z'),
            },
            {
                title: 'Volunteer Appreciation Day',
                description: 'Moments from our volunteer appreciation day.',
                media_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750097294/ImpactAcross/images/photo_5944760772829759996_x_omvwji.jpg",
                media_type: 'image',
                category: 'Celebrations',
                createdAt: new Date('2025-04-18T16:20:00Z'),
                updatedAt: new Date('2025-04-18T10:00:00Z'),
            },
        ]);

        console.log('Gallery seeders executed successfully.');
    } catch (error) {
        console.error('Error seeding gallery data:', error);
    }
};
