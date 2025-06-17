const { Section } = require("../models/index");

module.exports = async () => {
  const sections = await Section.bulkCreate([
    { key: "home", title: "", description: 'Improving lives by bridging the vital connections between health, environment, and development', isActive: true },
    { key: "what_we_do", title: "What We Do", description: 'We focus on practical, actionable solutions that go beyond reports—our work helps inform policy, unlock funding, and improve lives.', isActive: true },
    { key: "why_choose_us", title: "Why Choose Us", description: 'We deliver practical, action-oriented solutions that drive policy change, unlock funding, and improve lives. Centered on client collaboration, we listen, adapt, and tailor our work to your unique priorities and context. Combining deep regional insight with global standards, we bridge local relevance and international rigor. We build lasting partnerships grounded in transparency and commitment, empowering your teams with lasting capacity for future challenges.', isActive: true },
    { key: "service", title: "Our Services", description: 'At ImpactAcross, we provide end-to-end research, strategy, and advisory services tailored to accelerate sustainable development across Africa.', isActive: true },
    { key: "expertise", title: "Our Expertise", description: "At ImpactAcross, we bring deep, multidisciplinary expertise to address complex development challenges across a range of critical sectors", isActive: true },
    { key: "team", title: "Meet Our Team", description: 'ImpactAcross is powered by a passionate, diverse team dedicated to driving data-driven change across key development sectors. We combine local knowledge with global expertise to deliver innovative, impactful solutions grounded in integrity and partnership.', isActive: true },
    { key: "project", title: "Projects Overview", description: 'At ImpactAcross, we are actively engaged in a range of projects that drive sustainable development and climate resilience across Africa. Our work is strengthened through strategic partnerships with local, regional, and international organizations, allowing us to amplify our impact and foster collaboration.', isActive: true },
    { key: "partner", title: "Partners", description: 'At ImpactAcross, we believe sustainable impact comes from strong, collaborative partnerships that unite diverse expertise and perspectives. By working with global and local organizations, we co-create data-driven solutions that empower communities and drive lasting, inclusive development.', isActive: true },
    { key: "value", title: "Mission", description: 'ImpactAcross drives sustainable and equitable development in Africa through research, consulting, and capacity-building, partnering with stakeholders to shape impactful policies and programs.', isActive: true },
    { key: "value", title: "Vision", description: 'To be a leading African thought partner and catalyst for sustainable development, empowering communities and institutions through transformative research, strategic advice, and inclusive innovation.', isActive: true },
    { key: "value", title: "Core Values", description: 'We uphold integrity, transparency, and respect, embracing diverse voices and community leadership. Grounded in evidence and collaboration, we deliver impactful, high-quality solutions with innovation and adaptability.', isActive: true },
    { key: "contact", title: "Contact Us", description: '', isActive: true },
  ]);

  const sectionMap = {};
  sections.forEach(section => {
    sectionMap[section.key] = section.id;
  });

  return sectionMap;
};
