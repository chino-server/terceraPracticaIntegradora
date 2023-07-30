export default class BasicManager {
  constructor(model) {
    this.model = model;
  }
  async findAll() {
    try {
      const response = await this.model.find();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async findOneById(id) {
    try {
      const response = await this.model.findById(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createOne(obj) {
    try {
      const response = await this.model.create(obj);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateOne(id, obj) {
    try {
      const response = await this.model.findOneAndUpdate(
        { _id: id },
        { $set: obj }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(id) {
    try {
      const response = await this.model.findByIdAndDelete(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
