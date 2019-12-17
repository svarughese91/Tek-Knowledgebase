import mongoose from 'mongoose';
const { MongoClient } = require('mongodb');
import Tek from "../schemas/tek";
import { ITek } from "../interfaces/tek";
import testData from "./testData.json"

describe('Tek model', () => {
    beforeAll(async () => {
        await mongoose.connect(testData.mongodbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    });

    afterAll(async () => {
        mongoose.connectection.close();
    });

    it('Should throw validation errors', done => {
        const tek = new Tek();

        expect(tek.validate).toThrow();
        done();
    })

    it('Should save a Tek', done => {
        expect.assertions(2);

        let tek: ITek = {
            user_name: testData.tek.user_name,
            first_name: testData.tek.first_name,
            last_name: testData.tek.last_name
        }

        expect(tek).toMatchObject({
            user_name: expect.any(String),
            first_name: expect.any(String),
            last_name: expect.any(String)
        });
        expect(tek.user_name).toBe(testData.tek.user_name);
        done();
    })
})