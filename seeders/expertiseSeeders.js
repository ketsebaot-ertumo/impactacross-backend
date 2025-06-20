const { Expertise } = require('../models/index'); 

module.exports = async () => {
    try {
        await Expertise.create({
            title: "Our Sector Expertise",
            description: "At ImpactAcross, we bring deep, multidisciplinary expertise to address complex development challenges across a range of critical sectors",
            image_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750097294/ImpactAcross/images/photo_5944760772829759996_x_omvwji.jpg",
        });

        console.log('Expertise seeders executed successfully.');
    } catch (error) {
        console.error('Error seeding expertise data:', error);
    }
};

