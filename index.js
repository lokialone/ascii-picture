let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let img = new Image()
img.src = "./assets/img.png"
img.onload =function(){
    ascii(this)
    // pic2gray(this)
}

//灰度化
function pic2gray(img) {
  ctx.drawImage(img, 0, 0)
  let imgData = ctx.getImageData(0 , 0, img.width, img.height)
  let imgDataArray = imgData.data
  for (let index = 0; index <= img.width * img.height * 4; index += 4){
          let gray = rgb2gray(imgDataArray[index], imgDataArray[index + 1], imgDataArray[index + 2])
          imgData.data[index] = imgData.data[index + 1] = imgData.data[index + 2] = gray
      }
  ctx.putImageData(imgData, 0, 0)
}


function ascii(img) {
  let result = ""
  let lineIndex = 0
  ctx.drawImage(img, 0, 0)
  let imgData = ctx.getImageData(0 , 0, img.width, img.height)
  let imgDataArray = imgData.data
  for (let lineHeight = 0; lineHeight < img.height; lineHeight += 4){
      let lineASC = ""
      for (let lineFlag = 0; lineFlag < img.width; lineFlag += 2){
          lineIndex = (lineHeight * img.width + lineFlag) * 4
          lineASC += gray2asc(rgb2gray(imgDataArray[lineIndex],imgDataArray[lineIndex + 1], imgDataArray[lineIndex + 2]))
      }
      lineASC += '\n'
      result += lineASC
  }
  let div = document.getElementById('show')
  div.innerHTML = result
}


function rgb2gray(r, g, b) {
    return r * 0.333 + g * 0.333 + b * 0.333
}

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
