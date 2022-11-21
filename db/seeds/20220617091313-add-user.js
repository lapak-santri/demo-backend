const names = [
  'Yuneda',
  'Lailla',
  'Tito',
  'Ilham',
  'Deka',
];

module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const passwordHash = await require('bcryptjs').hash(process.env.USER_PASSWORD, 10);

    const users = names.map((name) => ({
      name,
      email: `${name.toLowerCase()}@gmail.com`,
      password: passwordHash,
      no_tlpn: '',
      city: '',
      address: '',
      image: '',
      wishlist: [1],
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Users', users, {});
  },

  async down() {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
