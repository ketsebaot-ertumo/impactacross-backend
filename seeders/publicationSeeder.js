const { Publications } = require('../models/index');
const image = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750152643/ImpactAcross/images/photo_5947012572643444119_x_1_qzjcwq.jpg";
const file = `https://drive.google.com/uc?export=download&id=1SKy_npi510qn4zAIVz1FeNgtYNDXMoIO`;

const seedPublications = async (userId) => {
  await Publications.sync({ force: true });

  const publicationData = [
    {
      imageURL: image,
      title: "Sustainable Urban Development in Africa",
      content: "This publication explores the challenges...",
      author: "Dr. Abeba Tekle",
      fileURL: file,
      published_at: "2024-10-12",
      userId,
    },
    {
      imageURL: image,
      title: "Climate Resilience and Policy Making",
      content: "An in-depth analysis of policy frameworks...",
      author: "Prof. Daniel Mensah",
      fileURL: file,
      published_at: "2023-05-30",
      userId,
    },
    {
      imageURL: image,
      title: "Digital Transformation in Public Health",
      content: "This report outlines how digital technologies...",
      author: "Dr. Sarah Alemu",
      fileURL: file,
      published_at: "2024-03-22",
      userId,
    },
    {
      imageURL: image,
      title: "Gender Equity in Higher Education",
      content: "A comprehensive review of gender inclusion policies...",
      author: "Dr. Miriam Kassa",
      fileURL: file,
      published_at: "2023-09-08",
      userId,
    },
  ];

  await Publications.bulkCreate(publicationData);
};

module.exports = seedPublications;
