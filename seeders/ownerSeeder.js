const { Owner, Phone, Location, OwnerLink } = require("../models/index");

module.exports = async () => {
  const owner = await Owner.create({
    name: "ImpactAcross",
    email: 'info@impactacross.com',
    title: "Development Research and Consultancy PLC",
    logo_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750098307/ImpactAcross/owner/WhatsApp_Image_2025-06-16_at_6.20.52_PM-removebg-preview_rrgeex.png",
    primary_color: '#007A33',
    font_family: "Roboto",
    font_url: null
    // font_url: "https://yourcdn.com/fonts/Avenir.woff2",
  });

  await Phone.bulkCreate([
    { number: "+251911364755", owner_id: owner.id },
    { number: "+251944272121", owner_id: owner.id },
  ]);

  await Location.bulkCreate([
    { address: "Bole Sub City, Woreda 04\nRoadmap Building (Near Lem Hotel)\nAddis Ababa, Ethiopia.", lat: 0, lng: 0, owner_id: owner.id, },
    { address: "9 Vintage\n47 Flacon Street\nD’Urbanvalle\nCape Town 7550\nSouth Africa", lat: 0, lng: 0, owner_id: owner.id, },
  ]);

  await OwnerLink.bulkCreate([
    { label: "linkedin", url: "https://linkedin.com/in/", owner_id: owner.id },
    { label: "twitter", url: "https://twitter.com/", owner_id: owner.id },
    { label: "facebook", url: "https://linkedin.com/in/", owner_id: owner.id },
    { label: "instagram", url: "https://www.instagram.com/", owner_id: owner.id },
  ]);
};
