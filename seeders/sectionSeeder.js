const { Section } = require("../models/index");

module.exports = async () => {
  const sections = await Section.bulkCreate([
    { key: "home", title: "", description: 'Improving lives by bridging the vital connections between health, environment, and development', isActive: true },
    { key: "what_we_do", title: "What We Do", description: 'Our approach integrates research, strategy, and action to create meaningful and lasting impact.', isActive: true },
    { key: "why_choose_us", title: "Why Choose Us", description: 'We strive to bring a solid analytical framework and generate reliable evidence to support our commitment for quality, learning, and knowledge management which enables us to work respectfully and collaboratively with the nuances associated with multiple geographies, cultures and socioeconomic settings.', isActive: true },
    { key: "service", title: "Our Services", description: 'Our services are informed by our professional orientation and experience both in Ethiopia and abroad. We have specialized in the following key development sectors.', isActive: true },
    { key: "expertise", title: "Our Expertise", description: "Our Solutions is powered by a network of results-oriented, passionate professionals who bring targeted expertise across sectors. We bring the right mix of knowledge and skills to every project, ensuring holistic, integrated responses that create measurable impact. We connect partners and clients with tailored guidance and knowledge to address the world's most critical issues.", isActive: true },
    { key: "team", title: "Meet Our Team", description: 'ADC prides itself on bringing to our clients a team of highly qualified, energetic, and dynamic professionals. We have over 40 roster-based temporary and full-time multidisciplinary professionals, each specializing in their respective fields.', isActive: true },
    { key: "project", title: "Projects Overview", description: 'With our deep industry expertise, multi-disciplinary capabilities and rigorous analysis, we deliver high-quality technical studies, evaluations, and project design services.', isActive: true },
    { key: "partner", title: "Partners", description: 'With our deep industry expertise, multi-disciplinary capabilities and rigorous analysis, we deliver high-quality technical studies, evaluations, and project design services.', isActive: true },
    { key: "value", title: "Mission", description: 'Our mission is to provide high quality consultancy, training and research services to our clients so as to help them make distinct and significant improvements in their programmes and projects.', isActive: true },
    { key: "value", title: "Vission", description: 'Our vision is to become a leading, preferred and trusted development consulting firm in East and Horn of Africa. We use the most up-to-date research and evaluation designs and methods to inform development strategy in the region.', isActive: true },
    { key: "value", title: "Core Values", description: 'Our core values of Integrity, Respect, Excellence, Innovation, and Independence guide us in delivering ethical, high-quality, and impactful solutions with creativity and impartiality.', isActive: true },
    { key: "contact", title: "Contact Us", description: '', isActive: true },
  ]);

  const sectionMap = {};
  sections.forEach(section => {
    sectionMap[section.key] = section.id;
  });

  return sectionMap;
};
