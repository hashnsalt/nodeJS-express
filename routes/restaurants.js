const express = require('express');
const uuid = require('uuid');

const resData = require('../util/restaurant-data');
const router = express.Router();

router.get('/restaurants', function(req, res){
  let order = req.query.order;
  let nextOrder = 'desc';

  if (order !== 'asc' && order !== 'desc') {
    order = 'asc';
  }//oder value가 asc이거나 desc가 아닐 때 오름차순 정렬.

  if (order === 'desc'){
    nextOrder = 'asc';
  }

  const storedRestaurants = resData.getStoredRestaurants(); //refactoring

  storedRestaurants.sort(function(resA, resB) {
    if((order === 'asc' && resA.name > resB.name) || (order === 'desc' && resB.name > resA.name)) {
      return 1;
    }
    return -1;
  });

  res.render('restaurants', { numberOfRestaurants: storedRestaurants.length, restaurants: storedRestaurants, nextOrder: nextOrder }); //numberOfRestaurants 변수를 가진 restaurants view engine에 동적으로 데이터 값을 변환 하기 위해 설정을 해줌. 여기서는 저장되어 있는 데이터의 갯수를 가져와야 하므로, 객체||배열 데이터로 읽어드린 storedRestaurants 변수를 이용할 것임.
  //두번째 객체 변수인 restaurants 는 리스트 목록을 만들기 위해 restaurants.ejs 에서 사용한 객체 데이터 값을 가진 데이터 배열 변수임. 변수명은 똑같은 것으로 사용해야 함.
  // const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html'); //복잡한 경로도 .join 메소드를 이용해 간단하게 선언 가능.
  // res.sendFile(htmlFilePath);
  //nextOrder : 등록된 데이터의 이름 순서에 따른 정렬 기능을 부여.

});

router.get('/restaurants/:id', function(req, res){//동적인 경로를 설정해 주기 위해서 객체 데이터 고유의 id값을 이용해 각 레스토랑의 상세보기 페이지로 이동함.
  const restaurantId = req.params.id; // params : 실제 객체 요소를 가짐. 여기서는 객체 데이터의 id를 url 경로로 사용하기 위해서 id값을 가져오기 위해서 쓰임.

  const storedRestaurants = resData.getStoredRestaurants();//refactoring

  for (const restaurant of storedRestaurants) {//for문을 이용해 객체 데이터의 요소를 이용해 같은 아이디를 가진 객체 데이터 요소에 관한 정보를 전달할 것임.
    if (restaurant.id === restaurantId) {//만약 객체 데이터 요소들 중 아이디가 클라이언트가 요청한 레스토랑 id와 같다면 return문을 반환.
      return res.render('restaurants-detail', { restaurant: restaurant, rid: restaurantId }); // return문은 for문을 순서대로 돌렸을 때 id 값이 같은 객체 데이터 요소가 나온다면 즉시 for문의 활동을 멈추게 함.
    }
    // res.render('restaurants-detail', { rid: restaurantId, restaurants: storedRestaurants }); // resataurants-detail.ejs 페이지를 랜더링 시키고 restaurantId 값을 rid 변수 값으로 선언하여 값을 가져오기로 함.
  }
  res.status(404).render('404');
});


router.get('/recommend', function(req, res){
  res.render('recommend');
  // const htmlFilePath = path.join(__dirname, 'views', 'recommend.html');
  // res.sendFile(htmlFilePath);
});

router.post('/recommend', function(req, res){
  const restaurant = req.body; //req.body.name 이런 식으로 입력 데이터를 따로따로 들고 올 수 있지만, 반환하는 데이터가 한 묶음이므로 전체로 저장하기 위해 req.body를 사용.
  restaurant.id = uuid.v4(); //.v4(): 무작이로 고유한 id를 생성해 줌. 이는 텍스트 파일로 생성이 되므로 그 문자열이 json 데이터화 됨.
    //restaurant.id에서 id는 명칭이 바뀌어도 상관없지만 id를 구분 함으로 직관적으로 이해할 수 있는 언어가 필요함. 기존 form 형식으로 반환되는 입력 데이터에 id 속성을 추가(점표기법으로 id 필드 추가)로 두어 고유 id 값을 가지게끔 정의 해줌.

  const restaurants = resData.getStoredRestaurants(); //refactoring

  restaurants.push(restaurant); //refactoring

  resData.storeRestaurants(restaurants); //refactoring

  res.redirect('/confirm'); //사용자가 해당 양식을 다시 제출하겠냐는 알람창이 뜨지 않고 express 내장 메소드인 .redirect() 메소드를 이용하여 confirm 페이지로 바로 이동하도록 하게끔 정의할 수 있음.

});

router.get('/confirm', function(req, res){
  res.render('confirm');
  // const htmlFilePath = path.join(__dirname, 'views', 'confirm.html');
  // res.sendFile(htmlFilePath);
});

module.exports = router;