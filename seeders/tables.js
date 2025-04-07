const bcryptjs = require('bcryptjs');
const { sequelize, Users, Blogs, Publications } = require('../models/index');
const image = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1687943665/ffhpji16uejnyhkht5v9.jpg";

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

    await Publications.sync({ force: true });
    const publicationData = [
      {
        name: "publications",
        image: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1686726440/cld-sample-4.jpg",
        title: "Sustainable Urban Development in Africa",
        content: "This publication explores the challenges and strategies in achieving sustainable urban development across the African continent, focusing on infrastructure, housing, and governance.",
        author: "Dr. Abeba Tekle",
        published_at: "2024-10-12",
        userId: existingUser.id,
      },
      {
        name: "publications",
        image: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1686726400/cld-sample-3.jpg",
        title: "Climate Resilience and Policy Making",
        content: "An in-depth analysis of policy frameworks that support climate resilience, with case studies from Ethiopia, Kenya, and Ghana.",
        author: "Prof. Daniel Mensah",
        published_at: "2023-05-30",
        userId: existingUser.id,
      },
      {
        name: "publications",
        image: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1686726300/cld-sample.jpg",
        title: "Digital Transformation in Public Health",
        content: "This report outlines how digital technologies are revolutionizing healthcare delivery and access in low-resource settings.",
        author: "Dr. Sarah Alemu",
        published_at: "2024-03-22",
        userId: existingUser.id,
      },
      {
        name: "publications",
        image: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1686726440/cld-sample-4.jpg",
        title: "Gender Equity in Higher Education",
        content: "A comprehensive review of gender inclusion policies and the impact of educational reforms on female representation in tertiary institutions.",
        author: "Dr. Miriam Kassa",
        published_at: "2023-09-08",
        userId: existingUser.id,
      },
    ];
    await Publications.bulkCreate(publicationData);

    console.log('Seed data added successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await sequelize.close();
  }
})();
