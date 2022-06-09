import chai, { assert, expect } from "chai"
import chaiHttp from "chai-http";
import {CardModel, ICard} from "../models/card"
import server from "../index"
import { Query } from "mongoose";

chai.use(chaiHttp);
const should = chai.should();

let card: ICard;

beforeEach(async () => {
  card = new CardModel({headline: 'Headline 1', questionSelectedID: 0, questions: []});
  await card.save();
});

afterEach(async () => {
  await CardModel.deleteOne({headline: 'Headline 1'});
})

describe("/ GET", ( )=> {
  it("returs 200 /GET", (done: Mocha.Done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').that.equals("Please visit /cards to view all the cards")
        done();
      })
  });
})

describe("/card GET", ( )=> {
  it("returs the Headline 1", (done: Mocha.Done) => {
    CardModel.findOne({headline: 'Headline 1'})
      .then((card) => {
        assert(card?.headline === "Headline 1")
        done()
      })
  });
})

describe("/card POST", () => {
  it('Creates a new Card', (done: Mocha.Done) => {
    card.save()
        .then(() => {
            assert(!card.isNew);
            done();
        });
  });
});