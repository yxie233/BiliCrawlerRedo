'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AnimeSchema = new Schema({

    aid:  {//anime id
        type: String,
        required: 'Kindly enter the aid'
    },
    title: {
        type: String,
        required: 'Kindly enter the title'
    },
    play: {
        type: Number,
        default: 0
    },
    coins: {
        type: Number,
        default: 0
    },
    commentsNum: {
        type: Number,
        default: 0
    },
    favorites:  {
        type: Number,
        default: 0
    },
    danmaku:  {
        type: Number,
        default: 0
    },  //danmu
    create:  {
        type: String,
        required: 'Kindly enter the create time'
    }, //date posted
    mid: {
        type: String,
        required: 'Kindly enter the mid'
    },    //author id
    pic: {
        type: String
    }
});

module.exports = mongoose.model('Anime',AnimeSchema);


