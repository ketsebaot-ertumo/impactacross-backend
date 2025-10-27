const { Project } = require("../models/index");

module.exports = async (sectionMap) => {
  await Project.bulkCreate([
    {
      section_id: sectionMap["project"],
      title: "Food Security, Natural Resources Governance and Sustainable Rural Development in Ethiopia",
      client: "Protestant Agency for Diakonia and Development (Bread for the World)",
      description: "A systematic review providing a comprehensive overview of food security, natural resources governance, and rural development in Ethiopia.",
      date: Date.now(),
      status: "Completed"
    },
    {
      section_id: sectionMap["project"],
      title: "Upscaling climate-smart agriculture in sub-Saharan Africa",
      client: "South African Institute of International Affairs (SAIIA)",
      description: "Policy insight exploring barriers to CSA practices and highlighting actions to promote them regionally.",
      date: Date.now(),
      status: "Completed"
    },
    {
      section_id: sectionMap["project"],
      title: "The interface between ABS and Biotrade in Namibia",
      client: "SAIIA Occasional Paper",
      description: "Study exploring the Namibian environmental policy context and synergy between biotrade and ABS under the CBD and Nagoya Protocol.",
      date: Date.now(),
      status: "Completed"
    },
  ]);
};
