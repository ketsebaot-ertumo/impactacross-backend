const bcryptjs = require('bcryptjs');
const { sequelize, Users, Blogs } = require('../models/index');
const image = "https://drive.google.com/uc?id=1pMGXklJAHoz9YkE1udmLOLCofJhh9SPW";

(async () => {
  try {
    // await sequelize.sync({ force: true }); // This will drop and recreate all tables on this db
    await Users.sync({ force: true, tableName: 'users' });
    const generateHashedPassword = async () => {
      return await bcryptjs.hash('Admin123.', 10);
    };
    const password = await generateHashedPassword();
    const userData = [{ 
        firstName: 'admin', lastName: 'admin', email: 'admin@gmail.com', password: password, phone: '+251919765445', 
        isConfirmed: true, role: 'admin', createdAt: new Date(), updatedAt: new Date(), }
    ];
    await Users.bulkCreate(userData);

    const existingUser = await Users.findOne();
    if (!existingUser) {
      throw new Error('Cannot seed bookings: No users or services found.');
    }

    await Blogs.sync({ force: true });
    const blogData = [
      {
        userId: existingUser.id,
        title: "The Future of AI in Web Development",
        slug: "future-ai-web-development",
        content: "Artificial Intelligence is revolutionizing web development. Artificial Intelligence is revolutionizing web development",
        imageURL: image,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: existingUser.id,
        title: "The Benefits of Aromatherapy for Stress Relief",
        slug: "benefits-of-aromatherapy",
        content: "Aromatherapy is a powerful tool for reducing stress and enhancing relaxation. Learn how essential oils can improve your well-being.",
        imageURL: image,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: existingUser.id,
        title: "5 Skincare Routines for a Healthy Glow",
        slug: "skincare-routines-healthy-glow",
        content: "Discover five essential skincare routines that will help you maintain a radiant and youthful appearance.",
        imageURL: "https://drive.google.com/uc?id=1pMGXklJAHoz9YkE1udmLOLCofJhh9SPW",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: existingUser.id,
        title: "How to Choose the Right Massage for Your Needs",
        slug: "choose-right-massage",
        content: "Different types of massages provide different benefits. Find out which massage suits your body’s needs best.",
        imageURL: image,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: existingUser.id,
        title: "The Science Behind Anti-Aging Facials",
        slug: "science-of-anti-aging-facials",
        content: "Learn about the latest skincare treatments that slow down the aging process and keep your skin looking fresh.",
        imageURL: image,
        createdAt: new Date(),
        updatedAt: new Date(),
      },    
    ]
    await Blogs.bulkCreate(blogData);

    console.log('Seed data added successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await sequelize.close();
  }
})();
