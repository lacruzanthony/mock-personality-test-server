import { model, Schema, Document } from "mongoose";

interface ICard extends Document {
  headline: string;
  questions: string[];
}

const CardSchema = new Schema({
  headline: {
    type: String,
    unique: true
  },
  questions: {
    type: [String]
  },
});

const CardModel = model<ICard>("Quiz", CardSchema);

export { CardModel, ICard };
