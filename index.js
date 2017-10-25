var PDFDocument = require('pdfkit');
var fs = require('fs');
var client = require('cheerio-httpcli');

var urlModule = require('url');

var TARGET_URL = "https://github.com/dgjung0220/R_Study";

var list = {};
var listNo = 0;

var file_rename = (fileName) => {
    var dirName = fileName.split('/');
    return dirName[dirName.length-1];
}

var createPDF = (resource) => {
    var doc = new PDFDocument();    
    doc.pipe(fs.createWriteStream('test.pdf'));
    doc.font('Times-Roman');
    for(var i=0; i < list.length; i++) {
        console.log(list[i]);
        doc.fontSize(30).text(list[i], 90,100);
    }
    
    doc.end();
}

var github_crawling = (url) => {

    client.fetch(url, {}, function(err, $, res) {
        $('.file-wrap>table>tbody>tr').each(function(idx){
            var srcfile = $(this).find('a').attr('href');

            if (srcfile !== undefined | NaN) {
                //list[listNo++] = srcfile;
                createPDF(srcfile);
            }
        })
    })
}

github_crawling(TARGET_URL);
