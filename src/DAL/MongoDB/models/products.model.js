import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productsSchema= new mongoose.Schema ({
      title: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      rating: {
        rate: {
          type: Number,
          required: true
        },
        count: {
          type: Number,
          required: true
        }
      },
      stock: {
        type: Number
      },
      code:{
        type:Number,
        require:true
      },
      timestamp: {
            type: Date,
            default: Date.now
      }
})

productsSchema.plugin (mongoosePaginate)
export const productsModel = mongoose.model ('Products', productsSchema)