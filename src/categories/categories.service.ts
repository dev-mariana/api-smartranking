import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from 'src/players/players.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {

    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly playersService: PlayersService) {}

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const { category } = createCategoryDto;

        const category_found = await this.categoryModel.findOne({ category }).exec();

        if(category_found) {
            throw new BadRequestException(`Category ${category} already exists.`);
        }

        const created_category = new this.categoryModel(createCategoryDto);
        return await created_category.save();
    }

    async getCategories(): Promise<Category[]> {
        return await this.categoryModel.find().populate('players').exec();
    }

    async getCategoryById(category: string): Promise<Category> {
        const category_found = await this.categoryModel.findOne({ category }).exec();

        if(!category_found) {
            throw new NotFoundException(`Category ${category} not found.`);
        }

        return await category_found;
    }

    async updateCategories(category: string, updateCategory: UpdateCategoryDto): Promise<void> {
        const category_found = await this.categoryModel.findOne({ category }).exec();

        if(!category_found) {
            throw new NotFoundException(`Category ${category} not found.`);
        }

        await this.categoryModel.findOneAndUpdate({ category }, { $set: updateCategory }).exec();
    }

    async addCategoryPlayer(params: string[]): Promise<void> {
        const category = params['category'];
        const playerId = params['playerId'];

        const category_found = await this.categoryModel.findOne({ category }).exec();
        const registered_player = await this.categoryModel.find({ category }).where('players').in(playerId).exec();

        await this.playersService.getPlayerById(playerId);

        if(!category_found) {
            throw new BadRequestException(`Category ${category} not found.`);
        }

        if(registered_player.length > 0) {
            throw new BadRequestException(`Player already registered in category ${category}.`);
        }

        category_found.players.push(playerId);
        await this.categoryModel.findOneAndUpdate({ category }, { $set: category_found }).exec();
    }
}
