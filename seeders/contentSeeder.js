const { WhatWeDoImage, WhoWeAreContent } = require("../models/index");
const image_url = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749649722/ImpactAcross/owner/home_agwbvl.jpg"

module.exports = async (sectionMap) => {

  await WhoWeAreContent.create({
    description1 : 'Abbabor Development Consult (ADC) is an Ethiopia-based consulting firm dedicated to providing research solutions that empower governments and development organizations in achieving social and economic progress.', 
    description2 : "Our expertise lies in designing, monitoring, and evaluating strategies aligned with local and global development objectives. Through evidence-based policy and rigorous research, we strive to create meaningful impact and sustainable solutions for Africa's future.", 
    image_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749649671/ImpactAcross/owner/whoWeAre_d3qftv.png",
  });

  await WhatWeDoImage.bulkCreate([
    { section_id : sectionMap["what_we_do"], title: "Analysis", description: "We conduct rigorous research and assessments to generate evidence that illuminates the interconnected challenges across sectors like health, environment, climate change, and development.", image_url },
    { section_id : sectionMap["what_we_do"], title: "Strategy", description: "Our strategies are crafted to be forward-thinking, innovative, and actionable, ensuring they are adaptable to changing needs while driving long-term impact.", image_url },
    { section_id : sectionMap["what_we_do"], title: "Action", description: "We translate strategies into impactful, on-the-ground initiatives, ensuring communities and institutions are empowered to drive sustainable, lasting change.", image_url },
  ]);
};
