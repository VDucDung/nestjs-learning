import { Model, FilterQuery, QueryOptions, Document } from 'mongoose';
import { ObjectId } from 'mongodb';
export class BaseRepository<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async create(doc: Partial<T>): Promise<T> {
    const createdEntity = new this.model(doc);
    return await createdEntity.save();
  }

  async findById(id: string, option?: QueryOptions): Promise<T | null> {
    if (!ObjectId.isValid(id)) {
      return null;
    }

    return this.model.findById(id, null, option).exec();
  }

  async findByCondition(
    filter: FilterQuery<T>,
    field?: any | null,
    option?: QueryOptions | null,
    populate?: any | null,
  ): Promise<T | null> {
    let query = this.model.findOne(filter, field, option);
    if (populate) {
      query = query.populate(populate);
    }
    return query.exec();
  }

  async getByCondition(
    filter: FilterQuery<T>,
    field?: any | null,
    option?: QueryOptions | null,
    populate?: any | null,
  ): Promise<T[]> {
    let query = this.model.find(filter, field, option);
    if (populate) {
      query = query.populate(populate);
    }
    return query.exec();
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async aggregate(pipeline: any[]): Promise<any[]> {
    return this.model.aggregate(pipeline).exec();
  }

  async populate(result: T[], option: any): Promise<T[]> {
    const populatedResult = await this.model.populate(result, option);
    return populatedResult;
  }
  async deleteOne(id: string): Promise<any> {
    return this.model.deleteOne({ _id: id } as FilterQuery<T>).exec();
  }

  async deleteMany(ids: string[]): Promise<any> {
    return this.model
      .deleteMany({ _id: { $in: ids } } as FilterQuery<T>)
      .exec();
  }

  async deleteByCondition(filter: FilterQuery<T>): Promise<any> {
    return this.model.deleteMany(filter).exec();
  }

  async findByConditionAndUpdate(
    filter: FilterQuery<T>,
    update: any,
  ): Promise<T | null> {
    return this.model.findOneAndUpdate(filter, update, { new: true }).exec();
  }

  async updateMany(
    filter: FilterQuery<T>,
    update: any,
    option?: any | null,
  ): Promise<any> {
    return this.model.updateMany(filter, update, option).exec();
  }

  async findByIdAndUpdate(id: string, update: any): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, update, { new: true }).exec();
  }
}
