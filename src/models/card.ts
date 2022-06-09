import { model, Schema, Document } from "mongoose";

interface ICard extends Document {
  headline: string;
  questionSelectedID: number,
  questions?: IQuestion[];
}

interface IQuestion{
  id: number;
  content: string;
}

const CardSchema = new Schema({
  headline: {
    type: String,
    unique: true
  },
  questions: {
    type: Object
  },
  questionSelectedID: {type: Number}
});

const CardModel = model<ICard>("Card", CardSchema);

export { CardModel, ICard };
