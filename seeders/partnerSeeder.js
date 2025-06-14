const { Partner } = require("../models/index");

module.exports = async (sectionMap) => {
  await Partner.bulkCreate([
    {
      section_id: sectionMap["partner"],
      name: "EOC-DICAC",
      logo_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749820477/ImpactAcross/partners/download_ol0tvw.jpg",
    },
    {
      section_id: sectionMap["partner"],
      name: "EECMY DASSC",
      logo_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749820525/ImpactAcross/partners/download_cafjt9.jpg",
    },
    {
      section_id: sectionMap["partner"],
      name: "NABU ",
      logo_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749820579/ImpactAcross/partners/download_ef7ugc.jpg",
    },
    {
      section_id: sectionMap["partner"],
      name: "CARE",
      logo_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749820606/ImpactAcross/partners/download_w7dhej.png",
    },
    {
      section_id: sectionMap["partner"],
      name: "PAPDA",
      logo_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749820713/ImpactAcross/partners/download_ujhzcj.jpg",
    },
    {
      section_id: sectionMap["partner"],
      name: "Wako Gutu Foundation",
      logo_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749820716/ImpactAcross/partners/download_gzj5oj.png",
    },
    {
      section_id: sectionMap["partner"],
      name: "Bread for the World/PADD",
      logo_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749820736/ImpactAcross/partners/download_vpcqjb.png",
    },
    {
      section_id: sectionMap["partner"],
      name: "David and Lucile Packard Foundation",
      logo_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749820833/ImpactAcross/partners/download_ofqstg.png",
    },
    {
      section_id: sectionMap["partner"],
      name: "BBC Media Action",
      logo_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749820837/ImpactAcross/partners/download_zesbir.png",
    },
  ]);
};
