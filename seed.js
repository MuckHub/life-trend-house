const dbConnect = require('./src/config/dbConnect');
const mongoose = require('mongoose');
const User = require('./src/models/User');
const House = require('./src/models/House');
const Contacts = require('./src/models/Contacts');
const faker = require('faker');

dbConnect();

const lifeTrendHouse = async () => {
  const userSeed = async () => {
    let user1 = await User.create({username: faker.name.firstName(), email: faker.internet.exampleEmail(), tel: faker.phone.phoneNumber()});
    let user2 = await User.create({username: faker.name.firstName(), email: faker.internet.exampleEmail(), tel: faker.phone.phoneNumber()});
    let user3 = await User.create({username: faker.name.firstName(), email: faker.internet.exampleEmail(), tel: faker.phone.phoneNumber()});

  };
  userSeed();

  const houseSeed = async () => {
    let house1 = await House.create({ name: faker.random.word(), description: faker.lorem.paragraph(), images: faker.image.imageUrl()});
    let house2 = await House.create({ name: faker.random.word(), description: faker.lorem.paragraph(), images: faker.image.imageUrl()});
  };
  houseSeed();

  const contacts = async () => {
    let contact = await Contacts.create({ email: faker.internet.exampleEmail(), tel: faker.phone.phoneNumber()});
  };
  contacts();

};

lifeTrendHouse();
