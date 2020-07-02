
var canvas = document.getElementById("paint");
var ctx = canvas.getContext("2d");
var bkgrd = document.getElementById("hidden").style.backgroundImage
var bkg = document.getElementById("hidden").style.backgroundColor
var width = canvas.width, height = canvas.height;
var curX, curY, prevX, prevY;
var hold = false;
var erase = false;
var bg = false
var fill_value = true, stroke_value = false;
var canvas_data = { "pencil": [], "line": [], "rectangle": [], "circle": [], "eraser": [] }

//this function I made to hide or show the option to send to another user. since it is not on the
//edit page I did not make them global variables so the edit page will still work.
function show() {
  if (document.getElementById("send").checked === true) {
    document.getElementById("other").style.visibility = "visible"
    document.getElementById("choose").style.visibility = "visible"
    document.getElementById("save").textContent = "Send"
  } else {
    document.getElementById("other").style.visibility = "hidden"
    document.getElementById("choose").style.visibility = "hidden"
    document.getElementById("save").textContent = "Save"
  }
}

//I added this to change the color of the stroke and fill
function color (color_value){
  if (bg === false){
    ctx.strokeStyle = color_value;
    ctx.fillStyle = color_value;
  } else{
    canvas.style.background = color_value
    //on color click update the ctx info but if background has been clicked first
    //the background color to the selected color
    //the other functions will change the background boolean to false so that ctx change
    //is the default
  }
}

function add_pixel (){
    ctx.lineWidth += 1;
}

function reduce_pixel (){
    if (ctx.lineWidth == 2)
        return;
    else
        ctx.lineWidth -= 1;
}

function background (){
    bg = true;
//I added the background color functionality for more fun art.
//This will be passed into the model as the color since canvas cannot
//easily save background color changes
}

function reset (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas_data = { "pencil": [], "line": [], "rectangle": [], "circle": [], "eraser": [] };
    //included by me - if new background reset is white, if edit reset is original image
    if (bkgrd === "initial") {
    canvas.style.background = "#ffffff"
  } else {
    location.reload();
  } //for the edit function to work on reset
}

// pencil tool
function pencil (){
    bg = false
    canvas.onmousedown = function (e){
        curX = e.clientX - canvas.offsetLeft;
        curY = e.clientY - canvas.offsetTop;
        hold = true;

        prevX = curX;
        prevY = curY;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
    };

    canvas.onmousemove = function (e){
        if(hold){
            curX = e.clientX - canvas.offsetLeft;
            curY = e.clientY - canvas.offsetTop;
            draw();
        }
    };

    canvas.onmouseup = function (e){
        hold = false;
    };

    canvas.onmouseout = function (e){
        hold = false;
    };

    function draw (){
        ctx.lineTo(curX, curY);
        //source code did not have color change from white when other tool clicked so I included this
        if (erase === true) {
        ctx.strokeStyle = "#000000";
        erase = false;
        ctx.lineWidth = 4
        }
        ctx.stroke();
        canvas_data.pencil.push({ "startx": prevX, "starty": prevY, "endx": curX, "endy": curY,
            "thick": ctx.lineWidth, "color": ctx.strokeStyle });
    }
}

// line tool
function line (){
    bg = false
    canvas.onmousedown = function (e){
        img = ctx.getImageData(0, 0, width, height);
        prevX = e.clientX - canvas.offsetLeft;
        prevY = e.clientY - canvas.offsetTop;
        hold = true;
    };

    canvas.onmousemove = function (e){
        if (hold){
            ctx.putImageData(img, 0, 0);
            curX = e.clientX - canvas.offsetLeft;
            curY = e.clientY - canvas.offsetTop;
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(curX, curY);
            ctx.stroke();
            canvas_data.line.push({ "starx": prevX, "starty": prevY, "endx": curX, "endY": curY,
                 "thick": ctx.lineWidth, "color": ctx.strokeStyle });
            ctx.closePath();
        }
    };

    canvas.onmouseup = function (e){
         hold = false;
    };

    canvas.onmouseout = function (e){
         hold = false;
    };
}

// rectangle tool
function rectangle (){
    bg = false
    canvas.onmousedown = function (e){
        img = ctx.getImageData(0, 0, width, height);
        prevX = e.clientX - canvas.offsetLeft;
        prevY = e.clientY - canvas.offsetTop;
        hold = true;
    };

    canvas.onmousemove = function (e){
        if (hold){
            ctx.putImageData(img, 0, 0);
            curX = e.clientX - canvas.offsetLeft - prevX;
            curY = e.clientY - canvas.offsetTop - prevY;
            ctx.strokeRect(prevX, prevY, curX, curY);
            if (fill_value){
                ctx.fillRect(prevX, prevY, curX, curY);
            }
            canvas_data.rectangle.push({ "starx": prevX, "stary": prevY, "width": curX, "height": curY,
                "thick": ctx.lineWidth, "stroke": stroke_value, "stroke_color": ctx.strokeStyle, "fill": fill_value,
                "fill_color": ctx.fillStyle });

        }
    };

    canvas.onmouseup = function (e){
        hold = false;
    };

    canvas.onmouseout = function (e){
        hold = false;
    };
}

// circle tool
function circle (){
    bg = false
    canvas.onmousedown = function (e){
        img = ctx.getImageData(0, 0, width, height);
        prevX = e.clientX - canvas.offsetLeft;
        prevY = e.clientY - canvas.offsetTop;
        hold = true;
    };

    canvas.onmousemove = function (e){
        if (hold){
            ctx.putImageData(img, 0, 0);
            curX = e.clientX - canvas.offsetLeft;
            curY = e.clientY - canvas.offsetTop;
            ctx.beginPath();
            ctx.arc(Math.abs(curX + prevX)/2, Math.abs(curY + prevY)/2,
                Math.sqrt(Math.pow(curX - prevX, 2) + Math.pow(curY - prevY, 2))/2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.stroke();
            if (fill_value)
                ctx.fill();
            canvas_data.circle.push({ "starx": prevX, "stary": prevY, "radius": curX - prevX, "thick": ctx.lineWidth,
                "stroke": stroke_value, "stroke_color": ctx.strokeStyle, "fill": fill_value, "fill_color": ctx.fillStyle });
        }
    };

    canvas.onmouseup = function (e){
        hold = false;
    };

    canvas.onmouseout = function (e){
        hold = false;
    };
}

//erasor tool
function eraser (){
    bg = false
    canvas.onmousedown = function (e){
        curX = e.clientX - canvas.offsetLeft;
        curY = e.clientY - canvas.offsetTop;
        hold = true;

        prevX = curX;
        prevY = curY;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
    };

    canvas.onmousemove = function (e){
        if(hold){
            curX = e.clientX - canvas.offsetLeft;
            curY = e.clientY - canvas.offsetTop;
            draw();
        }
    };

    canvas.onmouseup = function (e){
        hold = false;
    };

    canvas.onmouseout = function (e){
        hold = false;
    };

    function draw (){
        ctx.lineTo(curX, curY);
        ctx.strokeStyle = canvas.style.background;
        //i added this so the background will properly erase whatever color it is
        erase = true
        ctx.stroke();
        ctx.lineWidth = 15
        canvas_data.eraser.push({ "startx": prevX, "starty": prevY, "endx": curX, "endy": curY,
            "thick": ctx.lineWidth, "color": ctx.strokeStyle });
    }
}

//I added in the csrf middlewear token and the background color info and fixed the errors in the code source below
// source =https://nidhinp.wordpress.com/2014/02/19/paint-app-in-django/
function save (){
    const token = $("[name=csrfmiddlewaretoken]").val()
    //I added token here so the ajax request will go through successfully
    const filename = document.getElementById("fname").value;
    if (filename === "") {
      alert("Please name your art!")
      return false
    }
    const data = JSON.stringify(canvas_data);
    const image = canvas.toDataURL();
    const background = canvas.style.background
    var send = false;
    var other = "";
    var alrt = " saved. Go to the Gallery or your Profile page to view/edit.";
    if (document.getElementById("send").checked === true) {
      send = true;
      other = parseInt(document.getElementById("other").value)
      debugger;
      alrt = " has been sent to your friend.";
    }
    $.post("/", { save_fname: filename, save_cdata: data, save_image: image, send: send, other: other, background: background, csrfmiddlewaretoken: token });
    alert(filename + alrt);
}



//this is the update function I added to allow user to add to their drawing and change the name
 function update (){
    const token = $("[name=csrfmiddlewaretoken]").val()
    //I added token here so the ajax request will go through successfully
    const filename = document.getElementById("fname").value;
    if (filename === "") {
      alert("Please name your art!")
      return false
    }
    const data = JSON.stringify(canvas_data);
    const image = canvas.toDataURL();
    const background = canvas.style.background
    var send = false;
    var other = "";
    $.post("/", { save_fname: filename, save_cdata: data, save_image: image, send: send, other: other, background: background, csrfmiddlewaretoken: token });
    alert(filename + " saved as a copy. You can delete the original drawing on your profile page.");
}

//on load play the music and set to pencil
document.addEventListener('DOMContentLoaded', function () {
pencil();
//added pencil as default and background color
myAudio = document.getElementById('music')
myAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
myAudio.play()
//https://stackoverflow.com/questions/3273552/html5-audio-looping



});
