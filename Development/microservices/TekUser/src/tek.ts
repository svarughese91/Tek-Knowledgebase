/**
 * Tek microservice - manages tek users
 */
import { ITek } from "../interfaces/tek";
import mongoose from 'mongoose';
import Tek from "../schemas/tek";
import { AppSettings } from "../constants/constants"

export class TekController {

    constructor() {

    }

    getTeks(callback: (err: any, tek: ITek) => void, tekName?: string) {
        if (tekName) {
            this.createDBConn(() => {
                Tek.findOne({ user_name: tekName })
                    .then(teks => {
                        this.closeDBConn();
                        let t: ITek = teks;
                        callback(null, t);
                    })
                    .catch(error => {
                        this.closeDBConn();
                        callback(error, null);
                    })
            })

        } else {
            this.createDBConn(() => {
                Tek.find({})
                    .then(teks => {
                        this.closeDBConn();
                        let t: ITek = teks;
                        callback(null, t);
                    })
                    .catch(error => {
                        this.closeDBConn();
                        callback(error, null);
                    })
            })
        }
    }

    /**
   * Creates a new tek user 
   * @param tek - tek json to create new tek user (NOTE: tek user_name must be unique)
   * @param callback - returned tek value
   */
    createTek(tek: ITek, callback: (err: any, tek: ITek) => void) {
        let newTek = new Tek(tek);
        this.createDBConn(() => {
            newTek.save()
                .then((tek) => {
                    this.closeDBConn();
                    callback(null, tek);
                })
                .catch((error) => {
                    this.closeDBConn();
                    callback(error, null);
                })
        })
    }

    /**
     * Updates a current tek
     * @param tekUserName - user_name of the tek to update
     * @param tek - tek json details to update of the tek
     * @param callback - returned tek value
     */
    updateTek(tekUserName: string, tek, callback: (err: any, msg: string) => void) {
        this.createDBConn(() => {
            Tek.updateOne({ user_name: tekUserName }, tek)
                .then(tek => {
                    this.closeDBConn();
                    let msg = 'Successfully updated tek.'
                    callback(null, msg)
                })
                .catch(error => {
                    this.closeDBConn();
                    callback(error, null);
                })
        })
    }

    /**
     * Delete a tek
     * @param tekUserName - tek user to delete
     * @param callback - returned tek value
     */
    deleteTek(tekUserName: string, callback: (err: any, msg: string) => void) {
        this.createDBConn(() => {
            Tek.deleteOne({ user_name: tekUserName })
                .then(data => {
                    let msg = 'Successfully deleted tek.'
                    this.closeDBConn();
                    callback(null, msg);
                })
                .catch(error => {
                    this.closeDBConn();
                    callback(error, null);
                })
        })
    }

    /**
 * creates a database connection
 * @param callback - returned db connection
 */
    private createDBConn(callback: () => void) {
        const mongoURL = AppSettings.MONGODBURL;
        mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err) => {
            if (err) {
                return console.log('Error connecting to the db, ' + err);
            } else {
                callback();
            }
        });
    }

    /**
     * closes a database connection
     */
    private closeDBConn() {
        mongoose.connection.close();
    }
}