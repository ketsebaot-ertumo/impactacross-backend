const { Multimedias } = require('../models/index');
const image = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1687943665/ffhpji16uejnyhkht5v9.jpg";

const seedMultimedias = async (userId) => {
  await Multimedias.sync({ force: true });

  const multimediaData = [
    {
      userId,
      title: "Introduction to Artificial Intelligence",
      content: "An engaging video covering AI basics...",
      mediaType: "Image",
      mediaURL: image,
      tags: ["AI", "Technology", "Machine Learning"],
      publishedAt: new Date("2024-10-15"),
      status: "Published",
    },
    {
      userId,
      title: "Data Science eBook",
      content: "Downloadable PDF covering data science techniques...",
      mediaURL: image,
      tags: ["Data Science", "PDF", "Analytics"],
      publishedAt: new Date("2024-09-05"),
      status: "Published",
    },
    {
      userId,
      title: "Cybersecurity Essentials",
      content: "Podcast about fundamentals of digital security...",
      mediaType: "Video",
      mediaURL: image,
      tags: ["Security", "Cybersecurity", "Podcast"],
      publishedAt: new Date("2025-01-12"),
      status: "Draft",
    },
  ];

  await Multimedias.bulkCreate(multimediaData);
};

module.exports = seedMultimedias;
