'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;




var AuthorSchema = new Schema({

    mid: {
        type: String,
        required: 'Kindly enter the mid'
    },  //author id
    name: {
        type: String,
        required: 'Kindly enter the name'
    },  //name
    face: {
        type: String,
        required: 'Kindly enter the face'
    },
    regtime: {
        type: String,
        required: 'Kindly enter the regiter time'
    },
    birthday: {
        type: String,
        required: 'Kindly enter the failed_query'
    },
    article: {
        type: String,
        required: 'Kindly enter the birthday'
    },
    friend: {
        type: Number,
        default: 0
    },
    attention: {
        type: String,
        default: 0
    },
    fans: {
        type: String,
        default: 0
    },  //
    playNum: {
        type: String,
        default: 0
    }
});

var AnimeSchema = new Schema({

    aid:  {//anime id
        type: String,
        required: 'Kindly enter the source'
    },
    title: {
        type: String,
        required: 'Kindly enter the source'
    },
    play: {
        type: Number,
        default: 0
    },
    favorites:  {
        type: Number,
        required: 'Kindly enter the source'
    },
    danmaku:  {
        type: Number,
        required: 'Kindly enter the source'
    },  //danmu
    create:  {
        type: String,
        required: 'Kindly enter the source'
    }, //date posted
    mid: {
        type: String,
        required: 'Kindly enter the source'
    },    //author id
    pic: {
        type: String
    }

});



module.exports = mongoose.model('Anime',AnimeSchema);
module.exports = mongoose.model('Author',AuthorSchema);

