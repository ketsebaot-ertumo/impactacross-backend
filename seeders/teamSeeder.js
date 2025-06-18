const { Team, TeamLink } = require("../models/index");

const image_url = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749649749/ImpactAcross/owner/ourTeam_bkkp8t.png";

module.exports = async (sectionMap) => {
  const teams = await Team.bulkCreate([
    {
      section_id: sectionMap["team"],
      name: "Kassahun K. Suleman(PhD)",
      position: "Founder & CTO",
      email: "kassahunks@impactacross.com",
      linkedin: "https://linkedin.com/in/",
      facebook: "https://facebook.com",
      description: "Kassahun has a PhD in Development Studies from University of the Western Cape in South Africa.  With 13+ years of experience working in different countries around the world, he has deep domain expertise in a broad cross section of disciplines ranging from agricultural development and food systems, rural development, natural resources governance, climate change adaptation and rural economy. Having managed and executed large and complex rural development projects in Ethiopia and conducted scientific research in various African countries, he is now proud to consolidate his 13+ years of research and project/program management expertise with that of clients who have the same values and beliefs in evidence-based and high quality solutions.",
      image_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750181190/ImpactAcross/images/WhatsApp_Image_2025-06-17_at_8.12.33_PM_jgj4wi.jpg",
    },
    {
      section_id: sectionMap["team"],
      name: "Mr. Abraham Getachew",
      position: "Operation Manager",
      email: "abrahamg@impactacross.com",
      linkedin: "https://linkedin.com/in/",
      facebook: "https://facebook.com",
      description: 
      "Mr. Abraham has more than 12 years of experience as organizational development expert, leadership and management advisor, country director for international organizations and project manager & coordinator for local organizations. Abraham is a great trainer, inspirational speaker, and strategist for both community and faith-based organizations in Ethiopia. With his leadership expertise, he has trained and inspired thousands across the country, initiated regional networks, and started indigenous business and ministry organizations. He&apos;s proven expertise in assessing the institutional and technical capacity of organizations, identifying gaps, and elevating the capacity of organizations in Ethiopia. Moreover, Mr. Abraham is known for both his expertise and passion of generously empowering people and organizations so that they may serve with excellence in their spheres of influence.",
      image_url,
    },
    {
      section_id: sectionMap["team"],
      name: "Zerihun Berhane(PhD)",
      position: "Research Associate",
      email: "team@gmail.com",
      linkedin: "https://linkedin.com/in/",
      facebook: "https://facebook.com",
      description: "Zerihun Berhane has a PhD in Local Development and Global Dynamics from the University of Trento, Italy. He has two MA degrees&ndash;one in Globalization and Development from the University of Antwerp, Belgium and another in Development Studies with specialization in Rural livelihoods and Development from Addis Ababa University, Ethiopia. Zerihun has worked in various positions with organizations providing research, training, and capacity building services and undertaking qualitative and quantitative analyses and impact evaluation of programs. He has worked as a consultant in capacity assessment projects, conducted baseline surveys, mid-term and end-term evaluations, and served as a trainer for various organizations. His research areas include climate change adaptation, social protection, and livelihoods systems. So far, he has published six referred journal articles, a working paper, two blogs, several book reviews and technical reports and presented papers in many national and international conferences. Currently, Zerihun is working as an Assistant Professor in the Center for African and Oriental Studies at Addis Ababa University.",
      image_url,
    },
    {
      section_id: sectionMap["team"],
      name: "Ross Harvey",
      position: "Research Associate",
      image_url,
      linkedin: "https://linkedin.com/in/",
      facebook: "https://facebook.com",
      email: "test@impactacross.com",
      description: "Ross graduated from the University of Cape Town (UCT) in 2005 with a Bachelor of Commerce in Philosophy, Politics and Economics, followed by an Honours and MPhil in Public Policy. He is currently pursuing a PhD in Economics at UCT. His research uses game theoretic analysis to explain why Angola and Nigeria diverge institutionally and display different political economy manifestations of the resource curse. From 2010-2011, he lectured in Political Economy at UCT&apos;s Political Studies Department. During 2012, Ross worked as a researcher in Parliament. Since June 2013, he has been a senior researcher with SAIIA&apos;s Governance of Africa&apos;s Resources Programme (GARP) in Cape Town. Ross hopes that his research will shape the institutional elements &ndash; norms, beliefs and rules &ndash; that motivate policymaker behaviour in a direction that benefits ordinary Africans.",
    },
    {
      section_id: sectionMap["team"],
      name: "Mr. Cyriaque Hakizimana",
      position: "Research Associate",
      image_url,
      linkedin: "https://linkedin.com/in/",
      facebook: "https://facebook.com",
      email: "test@impactacross.com",
      description: "Mr. Cyriaque Hakizimana is a researcher and PhD candidate in the Institute for Poverty, Land, and Agrarian Studies (PLAAS) at the University of Western Cape in South Africa. He is currently leading the Southern Africa Regional Hub of the Agricultural Policy Research in Africa (APRA) programme which aims to produce new information and insights into different pathways to agricultural commercialisation in order to assess their impacts and outcomes on rural poverty, women&apos;s and girl&apos;s empowerment and food and nutrition security in Sub-Saharan Africa. He has proven experience in conducting baseline studies, monitoring and evaluation assignments as well as policy and strategy analysis for national and international donors, government agencies and universities across Africa.",
    },
    {
      section_id: sectionMap["team"],
      name: "Elise van der Mark",
      position: "Research Associate",
      image_url,
      linkedin: "https://linkedin.com/in/",
      facebook: "https://facebook.com",
      email: "test@impactacross.com",
      description: "Elise van der Mark is a Dutch anthropologist with a specialisation in Social Development in Sub-Saharan Africa. Elise obtained her Master degree Cum Laude in International Development Studies after her two bachelors in Cultural Anthropology and Visual Marketing. Before being awarded an EU scholarship for her PhD, she was self-employed conducting research, managing projects, and providing copy-writing services in Zimbabwe, South Africa and the Netherlands. She is currently pursuing her PhD at the University of the Western Cape (SA) in conjunction with the VU University Amsterdam (NL). Her focus lies on women empowerment and agency, gender relations, unpaid care work, and disability in poverty contexts. Particularly participatory action research has been at the forefront of all her research as she believes research should always be a vehicle for positive change.",
    },
  ]);
  const teamMap = {};
  teams.forEach(team => teamMap[team.name] = team.id);

  // await TeamLink.bulkCreate([
  //   { label: "linkedin", url: "https://linkedin.com/in/", team_id: teamMap["Kassahun K. Suleman(PhD)"] },
  //   { label: "facebook", url: "https://facebook.com", team_id: teamMap["Kassahun K. Suleman(PhD)"] },
  //   { label: "linkedin", url: "https://linkedin.com/in/", team_id: teamMap["Mr. Abraham Getachew"] },
  //   { label: "facebook", url: "https://facebook.com", team_id: teamMap["Mr. Abraham Getachew"] },
  //   { label: "linkedin", url: "https://linkedin.com/in/", team_id: teamMap["Zerihun Berhane(PhD)"] },
  //   { label: "facebook", url: "https://facebook.com", team_id: teamMap["Zerihun Berhane(PhD)"] },
  // ]);
};
