const client = require('cheerio-httpcli');
const async = require('async');
const fs = require('fs');

//Amazonの商品レビューページ
var urlList = ['https://www.amazon.co.jp/ALUNAR-M508-%E3%80%90%E5%B7%A5%E5%A0%B4%E7%9B%B4%E8%B2%A9%E3%80%913D%E3%83%97%E3%83%AA%E3%83%B3%E3%82%BF%E3%83%BC%E3%82%AD%E3%83%83%E3%83%88-%EF%BC%90-%EF%BC%93mm%E3%83%8E%E3%82%BA%E3%83%AB-3%EF%BC%A4%E9%80%A0%E5%BD%A2%E3%82%B5%E3%82%A4%E3%82%BA7200cm%C2%B3-PLA%E3%83%95%E3%82%A3%E3%83%A9%E3%83%A1%E3%83%B3%E3%83%88%E3%80%81%E7%B5%84%E7%AB%8B%E3%81%A6%E3%83%93%E3%83%87%E3%82%AASD%E3%82%AB%E3%83%BC%E3%83%89%E3%81%8C%E4%BB%98%E5%B1%9E/product-reviews/B01JZ4GSGG/ref=cm_cr_dp_d_show_all_top?ie=UTF8&reviewerType=all_reviews',
'https://www.amazon.co.jp/ALUNAR-M508-%E3%80%90%E5%B7%A5%E5%A0%B4%E7%9B%B4%E8%B2%A9%E3%80%913D%E3%83%97%E3%83%AA%E3%83%B3%E3%82%BF%E3%83%BC%E3%82%AD%E3%83%83%E3%83%88-%EF%BC%90-%EF%BC%93mm%E3%83%8E%E3%82%BA%E3%83%AB-3%EF%BC%A4%E9%80%A0%E5%BD%A2%E3%82%B5%E3%82%A4%E3%82%BA7200cm%C2%B3-PLA%E3%83%95%E3%82%A3%E3%83%A9%E3%83%A1%E3%83%B3%E3%83%88%E3%80%81%E7%B5%84%E7%AB%8B%E3%81%A6%E3%83%93%E3%83%87%E3%82%AASD%E3%82%AB%E3%83%BC%E3%83%89%E3%81%8C%E4%BB%98%E5%B1%9E/product-reviews/B01JZ4GSGG/ref=cm_cr_othr_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=2',
'https://www.amazon.co.jp/ALUNAR-M508-%E3%80%90%E5%B7%A5%E5%A0%B4%E7%9B%B4%E8%B2%A9%E3%80%913D%E3%83%97%E3%83%AA%E3%83%B3%E3%82%BF%E3%83%BC%E3%82%AD%E3%83%83%E3%83%88-%EF%BC%90-%EF%BC%93mm%E3%83%8E%E3%82%BA%E3%83%AB-3%EF%BC%A4%E9%80%A0%E5%BD%A2%E3%82%B5%E3%82%A4%E3%82%BA7200cm%C2%B3-PLA%E3%83%95%E3%82%A3%E3%83%A9%E3%83%A1%E3%83%B3%E3%83%88%E3%80%81%E7%B5%84%E7%AB%8B%E3%81%A6%E3%83%93%E3%83%87%E3%82%AASD%E3%82%AB%E3%83%BC%E3%83%89%E3%81%8C%E4%BB%98%E5%B1%9E/product-reviews/B01JZ4GSGG/ref=cm_cr_othr_d_paging_btm_next_3?ie=UTF8&reviewerType=all_reviews&pageNumber=3',
'https://www.amazon.co.jp/ALUNAR-M508-%E3%80%90%E5%B7%A5%E5%A0%B4%E7%9B%B4%E8%B2%A9%E3%80%913D%E3%83%97%E3%83%AA%E3%83%B3%E3%82%BF%E3%83%BC%E3%82%AD%E3%83%83%E3%83%88-%EF%BC%90-%EF%BC%93mm%E3%83%8E%E3%82%BA%E3%83%AB-3%EF%BC%A4%E9%80%A0%E5%BD%A2%E3%82%B5%E3%82%A4%E3%82%BA7200cm%C2%B3-PLA%E3%83%95%E3%82%A3%E3%83%A9%E3%83%A1%E3%83%B3%E3%83%88%E3%80%81%E7%B5%84%E7%AB%8B%E3%81%A6%E3%83%93%E3%83%87%E3%82%AASD%E3%82%AB%E3%83%BC%E3%83%89%E3%81%8C%E4%BB%98%E5%B1%9E/product-reviews/B01JZ4GSGG/ref=cm_cr_othr_d_paging_btm_next_4?ie=UTF8&reviewerType=all_reviews&pageNumber=4',
'https://www.amazon.co.jp/ALUNAR-M508-%E3%80%90%E5%B7%A5%E5%A0%B4%E7%9B%B4%E8%B2%A9%E3%80%913D%E3%83%97%E3%83%AA%E3%83%B3%E3%82%BF%E3%83%BC%E3%82%AD%E3%83%83%E3%83%88-%EF%BC%90-%EF%BC%93mm%E3%83%8E%E3%82%BA%E3%83%AB-3%EF%BC%A4%E9%80%A0%E5%BD%A2%E3%82%B5%E3%82%A4%E3%82%BA7200cm%C2%B3-PLA%E3%83%95%E3%82%A3%E3%83%A9%E3%83%A1%E3%83%B3%E3%83%88%E3%80%81%E7%B5%84%E7%AB%8B%E3%81%A6%E3%83%93%E3%83%87%E3%82%AASD%E3%82%AB%E3%83%BC%E3%83%89%E3%81%8C%E4%BB%98%E5%B1%9E/product-reviews/B01JZ4GSGG/ref=cm_cr_othr_d_paging_btm_next_5?ie=UTF8&reviewerType=all_reviews&pageNumber=5'
];

//出力用のコンソールオブジェクト作成
const out = fs.createWriteStream('result.txt');
const std = new console.Console(out);

var i = 0;

//順番に処理したいので非同期にする
var parse = function( url ) {
  return function (done) {
   // console.log(url);
    client.fetch(url, function (err, $, res, body) {
      //callback[url](err, res, body);i
	  std.log('---------------page ' + parseInt(++i) + '-------------------');
      $('span.review-text').each(function (idx) {
	  	  std.log('>>>>>>review' + parseInt(idx+1) + '>>>>>>>');
		  std.log($(this).text());
      });
      done(err);
    });
  }
}

async.series(
  urlList.map(function (url) {
    return parse(url);
  }),
  function(err){
    console.log('ALL Complete.');
  }
);
