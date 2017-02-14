let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
// let imgUrl = './assets/img.png'

var img = new Image();
img.src = "./assets/img3.png";
img.onload =function(){
    invert(this);
    // ascii(this);
};
function invert(img) {
    ctx.drawImage(img,0,0);
    //获取图片对象以及元素点的数组
    var img1 = ctx.getImageData(0, 0, 800, 400);
    var data = img1.data;
    //转换灰度图
    var arr=["M","N","H","Q","$","O","C","?","7",">","!",":","–",";","'"];
    var result=[];
    for (var i = 0, len = data.length ; i < len; i += 4) {
        var avg=(data[i]+ data[i+1]+data[i+2])/3;
        data[i] = avg;
        data[i+1] = avg;
        data[i+2] = avg;
        var num=Math.floor(avg/18);
        result.push(arr[num]);
        if(i%3200==0&&i!=0){
            result.push("<br>")
        }
    }
    let div = document.getElementById('show')
    div.innerHTML = result.join('')
    ctx.putImageData(img1, 0, 0);

}
// 单极图
function danjihua() {
  for (var index = 0; index <= img.width * img.height * 4; index += 4){
          var red = imgDataArray[index];
          var green = imgDataArray[index + 1];
          var blue = imgDataArray[index + 2];
          var gray = rgb2gray(red, green, blue);
          if (gray < 128){
              imgData.data[index] = 0;
              imgData.data[index + 1] = 0;
              imgData.data[index + 2] = 0;
          }
          else {
              imgData.data[index] = 255;
              imgData.data[index + 1] = 255;
              imgData.data[index + 2] = 255;
          }
      }
}

//灰度化
function huiduhua() {
  for (var index = 0; index <= img.width * img.height * 4; index += 4){
          var red = imgDataArray[index];
          var green = imgDataArray[index + 1];
          var blue = imgDataArray[index + 2];
          var gray = rgb2gray(red, green, blue);
          imgData.data[index] = gray;
          imgData.data[index + 1] = gray;
          imgData.data[index + 2] = gray;
      }
}


// 转换失败的代码0.0
function ascii(img) {
  var result = "";
  var lineIndex = 0;
  ctx.drawImage(img, 0, 0)
  let imgData = ctx.getImageData(0 , 0, 400, 400);
  let imgDataArray = imgData.data;
  for (var lineHeight = 0; lineHeight < img.height; lineHeight += 12){
      var lineASC = "";
      for (var lineFlag = 0; lineFlag < img.width; lineFlag += 5){
          lineIndex = (lineHeight * img.width + lineFlag) * 4;
          var r = imgDataArray[lineIndex];
          var g = imgDataArray[lineIndex + 1];
          var b = imgDataArray[lineIndex + 2];
          lineASC += gray2asc(rgb2gray(r, g, b));
      }
      lineASC += '\n';
      result += lineASC;
  }
  let div = document.getElementById('show')
  div.innerHTML = result;
}

function ascii2() {
  var arr=["M","N","H","Q","$","O","C","?","7",">","!",":","–",";","."];
  var result=[];
  for (var i = 0, len =imgDataArray.length; i < len; i += 8) {
      var avg=(imgDataArray[i]+imgDataArray[i+1]+imgDataArray[i+2])/3;
      var num=Math.floor(avg/18);
      result.push(arr[num]);
      if(i%1200==0&&i!=0){
          result.push("<br>")
      }
  }
  let div = document.getElementById('show')
  div.innerHTML = result.join()
}




      //  console.log(result);

function rgb2gray(r, g, b) {
    return r * 0.333 + g * 0.333 + b * 0.333;
}

function gray2asc(gray) {
    /*ASCII--I'mYasic*/
    /*32 64 96 128 160 192 224 256*/
    gray = 255 - gray;
    if (gray < 128){
        if (gray < 64){
            if (gray < 32){
                return '\''
            }
            else {
                return 'c'
            }
        }
        else {
            if (gray < 96){
                return 'i'
            }
            else {
                return 's'
            }
        }
    }
    else {
        if (gray < 192){
            if (gray < 160){
                return 'I'
            }
            else {
                return 'm'
            }
        }
        else {
            if (gray < 224){
                return 'a'
            }
            else {
                return 'Y'
            }
        }
    }
}
