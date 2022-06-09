import chai, { assert, expect } from "chai"
import chaiHttp from "chai-http";
import {CardModel, ICard} from "../models/card"
import server from "../index"
import { Query } from "mongoose";

chai.use(chaiHttp);
const should = chai.should();

let card: ICard;

before(async () => {
  card = new CardModel({headline: 'Headline 1', questionSelectedID: 0, questions: []});
  await card.save();
});

after(async () => {
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
            //if the newUser is saved in db and it is not new
            assert(!card.isNew);
            done();
        });
  });
});

const helperFunc = (assertion: any, done: Mocha.Done) => {
  assertion
      .then(() => CardModel.find({}))
      .then((cards: ICard[]) => {
          assert(cards.length === 1);
          assert(cards[0].headline === 'Headline 2');
          done();
      });
  }

describe("/card PUT", () => {
    it('Sets and saves a card using an instance', (done) => {
      card.set('headline', 'Headline 2');
      helperFunc(card.save(), done);
  });

  it('Update a card using instance', (done) => {
      helperFunc(card.update({ name: 'Headline 2' }), done);
  });
});