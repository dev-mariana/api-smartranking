import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Category } from './interfaces/category.interface';

@Controller('api/v1/categories')
export class CategoriesController {

    constructor(private categoriesService: CategoriesService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return await this.categoriesService.createCategory(createCategoryDto);
    }

    @Get()
    async getCategories(): Promise<Category[]> {
        return await this.categoriesService.getCategories();
    }

    @Get('/:category')
    async getCategoryById(@Param('category') category: string): Promise<Category> {
        return await this.categoriesService.getCategoryById(category);
    }

    @Put('/:category')
    @UsePipes(ValidationPipe)
    async updateCategory(@Param('category') category: string, @Body() updateCategory: UpdateCategoryDto): Promise<void> {
        return await this.categoriesService.updateCategories(category, updateCategory);
    }

    @Post('/:category/players/:playerId')
    async addCategoryPlayer(@Param() params: string[]): Promise<void> {
        // console.log(params)
        return await this.categoriesService.addCategoryPlayer(params);
    }
}
