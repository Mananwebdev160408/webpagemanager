import mongoose, { Schema, model, models } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const bookmarkSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

bookmarkSchema.plugin(mongooseAggregatePaginate)

export const Bookmark=models.Bookmark || model("Bookmark", bookmarkSchema);
export default Bookmark;
