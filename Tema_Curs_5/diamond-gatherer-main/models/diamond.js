const RIGHT_EDGE = 860;
const DOWN_EDGE = 540;
var arrayX = [];
var arrayY = [];
variable = false;
class Diamond {
  constructor() {
    this.x = Math.floor(Math.random() * RIGHT_EDGE + 50);
    this.y = Math.floor(Math.random() * DOWN_EDGE + 50);
    this.imageId = 'diamond';
    this.width = 26;
    this.height = 21;
  }

  forDraw() {

  var  diferentPosition = forDiferentPosition(this.x, this.y);
    return {
      imageId: this.imageId,
      drawImageParameters: [
        this.x,
        this.y
      ]
    }
  }

}

module.exports = Diamond;


function forDiferentPosition(coordinateX, coordinateY) {

  while (variable == true) {
    variable = positionCalculater(coordinateX, coordinateY);
    if (variable == true) {
      coordinateX = Math.floor(Math.random() * RIGHT_EDGE + 50);
      coordinateY = Math.floor(Math.random() * DOWN_EDGE + 50);
    }else{
      arrayX.push(coordinateX);
      arrayY.push(coordinateY);
    }
  }
return {coordinateX,coordinateY};
}

function positionCalculater(coordinateX, coordinateY) {

  const foundX = arrayX.find(element => element == coordinateX);
  const foundY = arrayY.find(element => element == coordinateY);

  if ((foundX === undefined) && (foundY === undefined)) {

    return true;

  }
  else {

    return false;

  }

}