const { Publication } = require('../models/index');
const image = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750152643/ImpactAcross/images/photo_5947012572643444119_x_1_qzjcwq.jpg";


const seedPublications = async (userId) => {
  await Publication.sync({ force: true });

  const publicationData = [
    {
      title: "Innovation pathways in the coffee sector in Ethiopia and Kenya",
      authors: "Duguma LA, Muthee K, Carsan S, Muriuki J, Bulitta BJ, Ayana AN, Kibugi RM, Suleman KK",
      editors: "Minang PA, Duguma LA, van Noordwijk M",
      year: 2021,
      publication_type: "Book Chapter",
      source: "Tree Commodities and Resilient Green Economies in Africa",
      location: "Nairobi, Kenya",
      url: "https://worldagroforestry.org/publication/innovation-pathways-coffee-sector-ethiopia-andkenya",
      image_url: image,
      userId
    },
    {
      title: "Upscaling climate-smart agriculture in sub-Saharan Africa",
      authors: "Suleman K.K.",
      editors: null,
      year: 2017,
      publication_type: "Policy Insight",
      source: "SAIIA Policy Insight",
      location: null,
      url: "http://www.saiia.org.za/policy-insights/1233-upscaling-climate-smart-agriculture-insub-saharan-africa/file",
      image_url: image,
      userId
    },
    {
      title: "The interface between ABS and Biotrade in Namibia. Potential areas of synergy.",
      authors: "Suleman K.K.",
      editors: null,
      year: 2017,
      publication_type: "Occasional Paper",
      source: "SAIIA Occasional Paper",
      location: null,
      url: "http://www.saiia.org.za/occasional-papers/the-interfacebetween-access-and-benefit-sharing-and-biotrade-in-namibia-exploring-potential-areas-ofsynergy",
      image_url: image,
      userId
    },
    {
      title: "Balancing conservation and mining in South-West Ethiopia",
      authors: "Suleman K.K.",
      editors: null,
      year: 2017,
      publication_type: "Policy Insight",
      source: "SAIIA Policy Insight",
      location: null,
      url: "http://www.saiia.org.za/policy-insights/balancing-coal-mining-and-conservation-insouth-west-ethiopia",
      image_url: image,
      userId
    }
  ];

  await Publication.bulkCreate(publicationData);
};

module.exports = seedPublications;
