const container = document.getElementById('container');
const injection = document.getElementById('injection');
const pointsDiv = document.getElementById('pointsDiv');


let gameSound = document.createElement("audio");
gameSound.src = './sounds/begin.mp3';

gameSound.setAttribute("loop", "true")
container.append(gameSound);
gameSound.play();

let bulletSound = document.createElement("audio")
bulletSound.src = './sounds/bullet.wav'

container.append(bulletSound)

let explosionSound = document.createElement("audio")
explosionSound.src = './sounds/explosion.wav'

container.append(explosionSound)

container.addEventListener('mousemove', function (e) {
    injection.style.left = (e.clientX - 12) + 'px'


});
container.addEventListener('click', function (e) {
    bulletSound.pause();
    bulletSound.currentTime = 0;
    bulletSound.play();
    const bulletDiv = document.createElement('div')
    bulletDiv.classList.add('bullet');
    bulletDiv.style.left = e.clientX + 'px';
    container.append(bulletDiv);
    let bottom = 102;
    let containerHeight = container.offsetHeight
    const interval = setInterval(function () {
        
        if (bottom < containerHeight) {
            bottom += 25;
            bulletDiv.style.bottom = bottom + 'px';
            explode(bulletDiv, interval);
        } else {
            clearInterval(interval);
            container.removeChild(bulletDiv)
        }

    }, 50)


});
const coranaArr = [];

setInterval(function () {
    let containerWidth = container.offsetWidth;
    let coronaLeft = Math.floor(Math.random() * (containerWidth - 100)) + 1;
    const coronaDiv = document.createElement('div');
    coronaDiv.classList.add('corona');
    coronaDiv.style.left = coronaLeft + 'px';
    container.append(coronaDiv);
    coranaArr.push({
        coronaDiv,
        top: 0
    })

}, 1000)

setInterval(() => {
    let containerHeight = container.offsetHeight
    coranaArr.forEach((coronaObj, idx) => {
        if(coronaObj.top <  containerHeight) {
            coronaObj.top += 10;
        coronaObj.coronaDiv.style.top = coronaObj.top +'px'
        } else {
            container.removeChild(coronaObj.coronaDiv)
            coranaArr.splice(idx, 1);
        }        
    })
}, 100);

let points = 0;
function explode(bulletElement, interval){
    coranaArr.forEach((corona, idx) => {
        if (is_colliding(bulletElement, corona.coronaDiv)) {
            explosionSound.pause();
            explosionSound.currentTime = 0;
            explosionSound.play();
            clearInterval(interval);
            bulletElement.parentNode.removeChild(bulletElement);
            corona.coronaDiv.parentNode.removeChild(corona.coronaDiv)
            coranaArr.splice(idx, 1);
            points++;
            pointsDiv.innerHTML ='Killed Viruses: ' + points;
        }
    })
}

// https://gist.github.com/shaal/bf5c3f95aefdf43ee32fe6475a3a14bf
var is_colliding = function( $div1, $div2 ) {
	// Div 1 data
	//var d1_offset             = $div1.offset();
	var d1_height             = $div1.offsetHeight;
	var d1_width              = $div1.offsetWidth;
	var d1_distance_from_top  = $div1.offsettop + d1_height;
	var d1_distance_from_left = $div1.offsetLeft + d1_width;

	// Div 2 data
	//var d2_offset             = $div2.offset();
	var d2_height             = $div2.offsetHeight;
	var d2_width              = $div2.offsetWidth;
	var d2_distance_from_top  = $div2.offsetTop + d2_height;
	var d2_distance_from_left = $div2.offsetLeft + d2_width;

	var not_colliding = ( d1_distance_from_top < $div2.offsetTop || $div1.offsetTop > d2_distance_from_top || d1_distance_from_left < $div2.offsetLeft || $div1.offsetLeft > d2_distance_from_left );

	// Return whether it IS colliding
	return ! not_colliding;
};