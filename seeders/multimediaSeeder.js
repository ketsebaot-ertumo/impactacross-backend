const { Multimedias } = require('../models/index');
const image = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750097294/ImpactAcross/images/photo_5944760772829759996_x_omvwji.jpg";

const seedMultimedias = async (userId) => {
  await Multimedias.sync({ force: true });

  const multimediaData = [
    {
      userId,
      title: "Sustainable Development Goals Explained",
      content: "An introductory video explaining the UN SDGs and how businesses can align their goals with global impact.",
      mediaType: "Video",
      mediaURL: image,
      tags: ["Sustainability", "SDGs", "Development"],
      publishedAt: new Date("2024-10-15"),
      status: "Published",
    },
    {
      userId,
      title: "Sustainability Assessment Checklist (PDF)",
      content: "Downloadable resource to evaluate your organization’s sustainability practices and priorities.",
      mediaType: "Document",
      mediaURL: image,
      tags: ["Checklist", "Sustainability", "Consultancy"],
      publishedAt: new Date("2024-09-05"),
      status: "Published",
    },
    {
      userId,
      title: "Green Consulting: Real Case Studies",
      content: "A podcast highlighting real-world consultancy engagements focused on climate resilience and green innovation.",
      mediaType: "Podcast",
      mediaURL: image,
      tags: ["Green Economy", "Consulting", "Podcast"],
      publishedAt: new Date("2025-01-12"),
      status: "Draft",
    },
  ];

  await Multimedias.bulkCreate(multimediaData);
};

module.exports = seedMultimedias;
