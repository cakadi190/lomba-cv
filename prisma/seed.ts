import seedAwards from './seeders/seed_awards.ts';
import seedOrganizations from './seeders/seed_organizations.ts';
import seedCareers from './seeders/seed_careers.ts';
import seedEducations from './seeders/seed_educations.ts';
import seedPortofolio from './seeders/seed_portofolio.ts';

async function main() {
  try {
    await seedAwards();
    console.log('\x1b[32m\u2714  Awards seeded successfully');

    await seedPortofolio();
    console.log('\x1b[32m\u2714  Portofolio seeded successfully');
    
    await seedOrganizations();
    console.log('\x1b[32m\u2714  Organizations seeded successfully');
    
    await seedCareers();
    console.log('\x1b[32m\u2714  Careers seeded successfully');

    await seedEducations();
    console.log('\x1b[32m\u2714  Educations seeded successfully');
  } catch (error) {
    console.error('\x1b[31m\u2718  Error seeding data:', error);
  } finally {
    process.exit(0);
  }
}

main();
