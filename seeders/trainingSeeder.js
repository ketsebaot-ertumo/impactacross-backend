const { Trainings } = require('../models/index');
const image = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750152863/ImpactAcross/images/photo_5947012572643444120_x_ldxoed.jpg";

const seedTrainings = async (userId) => {
  await Trainings.sync({ force: true });

  const trainingData = [
    {
      userId,
      title: "Sustainability Strategy & Impact Reporting",
      slug: "sustainability-strategy-impact-reporting",
      content: "A comprehensive offline training on developing sustainability strategies, ESG frameworks, and crafting credible impact reports.",
      trainingType: "Offline",
      location: "ImpactAcross Training Center, Addis Ababa",
      startDate: new Date("2025-07-10"),
      endDate: new Date("2025-07-15"),
      durationHours: 40,
      imageURL: image,
      certification: true,
      status: "Completed",
    },
    {
      userId, 
      title: "Climate Risk & Adaptation for Consultants",
      slug: "climate-risk-adaptation-consultants",
      content: "Online course teaching environmental consultants how to assess climate risk and recommend adaptation pathways.",
      trainingType: "Online",
      location: null,
      startDate: new Date("2025-08-01"),
      endDate: new Date("2025-08-05"),
      durationHours: 20,
      imageURL: image,
      certification: false,
      status: "Completed",
    },
    {
      userId,
      title: "Green Project Management Essentials",
      slug: "green-project-management-essentials",
      content: "A hybrid training on sustainable project design, implementation, and monitoring aligned with green standards.",
      trainingType: "Hybrid",
      location: "Zoom + Nairobi Innovation Hub",
      startDate: new Date("2025-09-05"),
      endDate: new Date("2025-09-10"),
      durationHours: 15,
      imageURL: image,
      certification: true,
      status: "Draft",
    },
  ];

  await Trainings.bulkCreate(trainingData);
};

module.exports = seedTrainings;
