let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
// let imgUrl = './assets/img.png'
let img = document.getElementById('img')
ctx.drawImage(img, 0, 0)
let imgData = ctx.getImageData(0 , 0, img.width, img.height);
let imgDataArray = imgData.data;
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
ctx.putImageData(imgData, 0, 0);

function rgb2gray(r, g, b) {
    return r * 0.333 + g * 0.333 + b * 0.333;
}
