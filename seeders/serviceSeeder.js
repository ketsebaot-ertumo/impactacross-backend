const { Service } = require("../models/index");
const image_url = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749803292/ImpactAcross/owner/test_g250va.jpg"

module.exports = async (sectionMap) => {
  await Service.bulkCreate([
    {
      section_id: sectionMap["service"],
      title: "Surveys & statistical analysis",
      content: "Members of our statistical teams are also members of the relevant internationally recognised statistical and actuarial associations. We conduct relevant statistical tests and analysis to ensure the most useful and appropriate insights are captured. We present our findings in ways that engage a broad variety of readers including those who are more and less comfortable with statistics.",
      slug: "survey-statistical-analysis",
      image_url,
    },
    {
      section_id: sectionMap["service"],
      title: "Programme Monitoring & Evaluation",
      content: "The growing demands for Monitoring and Evaluation in Africa are driven by civil society organisations and decision-makers in the region increasingly wanting to use evidence.",
      slug: "programme-monitoring-evaluation",
      image_url,
    },
    {
      section_id: sectionMap["service"],
      title: "Strategy & Programme Planning ",
      content: "The emphasis on achieving development outcomes means that development strategies need to be clearly articulated.",
      slug: "strategy-programme-planning",
      image_url,
    },
    {
      section_id: sectionMap["service"],
      title: "Training & Capacity Building",
      content: "ADC offers training solutions and interventions that are designed to achieve positive impact and result.",
      slug: "training-capacity-building",
      image_url,
    },
    {
      section_id: sectionMap["service"],
      title: "Ethnographic & Qualitative Research",
      content: "An ethnographer observes, records and shares synthesised information. Questions are posed and answered.",
      slug: "ethnographic-qualitative-research",
      image_url,
    },
  ]);
};
