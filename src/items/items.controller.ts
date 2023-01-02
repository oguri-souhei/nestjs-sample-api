import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateItemsDto } from './dto/create-items.dto';
import { Item } from '../entities/item.entity';
import { ItemsService } from './items.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '../entities/user.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/decorator/role.decorator';
import { UserStatus } from '../auth/user-status.enum';

@Controller('items')
@UseInterceptors(ClassSerializerInterceptor) // @Excludeを適用させるために必要
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return await this.itemsService.findById(id);
  }

  @Post()
  @Role(UserStatus.PREMINUM)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(
    @Body() itemDto: CreateItemsDto,
    @GetUser() user: User,
  ): Promise<Item> {
    return await this.itemsService.create(itemDto, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<Item> {
    return await this.itemsService.updateStatus(id, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<void> {
    await this.itemsService.delete(id, user);
  }
}
