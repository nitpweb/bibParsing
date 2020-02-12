
var express =require('express');
var bibtex =require('bibtex');
var bodyParser=require('body-parser');
var request=require('request');
var path = require('path');
var a=express();
var bibtexParse = require('bibtex-parse-js');
var fs= require('fs');
var multer = require('multer');
const upload = multer({ dest: './uploads/' });
//var multerupload = multer({ dest: 'fileprint/' })
a.use(bodyParser.urlencoded({ extended: true }));
a.use(bodyParser.json());

/*var sample = bibtexParse.toJSON(`
 
@InProceedings{mut2011,
  author    = {Pradeep Muthukrishnan and Dragomir Radev and Qiaozhu Mei},
  title     = {Simultaneous Similarity Learning and Feature-Weight Learning for Document Clustering},
  booktitle = {Proceedings of TextGraphs-6: Graph-based Methods for Natural Language Processing},
  month     = {June},
  year      = {2011},
  address   = {Portland, Oregon},
  publisher = {Association for Computational Linguistics},
  url       = {http://www.aclweb.org/anthology/W11-1107},
  pages = {42--50}
}
`);
*/



a.get("/convert",function(req,res){
res.send("hello");

console.log("Got you");
console.log(sample);

const bibFile = bibtex.parseBibFile(`
 
@InProceedings{mut2011,
  author    = {Pradeep Muthukrishnan and Dragomir Radev and Qiaozhu Mei},
  title     = {Simultaneous Similarity Learning and Feature-Weight Learning for Document Clustering},
  booktitle = {Proceedings of TextGraphs-6: Graph-based Methods for Natural Language Processing},
  month     = {June},
  year      = {2011},
  address   = {Portland, Oregon},
  publisher = {Association for Computational Linguistics},
  url       = {http://www.aclweb.org/anthology/W11-1107},
  pages = {42--50}
}
`);
 
console.log(
    // Keys are case-insensitive
    bibFile.getEntry("MUT2011").getField("TITLE")
); 





});

a.post('/convertbib', upload.single('myFile'), (req, res) => {
    if (req.file) {
        console.log('Uploading file...');
        var filename = req.file.filename;
        var uploadStatus = 'File Uploaded Successfully';
    } else {
        console.log('No File Uploaded');
        var filename = 'FILE NOT UPLOADED';
        var uploadStatus = 'File Upload Failed';
    }
 // res.send(req.file.path);
  var data = fs.readFileSync(req.file.path, 'utf8');
console.log(data);

var sample = bibtexParse.toJSON(data);

console.log(sample);
res.send(sample);
    /* ===== Add the function to save filename to database ===== */
    
   // res.render('index.hbs', { status: uploadStatus, filename: `Name Of File: ${filename}` });
});





a.listen(3000,function(){
	console.log("server initiated");
});