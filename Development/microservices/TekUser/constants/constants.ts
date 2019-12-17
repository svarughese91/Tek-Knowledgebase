import testData from "../__tests__/testData.json"

export class AppSettings {
    public static STAGE = process.env.stage || 'dev';
    public static MONGODBURL = process.env.mongodbURL || testData.mongodbURL;
}