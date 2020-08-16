const container = document.getElementById('container');
const injection = document.getElementById('injection');
const pointsDiv = document.getElementById('pointsDiv');



let bulletSound = document.createElement("audio")
bulletSound.src = '/sounds/bullet.wav'
bulletSound.setAttribute("preload", "auto")
bulletSound.setAttribute("controls", "none")
bulletSound.style.display = "none"
  container.append(bulletSound)

let explosionSound = document.createElement("audio")
explosionSound.src = '/sounds/explosion.wav'
explosionSound.setAttribute("preload", "auto")
explosionSound.setAttribute("controls", "none")
explosionSound.style.display = "none"
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
        coronaElement: coronaDiv,
        top: 0,
        left: coronaLeft
    })

}, 1000)

setInterval(() => {
    let containerHeight = container.offsetHeight
    coranaArr.forEach((coronaObj, idx) => {
        if(coronaObj.top <  containerHeight) {
            coronaObj.top += 10;
        coronaObj.coronaElement.style.top = coronaObj.top +'px'
        } else {
            container.removeChild(coronaObj.coronaElement)
            coranaArr.splice(idx, 1);
        }        
    })
}, 100);

let points = 0;
function explode(bulletElement, interval){
    coranaArr.forEach((corona, idx) => {
        if (is_colliding(bulletElement, corona.coronaElement)) {
            explosionSound.pause();
            explosionSound.currentTime = 0;
            explosionSound.play();
            clearInterval(interval)
            bulletElement.parentNode.removeChild(bulletElement);
            corona.coronaElement.parentNode.removeChild(corona.coronaElement)
            coranaArr.splice(idx, 1);
            points++;
            pointsDiv.innerHTML ='Killed Viruses: ' + points;
        }
    })
}

var is_colliding = function( $div1, $div2 ) {
	var d1_height             = $div1.offsetHeight;
	var d1_width              = $div1.offsetWidth;
	var d1_distance_from_top  = $div1.offsettop + d1_height;
	var d1_distance_from_left = $div1.offsetLeft + d1_width;

	var d2_height             = $div2.offsetHeight;
	var d2_width              = $div2.offsetWidth;
	var d2_distance_from_top  = $div2.offsetTop + d2_height;
	var d2_distance_from_left = $div2.offsetLeft + d2_width;

	var not_colliding = ( d1_distance_from_top < $div2.offsetTop || $div1.offsetTop > d2_distance_from_top || d1_distance_from_left < $div2.offsetLeft || $div1.offsetLeft > d2_distance_from_left );

	return ! not_colliding;
};