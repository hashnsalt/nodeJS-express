const path = require('path');
const express = require('express');

const defaultRoutes = require('./routes/default');
const restaurantRoutes = require('./routes/restaurants');

const app = express();

app.set('views', path.join(__dirname, 'views')); //엔진(server)으로 사용할 파일들의 위치를 선언하는 예약어.
app.set('view engine', 'ejs'); // view engine:클라이언트에 보낼 응답 웹 문서를 만들 때 사용. 서버에서 js로 만든 변수를 보내줘서 클라이언트에서 사용할 수 있게 하는 것. view engine은 주로 ejs || pug를 사용함. 
//set()메서드는 서버 환경설정을 위한 메서드. 

app.use(express.static('public')); // express.static => public이라는 정적 파일 폴더 아래에 든 모든 파일들의 기본 경로를 제공해주기 위한 미들웨어.
app.use(express.urlencoded({extended: false}));

app.use('/', defaultRoutes);
app.use('/', restaurantRoutes);


app.use(function(req, res){ //.use() 메서드를 이용해 해당 핸들링 함수(function(){})에 관한 요청이 들어올때마다 모든 요청에 미들웨어를 적용하게 됨.
  res.status(404).render('404');
});

app.use(function(err, req, res, next) {
  res.status(500).render('500');
});


app.listen(3000);

