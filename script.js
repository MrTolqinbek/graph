const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const b = document.getElementById('b')
const btn = document.querySelector('button')
const f = document.getElementById('func')
const R = 1000
canvas.width = R
canvas.height = R
let is = false
context.translate(R / 2, R / 2)
context.beginPath();
context.moveTo(-R / 2, 0);
context.lineTo(R / 2, 0);
context.lineWidth = 3;
context.strokeStyle = 'blue';
context.stroke();
context.closePath();

context.beginPath();
context.moveTo(0, -R / 2);
context.lineTo(0, R / 2);
context.lineWidth = 3;
context.strokeStyle = 'blue';
context.stroke();
context.closePath();
canvas.style.height = Math.min(window.innerWidth-250,window.innerHeight) +'px'
canvas.style.width = Math.min(window.innerWidth-250,window.innerHeight) +'px'
window.onresize = (e)=>{
console.log(e)
canvas.style.height = Math.min(e.currentTarget.innerWidth-250,e.currentTarget.innerHeight) +'px'
canvas.style.width = Math.min(e.currentTarget.innerWidth-250,e.currentTarget.innerHeight) +'px'
}

window.onmousemove = (e)=>{
 if(is){
let x = e.clientX - canvas.getBoundingClientRect().x
let y = e.clientY - canvas.getBoundingClientRect().y
draw()
let fs = f.value
let ratioX2 = 2 * (+b.value) / R
let mx = max(fs, ratioX2)
let ratioY = 2 * mx / R
let ratioX = canvas.getBoundingClientRect().width/(R)
let ratioY2 = canvas.getBoundingClientRect().height/(R)

context.beginPath();
context.arc((x-canvas.getBoundingClientRect().width/2)/ratioX,-func(fs,((x-canvas.getBoundingClientRect().width/2)/ratioX)*ratioX2)/ratioY , 10,0, Math.PI*2);


context.lineWidth = 3;
context.strokeStyle = 'blue';
context.stroke();
context.closePath();


 }
}
btn.addEventListener('click', () => {
    is = true
   draw()

})



function func(f, x) {

    return +eval(replacer(f).replace(/x/g, x))
}

function replacer(f) {
    f = f.replace(/asin|acos|atan|sin|cos|exp|tan|tanh|sqrt|pow|abs|log10|log2|log/g, (a) => {
        return "Math." + a
    })

    return f

}


function max(f, ratioX) {
    let a = -Infinity
    for (let i = -R / 2; i < R / 2; i++) {
        const o = Math.abs(+func(f, i * ratioX))
        if (o > a) {
            a = o
        }
    }
    return a
}



function draw(){

    context.clearRect(-R/2, -R/2,R,R);
   
    context.beginPath();
    context.moveTo(-R / 2, 0);
    context.lineTo(R / 2, 0);
    context.lineWidth = 3;
    context.strokeStyle = 'blue';
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(0, -R / 2);
    context.lineTo(0, R / 2);
    context.lineWidth = 3;
    context.strokeStyle = 'blue';
    context.stroke();
    context.closePath();


    context.beginPath();
    context.strokeStyle='rgb(19,11,221)';
    
    let fs = f.value
    let ratioX = 2 * (+b.value) / R
    let mx = max(fs, ratioX)
    let ratioY = 2 * mx / R
    context.moveTo(-R / 2, -func(fs, (-R/2)* ratioX) / ratioY);
    for (let i = -R / 2; i <= R / 2; i++) {
        context.lineTo(i, -func(fs, i * ratioX) / ratioY);
    }

    context.stroke();
    context.closePath();

}