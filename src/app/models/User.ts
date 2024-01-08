import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DefaultSchema = new Schema(
  {
    name: String,
    password: String,
    isAdmin: Boolean,
  },
  {
    timestamps: true,
  }
);

const Default = mongoose.model('default', DefaultSchema, 'default');

module.exports = Default;
