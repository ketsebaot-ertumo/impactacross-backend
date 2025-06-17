const { Blogs } = require('../models/index');
const image = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1687943665/ffhpji16uejnyhkht5v9.jpg";
const image2 = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750097294/ImpactAcross/images/photo_5944760772829759996_x_omvwji.jpg";
const image3 = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750152643/ImpactAcross/images/photo_5947012572643444119_x_1_qzjcwq.jpg";
const image4 = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750152863/ImpactAcross/images/photo_5947012572643444120_x_ldxoed.jpg";

const seedBlogs = async (userId) => {
  await Blogs.sync({ force: true });

  const data = [
    {
      userId,
      title: "The Future of AI in Business Consultancy",
      slug: "future-ai-business-consultancy",
      content: "Artificial Intelligence is transforming the consultancy landscape...",
      imageURL: image,
    },
    {
      userId,
      title: "Driving Digital Transformation in Organizations",
      slug: "digital-transformation-strategy",
      content: "Explore how consultancy firms are leading digital transformation...",
      imageURL: image,
    },
    {
      userId,
      title: "5 Key Strategies for Effective Business Growth",
      slug: "business-growth-strategies",
      content: "Learn about proven strategies that consultants use...",
      imageURL: image,
    },
    {
      userId,
      title: "How to Optimize Operations Through Lean Consulting",
      slug: "optimize-operations-lean",
      content: "Lean methodology helps companies reduce waste...",
      imageURL: image,
    },
    {
      userId,
      title: "Leadership Development in the Age of Disruption",
      slug: "leadership-development-disruption",
      content: "Consultants play a key role in building leadership resilience...",
      imageURL: image,
    },
  ];

  await Blogs.bulkCreate(data.map(d => ({ ...d, createdAt: new Date(), updatedAt: new Date() })));
};

module.exports = seedBlogs;
