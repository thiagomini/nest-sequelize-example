import { Test, TestingModule } from '@nestjs/testing';
import { Sequelize } from 'sequelize-typescript';
import { User } from './user.model';

import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { AppModule } from './app.module';

describe('Sequelize internal module', () => {
  let testingModule: TestingModule;
  let sequelize: Sequelize;

  let userRepo: typeof User;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [SequelizeModule.forFeature([User]), AppModule],
    }).compile();

    sequelize = testingModule.get(Sequelize);
    userRepo = testingModule.get<typeof User>(getModelToken(User));
    await sequelize.sync({ force: true });
  });

  test('connects', async () => {
    await sequelize.authenticate();
  });

  test('user model behavior', async () => {
    const newUser = await userRepo.create({
      email: 'mail@mail.com',
      firstName: 'John',
      lastName: 'Doe',
    });

    console.log(newUser);

    expect(newUser.email).toBe('mail@mail.com');
  });
});
