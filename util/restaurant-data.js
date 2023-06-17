const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '..' ,'data', 'restaurants.json');//파일 경로 조심.

function getStoredRestaurants(){

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  return storedRestaurants;
};

function storeRestaurants(storableRestaurants){
  fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
};

module.exports = {//내보내고 싶은 함수를 객체 형태로 내보냄. 여기서 왼쪽은 키(key)이고, 오른쪽은 키값임.
  getStoredRestaurants: getStoredRestaurants,
  storedRestaurants: storeRestaurants
};