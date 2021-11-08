const jimp = require("jimp");
const Store = require("../models/Store");

module.exports = {
    async createStore(payload, fileBuffer) {
        const store = await new Store(payload).save();
        const photo = await jimp.read(fileBuffer);
        await photo.resize(800, jimp.AUTO);
        await photo.write(`./public/uploads/${payload.photo}`);

        return store;
    },

};