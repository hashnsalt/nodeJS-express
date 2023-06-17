const express = require('express');

const router = express.Router();

router.get('/', function(req, res){
  res.render('index'); //ejs 엔진을 사용하겠다고 view engine에 설정을 해뒀으므로 ejs확장자를 가진 모든 파일은 엔진으로 사용함. 그렇기 대문에 ejs 확장자를 사용할 필요가 없음.
  // const htmlFilePath = path.join(__dirname, 'views', 'index.html'); //복잡한 경로도 .join 메소드를 이용해 간단하게 선언 가능.
  // res.sendFile(htmlFilePath);
});

router.get('/about', function(req, res){
  res.render('about');
  // const htmlFilePath = path.join(__dirname, 'views', 'about.html');
  // res.sendFile(htmlFilePath);
});

module.exports = router;