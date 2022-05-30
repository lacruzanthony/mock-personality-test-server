import { Router } from "express";
import { CardModel, ICard } from "../models/card";

const routes = Router();

routes.get("/", async (req, res) => {
  try {
    const cards: ICard[] = await CardModel.find().exec();
    return res.json(cards);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Sorry, something went wrong :/" });
  }
});

routes.post("/", async (req, res) => {
  try {
    const card: ICard = req.body;

    const cardExists = await CardModel.findOne({
      name: card.headline
    }).exec();

    if (cardExists) {
      return res
        .status(409)
        .json({ error: "There is already another card with this name" });
    }

    const newCard = await CardModel.create(card);
    return res.status(201).json(newCard);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Sorry, something went wrong :/" });
  }
});

routes.put("/", async (req, res) => {
  try{

    const card: ICard = req.body;
    const cardUpdated = await CardModel.replaceOne({_id: card._id}, card);

    return res.status(200).json(cardUpdated);

  }catch(error){
    console.error(error);
    return res.status(500).json({ error: "Sorry, something went wrong on update"})
  }
})

export default routes;
