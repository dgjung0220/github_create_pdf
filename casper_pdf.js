var url = "https://github.com/dgjung0220/R_Study";
var savepath = "test.pdf";

var casper = require('casper').create();
var client = require('cheerio-httpcli');

casper.start();

casper.page.paperSize = {
    width : '8.5in',
    height : '11in',
    orientation : 'portrait',
    margin: '1cm'
};


casper.open(url);
casper.then(function() {
    casper.capture(savepath);
})
client.fetch(url, {}, function(err, $, res) {
    $('.file-wrap>table>tbody>tr').each(function(idx){
        var srcfile = $(this).find('a').attr('href');

        if (srcfile !== undefined | NaN) {

        }
    })
})


casper.run();