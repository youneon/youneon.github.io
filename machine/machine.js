window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

var gnum = 90; //num grids / frame
var _x = 3000; //x width (canvas width)
var _y = 3000; //y height (canvas height)
var w = _x / gnum; //grid sq width
var h = _y / gnum; //grid sq height
var $; //context
var parts; //particles
var frm = 0; //value from
var P1 = 0.0005; //point one
var P2 = 0.01; //point two
var n = 0.98; //n value for later
var n_vel = 0.5; //velocity
var ŭ = 0; //color update
var msX = 0; //mouse x
var msY = 0; //mouse y
var msdn = false; //mouse down flag

var Part = function() {
  this.x = 0; //x pos
  this.y = 0; //y pos
  this.vx = 0; //velocity x
  this.vy = 0; //velocity y
  this.ind_x = 0; //index x
  this.ind_y = 0; //index y
};

Part.prototype.frame = function() {

  if (this.ind_x == 0 || this.ind_x == gnum - 1 || this.ind_y == 0 || this.ind_y == gnum - 1) {
    return;
  }

  var ax = 0; //angle x
  var ay = 0; //angle y
  //off_dx, off_dy = offset distance x, y
  var off_dx = this.ind_x * w - this.x;
  var off_dy = this.ind_y * h - this.y;
  ax = P1 * off_dx;
  ay = P1 * off_dy;

  ax -= P2 * (this.x - parts[this.ind_x - 1][this.ind_y].x);
  ay -= P2 * (this.y - parts[this.ind_x - 1][this.ind_y].y);

  ax -= P2 * (this.x - parts[this.ind_x + 1][this.ind_y].x);
  ay -= P2 * (this.y - parts[this.ind_x + 1][this.ind_y].y);

  ax -= P2 * (this.x - parts[this.ind_x][this.ind_y - 1].x);
  ay -= P2 * (this.y - parts[this.ind_x][this.ind_y - 1].y);

  ax -= P2 * (this.x - parts[this.ind_x][this.ind_y + 1].x);
  ay -= P2 * (this.y - parts[this.ind_x][this.ind_y + 1].y);

  this.vx += (ax - this.vx * n_vel);
  this.vy += (ay - this.vy * n_vel);

  this.x += this.vx * n;
  this.y += this.vy * n;
  if (msdn) {
    var dx = this.x - msX;
    var dy = this.y - msY;
    var ɋ = Math.sqrt(dx * dx + dy * dy);
    if (ɋ < 50) {
      ɋ = ɋ < 10 ? 10 : ɋ;
      this.x -= dx / ɋ * 5;
      this.y -= dy / ɋ * 5;
    }
  }
};

function go() {
    parts = []; //particle array
    for (var i = 0; i < gnum; i++) {
      parts.push([]);
      for (var j = 0; j < gnum; j++) {
        var p = new Part();
        p.ind_x = i;
        p.ind_y = j;
        p.x = i * w;
        p.y = j * h;
        parts[i][j] = p;
      }
    }
  }
  //move particles function
function mv_part() {

    for (var i = 0; i < gnum; i++) {
      for (var j = 0; j < gnum; j++) {
        var p = parts[i][j];
        p.frame();
      }
    }
  }
  //draw grid function
function draw() {
    $.strokeStyle = "hsla(" + (ŭ % 360);
    $.beginPath();
    ŭ -= .5;
    for (var i = 0; i < gnum - 1; i += 1) {
      for (var j = 0; j < gnum - 1; j += 1) {
        var p1 = parts[i][j];
        var p2 = parts[i][j + 1];
        var p3 = parts[i + 1][j + 1];
        var p4 = parts[i + 1][j];
        draw_each(p1, p2, p3, p4);
      }
    }
    $.stroke();

  }
  //draw each in array
function draw_each(p1, p2, p3, p4) {

    $.moveTo(p1.x, p1.y);
    $.lineTo(p2.x, p2.y);
    $.moveTo(p1.x, p1.y);
    $.lineTo(p4.x, p4.y);

    if (p1.ind_x == gnum - 2) {
      $.moveTo(p3.x, p3.y);
      $.lineTo(p4.x, p4.y);
    }
    if (p1.ind_y == gnum - 2) {
      $.moveTo(p3.x, p3.y);
      $.lineTo(p2.x, p2.y);
    }
  }
  //call functions to run
function calls() {
    $.fillStyle = "hsla(0, 0%, 0%, 0)";
    $.fillRect(0, 0, _x, _y);

    mv_part();
    draw();
    frm++;
  }
  //create wave effect
function wave(x, y) {

  var wv = Math.sin(x / wv * xw);
  var wave = Math.sin(5 * w * frm + y * yw) * w;

  return wave;
}

var c = document.getElementById('canv');
var $ = c.getContext('2d');
$.fillStyle = "hsla(0, 0%, 0%, 0)";
$.fillRect(0, 0, _x, _y);

function resize() {
  if (c.width < window.innerWidth) {
    c.width = window.innerWidth;
  }

  if (c.height < window.innerHeight) {
    c.height = window.innerHeight;
  }
}
window.requestAnimFrame(go);

document.addEventListener('mousemove', MSMV, false);
document.addEventListener('mousedown', MSDN, false);
document.addEventListener('mouseup', MSUP, false);

function MSDN(e) {
  msdn = true;
}

function MSUP(e) {
  msdn = false;
}

function MSMV(e) {
  var rect = e.target.getBoundingClientRect();
  msX = e.clientX - rect.left;
  msY = e.clientY - rect.top;
}


document.addEventListener("touchstart", handleStart, false);
document.addEventListener("touchend", handleEnd, false);
document.addEventListener("touchcancel", handleCancel, false);
document.addEventListener("touchleave", handleEnd, false);
document.addEventListener("touchmove", handleMove, false);

var ongoingTouches = new Array;

function handleStart(evt) {
  msdn = true;
  // var el = c;
  // //var ctx = el.getContext("2d");
  // var touches = evt.changedTouches;
  // var offset = findPos(el);  
  // var rect = evt.target.getBoundingClientRect();
   
  // for (var i = 0; i < touches.length; i++) {
  //   //evt.preventDefault();

  //   if(touches[i].clientX-offset.x >0 
  //       && touches[i].clientX-offset.x < parseFloat(el.width) 
  //       && touches[i].clientY-offset.y >0 
  //       && touches[i].clientY-offset.y < parseFloat(el.height)) {
  //     evt.preventDefault();
  //     //log("touchstart:" + i + "...");
  //     ongoingTouches.push(copyTouch(touches[i]));
  //     // var color = colorForTouch(touches[i]);
  //     // ctx.beginPath();
  //     // ctx.arc(touches[i].clientX-offset.x, touches[i].clientY-offset.y, 4, 0, 2 * Math.PI, false); // a circle at the start
  //     // ctx.fillStyle = color;
  //     // ctx.fill();

  //     msX = touches[i].clientX - rect.left;
  //     msY = touches[i].clientY - rect.top;
  //     //log("touchstart:" + i + ".");
  //   }
  // }
}

function handleMove(evt) {
  var rect ;//= evt.target.getBoundingClientRect();
  // msX = evt.clientX - rect.left;
  // msY = evt.clientY - rect.top;
  // var el = c;//document.getElementsByTagName("canvas")[0];
  // //var ctx = el.getContext("2d");
  var touches = evt.changedTouches;
  // var offset = findPos(el);
  // var rect = evt.target.getBoundingClientRect();

  for (var i = 0; i < touches.length; i++) {

    rect = evt.target.getBoundingClientRect();
    msX = touches[i].clientX - rect.left;
    msY = touches[i].clientY - rect.top;
  //   if(touches[i].clientX-offset.x >0 
  //       && touches[i].clientX-offset.x < parseFloat(el.width) 
  //       && touches[i].clientY-offset.y >0 
  //       && touches[i].clientY-offset.y < parseFloat(el.height)){
  //     evt.preventDefault();
  //     //var color = colorForTouch(touches[i]);
  //     var idx = ongoingTouchIndexById(touches[i].identifier);
      
  //     if (idx >= 0) {
  //       // //log("continuing touch " + idx);
  //       // ctx.beginPath();
  //       // //log("ctx.moveTo(" + ongoingTouches[idx].clientX + ", " + ongoingTouches[idx].clientY + ");");
  //       // ctx.moveTo(ongoingTouches[idx].clientX-offset.x, ongoingTouches[idx].clientY-offset.y);
  //       // //log("ctx.lineTo(" + touches[i].clientX + ", " + touches[i].clientY + ");");
  //       // ctx.lineTo(touches[i].clientX-offset.x, touches[i].clientY-offset.y);
  //       // ctx.lineWidth = 4;
  //       // ctx.strokeStyle = color;
  //       // ctx.stroke();

  //       msX = touches[i].clientX - rect.left;
  //       msY = touches[i].clientY - rect.top;
        
  //       ongoingTouches.splice(idx, 1, copyTouch(touches[i])); // swap in the new touch record
  //       //log(".");
  //     } else {
  //       //log("can't figure out which touch to continue");
  //     }
  //   }
  }
}
function handleEnd(evt) {
  msdn = false;
//  log("touchend/touchleave.");
//   var el = c;//document.getElementsByTagName("canvas")[0];
//   //var ctx = el.getContext("2d");
//   var touches = evt.changedTouches;
//   var offset = findPos(el);
//   var rect = evt.target.getBoundingClientRect();
        
//   for (var i = 0; i < touches.length; i++) {
//     if(touches[i].clientX-offset.x >0 
//         && touches[i].clientX-offset.x < parseFloat(el.width) 
//         && touches[i].clientY-offset.y >0 
//         && touches[i].clientY-offset.y < parseFloat(el.height)){
//       evt.preventDefault();
//       //var color = colorForTouch(touches[i]);
//       var idx = ongoingTouchIndexById(touches[i].identifier);
          
//       if (idx >= 0) {
//         // ctx.lineWidth = 4;
//         // ctx.fillStyle = color;
//         // ctx.beginPath();
//         // ctx.moveTo(ongoingTouches[idx].clientX-offset.x, ongoingTouches[idx].clientY-offset.y);
//         // ctx.lineTo(touches[i].clientX-offset.x, touches[i].clientY-offset.y);
//         // ctx.fillRect(touches[i].clientX - 4-offset.x, touches[i].clientY - 4-offset.y, 8, 8); // and a square at the end
        
//         msX = touches[i].clientX - rect.left;
//         msY = touches[i].clientY - rect.top;

//         ongoingTouches.splice(i, 1); // remove it; we're done
//       } else {
//         //log("can't figure out which touch to end");
//       }
//     }
//   }
}
function handleCancel(evt) {
  msdn = false;
  // evt.preventDefault();
  // //log("touchcancel.");
  // var touches = evt.changedTouches;
  
  // for (var i = 0; i < touches.length; i++) {
  //   ongoingTouches.splice(i, 1); // remove it; we're done
  // }
}


function findPos (obj) {
    var curleft = 0,
        curtop = 0;

    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);

        return { x: curleft-document.body.scrollLeft, y: curtop-document.body.scrollTop };
    }
}

function ongoingTouchIndexById(idToFind) {
  for (var i = 0; i < ongoingTouches.length; i++) {
    var id = ongoingTouches[i].identifier;
    
    if (id == idToFind) {
      return i;
    }
  }
  return -1; // not found
}

function copyTouch(touch) {
  return {identifier: touch.identifier,clientX: touch.clientX,clientY: touch.clientY};
}

window.onload = function() {
  run();

  function run() {
    window.requestAnimFrame(calls);
    window.requestAnimFrame(run, 33);
  }
  resize();
};
