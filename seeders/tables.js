const bcryptjs = require('bcryptjs');
const { sequelize, Users, Blogs, Publications, Multimedias, Trainings } = require('../models/index');
const image = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1687943665/ffhpji16uejnyhkht5v9.jpg";
const fileID = "1SKy_npi510qn4zAIVz1FeNgtYNDXMoIO";
const file = `https://drive.google.com/uc?export=download&id=${fileID}`;
const media = "https://youtu.be/iGQ6KfyH5Vs?si=CDGjhHu3py9_nrt8";


(async () => {
  try {
    // await sequelize.sync({ force: true }); // This will drop and recreate all tables on this db
    await Users.sync({ force: true, tableName: 'users' });
    const generateHashedPassword = async () => {
      return await bcryptjs.hash('Admin123.', 10);
    };
    const password = await generateHashedPassword();
    const userData = [
      { 
        firstName: 'super', lastName: 'admin', email: 'superadmin@gmail.com', password: password, phone: '+251919765445', 
        isConfirmed: true, role: 'super-admin', createdAt: new Date(), updatedAt: new Date(), 
      },
      { 
        firstName: 'user', lastName: 'user', email: 'user@gmail.com', password: password, phone: '+251919765445', 
        isConfirmed: true, role: 'user', createdAt: new Date(), updatedAt: new Date(), 
      },
      { 
        firstName: 'admin', lastName: 'admin', email: 'admin@gmail.com', password: password, phone: '+251919765445', 
        isConfirmed: true, role: 'admin', createdAt: new Date(), updatedAt: new Date(), 
      },
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
        imageURL: image,
        title: "Sustainable Urban Development in Africa",
        content: "This publication explores the challenges and strategies in achieving sustainable urban development across the African continent, focusing on infrastructure, housing, and governance.",
        author: "Dr. Abeba Tekle",
        fileURL: file,
        published_at: "2024-10-12",
        userId: existingUser.id,
      },
      {
        imageURL: image,
        title: "Climate Resilience and Policy Making",
        content: "An in-depth analysis of policy frameworks that support climate resilience, with case studies from Ethiopia, Kenya, and Ghana.",
        author: "Prof. Daniel Mensah",
        fileURL: file,
        published_at: "2023-05-30",
        userId: existingUser.id,
      },
      {
        imageURL: image,
        title: "Digital Transformation in Public Health",
        content: "This report outlines how digital technologies are revolutionizing healthcare delivery and access in low-resource settings.",
        author: "Dr. Sarah Alemu",
        fileURL: file,
        published_at: "2024-03-22",
        userId: existingUser.id,
      },
      {
        imageURL: image,
        title: "Gender Equity in Higher Education",
        content: "A comprehensive review of gender inclusion policies and the impact of educational reforms on female representation in tertiary institutions.",
        author: "Dr. Miriam Kassa",
        fileURL: file,
        published_at: "2023-09-08",
        userId: existingUser.id,
      },
    ];
    await Publications.bulkCreate(publicationData);

    await Multimedias.sync({ force: true });
    const multimediaData = [
      {
        userId: existingUser.id,
        title: "Introduction to Artificial Intelligence",
        content: "An engaging video covering the basics of AI and its real-world applications.",
        mediaType: "Image",
        mediaURL: image,
        tags: ["AI", "Technology", "Machine Learning"],
        publishedAt: new Date("2024-10-15"),
        status: "Published",
      },
      {
        userId: existingUser.id,
        title: "Data Science eBook",
        content: "Downloadable PDF book covering practical data science techniques and case studies.",
        mediaURL: image,
        tags: ["Data Science", "PDF", "Analytics"],
        publishedAt: new Date("2024-09-05"),
        status: "Published",
      },
      {
        userId: existingUser.id,
        title: "Cybersecurity Essentials",
        content: "Informative podcast episode discussing the fundamentals of digital security.",
        mediaType: "Video",
        mediaURL: image,
        tags: ["Security", "Cybersecurity", "Podcast"],
        publishedAt: new Date("2025-01-12"),
        status: "Draft",
      }
    ];    
    await Multimedias.bulkCreate(multimediaData);

    await Trainings.sync({ force: true });
    const trainingData = [
      {
        userId: existingUser.id,
        title: "Advanced Web Development Bootcamp",
        slug: "advanced-web-development-bootcamp",
        content: "An intensive training program covering frontend and backend development.",
        trainingType: "Offline",
        location: "Addis Ababa Tech Hub",
        startDate: "2025-05-01",
        endDate: "2025-05-10",
        durationHours: 40,
        imageURL: image,
        certification: true,
        status: "Published",
      },
      {
        userId: existingUser.id,
        title: "Remote Leadership Skills",
        slug: "remote-leadership-skills",
        content: "Learn how to lead teams effectively in a remote or hybrid environment.",
        trainingType: "Online",
        location: null,
        startDate: "2025-04-15",
        endDate: "2025-04-20",
        durationHours: 20,
        imageURL: image,
        certification: false,
        status: "Published",
      },
      {
        userId: existingUser.id,
        title: "Digital Marketing 101",
        slug: "digital-marketing-101",
        content: "A hybrid training introducing SEO, social media, and email marketing strategies.",
        trainingType: "Hybrid",
        location: "Zoom + Nairobi Innovation Hub",
        startDate: "2025-06-01",
        endDate: "2025-06-07",
        durationHours: 15,
        imageURL: image,
        certification: true,
        status: "Draft",
      }
    ];    
    await Trainings.bulkCreate(trainingData);

    console.log('Seed data added successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await sequelize.close();
  }
})();
