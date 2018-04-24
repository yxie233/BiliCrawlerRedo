
var request = require('request');
var dburl = 'mongodb://bilicrawlerAdmin:addData2018@ds253889.mlab.com:53889/bilibilidata';

var schema = require('./routes/dbModels');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose'),
    Anime = mongoose.model("Anime")


mongoose.connect(dburl);


function isNumber(n){
    return !isNaN(n);
}


var end_page1=1;
var png_no=1;
var redo=false;
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 3; i=(i++)%2) {
        if ((new Date().getTime() - start) > milliseconds){//console.log(new Date().getTime());
            break;
        }
    }
}

function get_end_page(){
}

var authorList=[];

function doIt(i) {
    var p= new Promise(function(resolve, reject) {
        setTimeout(function () {//console.log(i);
            request(
                {
                    method: 'GET'
                    ,//callback=jQuery17203145239116586096_1499408237655&type=jsonp&
                    url: 'http://api.bilibili.com/archive_rank/getarchiverankbypartion?tid=32&pn=' + i + '&_=1499408247911'
                    //,url:'http://space.bilibili.com/ajax/member/MyInfo?vmid=44945505'
                    ,
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Referer': 'http://www.bilibili.com/video/part-twoelement-1.html#!page=' + i + ''
                    },
                    gzip: true
                    ,
                    encoding: 'utf-8'
                }
                , function (error, response, body) {
                // body is the decompressed response body
                // console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));

                var pb;
                try {
                    pb = JSON.parse(body);
                }
                catch (err) {
                    png_no = i;
                    redo = true;
                    doIt(i);
                    return;
                }
                var countTime = 0;
                for (var j = 0; j < pb['data']['archives'].length; j++, countTime++) {
                    console.log(pb['data']['archives'][j]['create'] + ' title: ' + pb['data']['archives'][j]['title'] + ' (aid: ' + pb['data']['archives'][j]['aid'] + ' )');

                    var playNum;
                    var mid = pb['data']['archives'][j]['mid'];
                    if (isNumber(pb['data']['archives'][j]['play']))
                        playNum = pb['data']['archives'][j]['play'];
                    else
                        playNum = 0;
                    var toSave = {
                        aid: pb['data']['archives'][j]['aid'],  //anime id
                        title: pb['data']['archives'][j]['title'],
                        play: playNum,
                        coins: pb['data']['archives'][j]['stat']['coin'],
                        commentsNum: pb['data']['archives'][j]['stat']['reply'],
                        favorites: pb['data']['archives'][j]['stat']['favorite'],
                        danmaku: pb['data']['archives'][j]['video_review'],  //danmu
                        create: pb['data']['archives'][j]['create'], //date posted
                        mid: mid, //pb['data']['archives'][j]['mid'],    //author id
                        pic: pb['data']['archives'][j]['pic']
                    };
                    // console.log(JSON.stringify(toSave));
                    var addOne = new Anime(toSave);
                    addOne.save(function(err){
                        if(err){
                            console.log("failed to add response "+pb['data']['archives'][j]['title']+err);

                        }else{
                            // console.log("response add success");
                        }
                    });

                    authorList[mid] = mid;
                }
                // console.log('d33_'+i);
                resolve(1);
            }
            )
            .on('data', function (data) {
                //var $ = cheerio.load(data);
                // console.log("&!!"+$.html());
                // decompressed data as it is received
                //  console.log('decoded chunk: ' + data)
            })
            .on('response', function (response) {

                // unmodified http.IncomingMessage object
                response.on('data', function (data) {
                    // compressed data as it is received
                    // console.log('received ' + data.length + ' bytes of compressed data')
                })
            });
        }, 3000 * i);
    });
    return p;
}

function crawler_anim() {
    var set_end_pagePromise =  new Promise(function(resolve, reject) {
        request(
            {
                method: 'GET'
                ,//callback=jQuery17203145239116586096_1499408237655&type=jsonp&
                url: 'http://api.bilibili.com/archive_rank/getarchiverankbypartion?tid=32&pn=1&_=1499408247911'
                //,url:'http://space.bilibili.com/ajax/member/MyInfo?vmid=44945505'
                ,
                headers:{
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Referer': 'http://www.bilibili.com/video/part-twoelement-1.html'
                },
                gzip: true,
                encoding: 'utf-8'
            }
            , function (error, response, body) {
                // body is the decompressed response body
                // console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'))
                var pb;
                try{
                    pb= JSON.parse(body);
                } catch(err) {
                    console.log(err);return;
                }
                end_page1 = Math.ceil(pb['data']['page']['count']/pb['data']['page']['size']);
                resolve(end_page1);
            }
        );
    });


    var promiseArr=[];
    set_end_pagePromise.then(function(num) {
        return new Promise(function(resolve, reject) {

            console.log(png_no + ' of ' + end_page1);

            for (var i = png_no; i <= end_page1; i++) {//
                promiseArr.push(doIt(i));
                // if(redo){
                //     redo = false;
                //     return;
                // }
            }
            console.log('finished');
            resolve(num);
        })

    });

}



module.exports.crawler_anim = crawler_anim;

