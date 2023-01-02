import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserStatus } from '../auth/user-status.enum';
import { ItemStatus } from './item-status.enum';
import { ItemRepository } from './item.repository';
import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let service;
  let repository;

  const mockItemRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
  });

  const mockUser1 = {
    id: '1',
    username: 'test1',
    password: 'password1',
    status: UserStatus.PREMINUM,
  };

  const mockUser2 = {
    id: '2',
    username: 'test2',
    password: 'password2',
    status: UserStatus.FREE,
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: ItemRepository,
          useFactory: mockItemRepository,
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    repository = module.get<ItemRepository>(ItemRepository);
  });

  it('findAll()', async () => {
    const expected = [];
    repository.find.mockResolvedValue(expected);
    const result = await service.findAll();
    expect(result).toEqual(expected);
  });

  it('findById()', async () => {
    const expected = {
      id: 'test-id',
      name: 'PC',
      price: 50000,
      description: '',
      status: ItemStatus.ON_SALE,
      createdAt: '',
      updatedAt: '',
      userId: mockUser1.id,
      user: mockUser1,
    };
    repository.findOne.mockResolvedValue(expected);
    const result = await service.findById(expected.id);
    expect(result).toEqual(expected);
  });

  it('異常系:商品が存在しない', async () => {
    repository.findOne.mockResolvedValue(null);
    await expect(service.findById('test-id')).rejects.toThrow(
      NotFoundException,
    );
  });
});
