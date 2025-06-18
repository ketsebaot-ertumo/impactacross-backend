const { Blogs } = require('../models/index');

const image1 = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1687943665/ffhpji16uejnyhkht5v9.jpg";
const image2 = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750097294/ImpactAcross/images/photo_5944760772829759996_x_omvwji.jpg";
const image3 = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750152643/ImpactAcross/images/photo_5947012572643444119_x_1_qzjcwq.jpg";
const image4 = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750152863/ImpactAcross/images/photo_5947012572643444120_x_ldxoed.jpg";

const seedBlogs = async (userId) => {
  await Blogs.sync({ force: true });

  const data = [
    {
      userId,
      title: "Sustainability Consulting: The Future of Responsible Business",
      slug: "sustainability-consulting-future",
      content:
        "Sustainability consultancy is at the forefront of helping businesses align profitability with environmental and social responsibility. Discover how consultants guide organizations toward greener practices, compliance, and long-term impact.",
      imageURL: image1,
    },
    {
      userId,
      title: "Carbon Footprint Auditing and Emissions Reduction",
      slug: "carbon-footprint-auditing",
      content:
        "Explore how sustainability consultants perform carbon audits and help organizations set actionable goals to reduce emissions. From supply chains to energy consumption, every aspect of business can contribute to a cleaner planet.",
      imageURL: image2,
    },
    {
      userId,
      title: "Building ESG Strategies That Drive Business Value",
      slug: "esg-strategies-business-value",
      content:
        "Environmental, Social, and Governance (ESG) is more than a buzzword—it's a strategic pillar. Learn how consultancy services support organizations in crafting ESG strategies that attract investors, customers, and top talent.",
      imageURL: image3,
    },
    {
      userId,
      title: "Circular Economy Consulting: Designing Out Waste",
      slug: "circular-economy-consulting",
      content:
        "Consultants are helping companies transition from linear to circular models—where resources are reused, recycled, and repurposed. Learn how this shift is shaping product design, logistics, and business models.",
      imageURL: image4,
    },
    {
      userId,
      title: "Stakeholder Engagement in Sustainable Development",
      slug: "stakeholder-engagement-sustainability",
      content:
        "Successful sustainability strategies are inclusive. Discover how consultants facilitate dialogue with communities, regulators, and investors to ensure sustainable initiatives are impactful and collaborative.",
      imageURL: image1,
    },
  ];

  await Blogs.bulkCreate(
    data.map((d) => ({
      ...d,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))
  );
};

module.exports = seedBlogs;
