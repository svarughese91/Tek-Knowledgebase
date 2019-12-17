import mongoose from 'mongoose';
const { MongoClient } = require('mongodb');
import Tek from "../schemas/tek"
import { ITek } from "../interfaces/tek";
import { TekController } from "../src/tek";
import testData from "./testData.json";

describe('Tek controller', () => {
    const tek = new TekController();

    test('create tek', done => {
        var t: ITek = new Tek({
            user_name: testData.tek.user_name,
            first_name: testData.tek.first_name,
            last_name: testData.tek.last_name,
        });

        function callback(err, data) {
            if (err) {
                console.log('create tek error, ' + err);
                done();
            } else {
                expect(data.user_name).toBe(testData.tek.user_name);
                done();
            }
        }
        tek.createTek(t, callback);
    })

    test('should throw error', done => {
        var t: ITek = new Tek({
            user_name: testData.tek.user_name,
            first_name: testData.tek.first_name,
            last_name: testData.tek.last_name,
        });

        function callback(err, data) {
            expect(data).toBe(null);
            done();
        }
        tek.createTek(t, callback);
    })

    test('get tek', done => {
        function callback(err, data) {
            if (err) {
                console.log('get tek error, ' + err);
                done();
            } else {
                expect(data.user_name).toBe(testData.tek.user_name);
                done();
            }
        }
        tek.getTeks(callback, testData.tek.user_name);
    })

    test('update tek', done => {
        function callback(err, data) {
            if (err) {
                console.log('update tek error, ' + err);
                done();
            } else {
                expect(data).toBe('Successfully updated tek.');
                done();
            }
        }
        tek.updateTek(testData.tek.user_name, { first_name: testData.tek.updated_first_name }, callback);
    })

    test('get updated tek', done => {
        function callback(err, data) {
            if (err) {
                console.log('get updated tek error, ' + err);
                done();
            } else {
                expect(data.first_name).toBe(testData.tek.updated_first_name);
                done();
            }
        }
        tek.getTeks(callback, testData.tek.user_name);
    })

    test('delete tek', done => {
        function callback(err, data) {
            if (err) {
                console.log('delete tek error, ' + err);
                done();
            } else {
                expect(data).toBe('Successfully deleted tek.');
                done();
            }
        }
        tek.deleteTek(testData.tek.user_name, callback);
    })
});