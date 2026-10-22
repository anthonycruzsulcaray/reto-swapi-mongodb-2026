import { Document, Model, QueryFilter, UpdateQuery, UpdateWriteOpResult } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
    constructor(protected readonly entityModel: Model<T>) { }

    async findOne(
        entityFilterQuery: QueryFilter<T>,
        projection?: Record<string, unknown>
    ): Promise<T | null> {
        return this.entityModel.findOne(entityFilterQuery, projection).exec()
    }

    async find(
        entityFilterQuery?: QueryFilter<T>,
        projection?: Record<string, unknown>
    ): Promise<T[] | null> {
        return this.entityModel.find(entityFilterQuery, projection).exec()
    }

    async create(createEntityData: unknown): Promise<T> {
        const entity = new this.entityModel(createEntityData);
        return entity.save() as Promise<T>;
    }

    async findOneAndUpdate(
        entityFilterQuery: QueryFilter<T>,
        updateEntityData: UpdateQuery<unknown>
    ): Promise<T | null> {
        return this.entityModel.findOneAndUpdate(
            entityFilterQuery,
            updateEntityData,
            {
                new: true
            }
        ).exec()
    }

    async updateMany(
        entityFilterQuery: QueryFilter<T>,
        updateEntityData: UpdateQuery<unknown>
    ): Promise<UpdateWriteOpResult> {
        return this.entityModel.updateMany(
            entityFilterQuery,
            updateEntityData
        ).exec()
    }

    async deleteMany(entityFilterQuery: QueryFilter<T>): Promise<boolean> {
        const deleteResult = await this.entityModel.deleteMany(entityFilterQuery).exec();
        return deleteResult.deletedCount >= 1;
    }

}