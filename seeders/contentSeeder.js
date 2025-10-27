const { WhatWeDoImage } = require("../models/index");
const image_url = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749649722/ImpactAcross/owner/home_agwbvl.jpg"
const image2 = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750097294/ImpactAcross/images/photo_5944760772829759996_x_omvwji.jpg";
const image3 = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750152643/ImpactAcross/images/photo_5947012572643444119_x_1_qzjcwq.jpg";
const image4 = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750152863/ImpactAcross/images/photo_5947012572643444120_x_ldxoed.jpg";


module.exports = async (sectionMap) => {
  await WhatWeDoImage.bulkCreate([
    { section_id : sectionMap["what_we_do"], title: "Cross-Sectoral Impact", description: "We conduct technical studies and feasibility assessments that inform transformative solutions across climate change, natural resource management, forestry, livelihoods, energy, and agriculture.", image_url: image2 },
    { section_id : sectionMap["what_we_do"], title: "Multi-Stakeholder Engagement", description: "We build capacity through training, advisory, and implementation support for governments, donors, private sector actors, NGOs, and communities—promoting inclusive, collaborative action.", image_url },
    { section_id : sectionMap["what_we_do"], title: "Geographical Reach", description: "Our consultancy services span multiple regions and countries, with localized strategies that are responsive, scalable, and sustainable.", image_url: image3 },
    { section_id : sectionMap["what_we_do"], title: "Holistic Solutions", description: "We integrate policy analysis, technological insights, and practical implementation to develop strategies that bridge research with real-world action.", image_url: image4 },
    { section_id : sectionMap["what_we_do"], title: "End-to-End Services", description: "From early-stage feasibility and strategic planning to implementation support and impact assessments, we offer comprehensive services throughout the project lifecycle.", image_url },
  ]);
};
