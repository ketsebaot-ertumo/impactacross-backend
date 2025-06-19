const {
  sequelize,
  Users,
  Blogs,
  Publications,
  Multimedias,
  Trainings,
  Owner,
  Location,
  Phone,
  OwnerLink,
  Section,
  Content,
  Service,
  Team,
  Project,
  Partner,
} = require("../models/index");
// const db = require("../models/index");
// console.log(db); // 👈 This will show you what is actually exported


(async () => {
  try {
    console.log("Syncing database...");
    await sequelize.sync({ force: true });

    console.log("Seeding data...");
    const user = await require("./userSeeder")();
    await require("./blogSeeder")(user.id);
    await require("./publicationSeeder")(user.id);
    await require("./multimediaSeeder")(user.id);
    await require("./trainingSeeder")(user.id);
    // await seedBlogs(user.id);
    
    await require("./ownerSeeder")();
    await require("./aboutUsSeeder")();
    const sectionMap = await require("./sectionSeeder")();
    await require("./contentSeeder")(sectionMap);
    await require("./serviceSeeder")(sectionMap);
    await require("./teamSeeder")(sectionMap);
    await require("./projectSeeder")(sectionMap);
    await require("./partnerSeeder")(sectionMap);
    await require("./gallerySeeders")();

    console.log("✅ Seeding complete.");
  } catch (err) {
    console.error("❌ Error during seeding:", err);
  } finally {
    await sequelize.close();
  }
})();
