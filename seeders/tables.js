const bcryptjs = require('bcryptjs');
const { sequelize, Users, Blogs } = require('../models/index');
const image = "https://drive.google.com/uc?id=1pMGXklJAHoz9YkE1udmLOLCofJhh9SPW";
// const image = "https://res-console.cloudinary.com/dq6mvqivd/thumbnails/v1/image/upload/v1703147258/QmxvZyBQb3N0L21wdnZ0bTJ3bmNkMmJ1dm4ybm5r/folder_thumbnail/d184OCxoXzg4LGNfdGh1bWI=";

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
    const data = [
      {
        userId: existingUser.id,
        title: "The Future of AI in Business Consultancy",
        slug: "future-ai-business-consultancy",
        content: "Artificial Intelligence is transforming the consultancy landscape—enhancing decision-making, streamlining operations, and delivering smarter insights for clients.",
        imageURL: image,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: existingUser.id,
        title: "Driving Digital Transformation in Organizations",
        slug: "digital-transformation-strategy",
        content: "Explore how consultancy firms are leading digital transformation initiatives to help businesses adapt, innovate, and stay competitive in the modern era.",
        imageURL: image,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: existingUser.id,
        title: "5 Key Strategies for Effective Business Growth",
        slug: "business-growth-strategies",
        content: "Learn about proven strategies that consultants use to help clients drive sustainable growth and long-term success.",
        imageURL: image,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: existingUser.id,
        title: "How to Optimize Operations Through Lean Consulting",
        slug: "optimize-operations-lean",
        content: "Lean methodology helps companies reduce waste, improve processes, and increase efficiency. Discover how consultants implement it effectively.",
        imageURL: image,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: existingUser.id,
        title: "Leadership Development in the Age of Disruption",
        slug: "leadership-development-disruption",
        content: "Consultants play a key role in building leadership resilience and adaptability amid fast-changing business environments.",
        imageURL: image,
        createdAt: new Date(),
        updatedAt: new Date(),
      },   
    ]
    await Blogs.bulkCreate(data);

    console.log('Seed data added successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await sequelize.close();
  }
})();
