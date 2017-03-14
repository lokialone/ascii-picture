let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let img = new Image()
img.src = "./assets/img.png"

img.onload =function(){

    ctx.drawImage(this, 0, 0)
    let width = this.width, height = this.height
    let imgData = ctx.getImageData(0 , 0, width, height)
    ascii(imgData.data, width, height)
    pic2gray(imgData, width, height)
    // let morphResult = asciiLittlePic(imgData.data, width, height)
    // morph(morphResult)
}

//灰度化
function pic2gray(imgData, width, height) {
  let imgDataArray = imgData.data
  for (let index = 0; index <= width * height * 4; index += 4){
          let gray = rgb2gray(imgDataArray[index], imgDataArray[index + 1], imgDataArray[index + 2])
          imgData.data[index] = imgData.data[index + 1] = imgData.data[index + 2] = gray
      }
  ctx.putImageData(imgData, 0, 0)
}


function ascii(imgDataArray, width, height) {
  let result = ""
  let lineIndex = 0
  for (let lineHeight = 0; lineHeight < height; lineHeight += 4){
      let lineASC = ""
      for (let lineFlag = 0; lineFlag < width; lineFlag += 2){
          lineIndex = (lineHeight * width + lineFlag) * 4
          let asciiRes = gray2asc(rgb2gray(imgDataArray[lineIndex],imgDataArray[lineIndex + 1], imgDataArray[lineIndex + 2]))
          lineASC += asciiRes
      }
      lineASC += '\n'
      result += lineASC
  }
  let div = document.getElementById('show')
  div.innerHTML = result
}

function asciiLittlePic(imgDataArray, width, height) {
  let morphResult = []
  let lineIndex = 0
  for (let lineHeight = 0; lineHeight < height; lineHeight += 1){
      let lineASC = ""
      for (let lineFlag = 0; lineFlag < width; lineFlag += 1){
          lineIndex = (lineHeight * width + lineFlag) * 4
          let asciiRes = gray2ascSpecial(rgb2gray(imgDataArray[lineIndex],imgDataArray[lineIndex + 1], imgDataArray[lineIndex + 2]))
          lineASC += asciiRes
      }
      morphResult.push(lineASC)
  }
  return morphResult;
}

function morph(morphResult) {
  let element = document.querySelector('pre')
  AsciiMorph(element, {x: 51,y: 28})
  setInterval(function() {
    AsciiMorph.morph(morphResult)
  }, 5000)
}
// 灰度化算法一
function rgb2gray(r, g, b) {
    return r * 0.333 + g * 0.333 + b * 0.333
}
// 灰度化算法二
function rgb2gray_1(r, g, b) {
  return  r * 0.3 + g * 0.59 + b * 0.11
}

function gray2asc(gray) {
    /*32 64 96 128 160 192 224 256*/
    gray = 255 - gray
    if (gray < 128){
        if (gray < 64){
            if (gray < 32){
                return '\''
            }
            else {
                return ' '
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

function gray2ascSpecial(gray){
  /*32 64 96 128 160 192 224 256*/
  gray = 255 - gray
  if (gray < 128){
      if (gray < 64){
          if (gray < 32){
              return ' '
          }
          else {
              return 'i'
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
