var PDFDocument = require('pdfkit');
var fs = require('fs');
var client = require('cheerio-httpcli');
var urlModule = require('url');
var Map = require('collections/map');

var TARGET_URL = "https://github.com/dgjung0220/R_Study";
var pathurl = "https://github.com";

var file_rename = (fileName) => {
    var dirName = fileName.split('/');
    return dirName[dirName.length-1];
}

var doc = new PDFDocument();

var pdfFileTemp = TARGET_URL.split('/');
var pdfFileName = pdfFileTemp[pdfFileTemp.length-1]+'.pdf';
doc.pipe(fs.createWriteStream(pdfFileName));
doc.font('Times-Roman');

var title = TARGET_URL.split(pathurl)[1];
doc.fontSize(25).text(title + ' ' + 'code list', 100,100);
doc.moveDown();
doc.moveDown();

var map = new Map();
var main = client.fetchSync(TARGET_URL);
main.$('.file-wrap>table>tbody>tr').each(function(idx){
    var srcfile = main.$(this).find('a').attr('href');
    if (srcfile !== undefined | NaN) {
        map.set(file_rename(srcfile), pathurl+srcfile);
        doc.fontSize(12).text(file_rename(srcfile),{
            width:410,
            align: 'left'
        });
        doc.fontSize(9).text(pathurl+srcfile,{
            width:410,
            align: 'left',
            indent: 20
        });
        doc.moveDown();
    }
});

doc.addPage();
map.forEach(function(value, key) {
    var pages = client.fetchSync(value);
    pages.$('table>tr').each(function(idx) {
        var code = pages.$(this).find('td').text()+'\n';
        doc.fontSize(10).text(code, {
            width:410,
            align: 'left'
        })
    });
    doc.addPage();
});

doc.end();