const { Service } = require("../models/index");
const image_url = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750097496/ImpactAcross/images/photo_5944760772829759997_x_f4pshd.jpg"

module.exports = async (sectionMap) => {
  await Service.bulkCreate([
    {
      section_id: sectionMap["service"],
      title: "Research & Policy Analysis",
      content: "We deliver rigorous, high-quality studies that generate actionable insights to inform policy and support evidence-based decision-making. Our expertise spans impact evaluations, baseline and endline surveys, political economy and policy analysis, as well as thematic research on climate change, livelihoods, and governance.",
      slug: "research-policy-analysis",
      image_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750547334/ImpactAcross/images/WhatsApp_Image_2025-06-18_at_10.18.48_AM_sorrve.jpg",
    },
    {
      section_id: sectionMap["service"],
      title: "Program Design & Strategy Development",
      content: "We support the design of impactful and scalable programs rooted in local realities and aligned with global frameworks. Our services include conducting feasibility studies and investment cases, developing Theories of Change and results frameworks, and crafting compelling proposals and technical reports.",
      slug: "programme-design-strategy-development",
      image_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750547332/ImpactAcross/images/WhatsApp_Image_2025-06-18_at_10.08.52_AM_ofi9ol.jpg",
    },
    {
      section_id: sectionMap["service"],
      title: "Monitoring, Evaluation & Learning (MEL)",
      content: "We build robust Monitoring, Evaluation, and Learning (MEL) systems that enhance accountability, foster continuous learning, and support adaptive project management. Our work includes designing MEL frameworks and tools, conducting performance monitoring and data analysis, and managing learning processes and reporting to inform decision-making.",
      slug: "monitoring-evaluation-learning",
      image_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750547334/ImpactAcross/images/WhatsApp_Image_2025-06-18_at_9.52.55_AM_hv1ya0.jpg",
    },
    {
      section_id: sectionMap["service"],
      title: "Capacity Building & Technical Assistance",
      content: "We empower organizations and communities through tailored training, mentorship, and advisory support. Our services include capacity building in climate finance, monitoring and evaluation (M&E), and project management; strengthening organizational systems and structures; and facilitating effective stakeholder engagement for inclusive and sustainable impact.",
      slug: "capacity-building-technical-assistance",
      image_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750429155/ImpactAcross/images/gsptkznmiknaulsgaudx.jpg",
    },
  ]);
};
