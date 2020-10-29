const dbConnect = require('./src/config/dbConnect');
const mongoose = require('mongoose');
const User = require('./src/models/User');
const House = require('./src/models/House');
const Contacts = require('./src/models/Contacts');
const Admin = require('./src/models/Admin');
const faker = require('faker');

dbConnect();

const lifeTrendHouse = async () => {
  const userSeed = async () => {
    let user1 = await User.create({ username: faker.name.firstName(), email: faker.internet.exampleEmail(), tel: faker.phone.phoneNumber() });
    let user2 = await User.create({ username: faker.name.firstName(), email: faker.internet.exampleEmail(), tel: faker.phone.phoneNumber() });
    let user3 = await User.create({ username: faker.name.firstName(), email: faker.internet.exampleEmail(), tel: faker.phone.phoneNumber() });

  };
  userSeed();

  const houseSeed = async () => {
    await House.create({ name: faker.random.word(), description: faker.lorem.paragraph(), images: 'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' });
    await House.create({ name: faker.random.word(), description: faker.lorem.paragraph(), images: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' });
    await House.create({ name: faker.random.word(), description: faker.lorem.paragraph(), images: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' });
    await House.create({ name: faker.random.word(), description: faker.lorem.paragraph(), images: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' });
    await House.create({ name: faker.random.word(), description: faker.lorem.paragraph(), images: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' });
    await House.create({ name: faker.random.word(), description: faker.lorem.paragraph(), images: 'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' });


  };
  houseSeed();

  const contacts = async () => {
    let contact = await Contacts.create({ email: faker.internet.exampleEmail(), tel: faker.phone.phoneNumber() });
  };
  contacts();

  const admin = async () => {
    await Admin.create({ email: 'lifetrendhouse@mail.ru', password: 'nodemailer001' });
  };

  admin();
};

lifeTrendHouse();
