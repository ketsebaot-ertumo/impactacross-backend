const { Trainings } = require('../models/index');
const image = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1687943665/ffhpji16uejnyhkht5v9.jpg";

const seedTrainings = async (userId) => {
  await Trainings.sync({ force: true });

  const trainingData = [
    {
      userId,
      title: "Advanced Web Development Bootcamp",
      slug: "advanced-web-development-bootcamp",
      content: "An intensive training covering frontend and backend...",
      trainingType: "Offline",
      location: "Addis Ababa Tech Hub",
      startDate: "2025-05-01",
      endDate: "2025-05-10",
      durationHours: 40,
      imageURL: image,
      certification: true,
      status: "Completed",
    },
    {
      userId,
      title: "Remote Leadership Skills",
      slug: "remote-leadership-skills",
      content: "Learn how to lead remote teams...",
      trainingType: "Online",
      location: null,
      startDate: "2025-04-15",
      endDate: "2025-04-20",
      durationHours: 20,
      imageURL: image,
      certification: false,
      status: "Completed",
    },
    {
      userId,
      title: "Digital Marketing 101",
      slug: "digital-marketing-101",
      content: "Intro to SEO, social media, and email marketing...",
      trainingType: "Hybrid",
      location: "Zoom + Nairobi Innovation Hub",
      startDate: "2025-06-01",
      endDate: "2025-06-07",
      durationHours: 15,
      imageURL: image,
      certification: true,
      status: "Draft",
    },
  ];

  await Trainings.bulkCreate(trainingData);
};

module.exports = seedTrainings;
