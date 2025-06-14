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
      image_url,
    },
    {
      section_id: sectionMap["team"],
      name: "Mr. Abraham Getachew",
      position: "Operation Manager",
      email: "abrahamg@impactacross.com",
      linkedin: "https://linkedin.com/in/",
      facebook: "https://facebook.com",
      image_url,
    },
    {
      section_id: sectionMap["team"],
      name: "Zerihun Berhane(PhD)",
      position: "Research Associate",
      email: "team@gmail.com",
      linkedin: "https://linkedin.com/in/",
      facebook: "https://facebook.com",
      image_url,
    },
    {
      section_id: sectionMap["team"],
      name: "Ross Harvey",
      position: "Research Associate",
      image_url,
      linkedin: "https://linkedin.com/in/janesmith",
      facebook: "https://facebook.com",
      email: "test@impactacross.com"
    },
    {
      section_id: sectionMap["team"],
      name: "Mr. Cyriaque Hakizimana",
      position: "Research Associate",
      image_url,
      linkedin: "https://linkedin.com/in/janesmith",
      facebook: "https://facebook.com",
      email: "test@impactacross.com"
    },
    {
      section_id: sectionMap["team"],
      name: "Elise van der Mark",
      position: "Research Associate",
      image_url,
      linkedin: "https://linkedin.com/in/janesmith",
      facebook: "https://facebook.com",
      email: "test@impactacross.com"
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
