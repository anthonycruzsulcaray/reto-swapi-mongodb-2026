class EntityRepository {
  constructor(entityModel) {
    this.entityModel = entityModel;
  }

  findOne(filter, projection) {
    return this.entityModel.findOne(filter, projection).exec();
  }

  find(filter, projection) {
    return this.entityModel.find(filter, projection).exec();
  }

  create(data) {
    return new this.entityModel(data).save();
  }

  findOneAndUpdate(filter, update) {
    return this.entityModel
      .findOneAndUpdate(filter, update, { new: true })
      .exec();
  }

  updateMany(filter, update) {
    return this.entityModel.updateMany(filter, update).exec();
  }

  async deleteMany(filter) {
    const result = await this.entityModel.deleteMany(filter).exec();
    return result.deletedCount >= 1;
  }
}

module.exports = { EntityRepository };
