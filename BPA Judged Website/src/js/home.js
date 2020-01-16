var lh = 0;
var lw = 0;
function tick() {
    if (lh != document.body.clientHeight || lw != window.innerWidth) {
        if (document.body.clientHeight < window.innerWidth) {
            document.getElementById("hometable").innerHTML = '<tbody class="landscape"><tr><!--Columns of the tables each containing a div with an image as the background, as well as some text to put on top of the image--><td><a class="divimagelink" href="./Green/index.html"><div id="green"><strong>The Ways We\'re Green</strong></div></a></td><td><a class="divimagelink" href="./Homes/index.html"><div id="homes"><strong>Find Homes</strong></div></a></td><td><a class="divimagelink" href="./About/index.html"><div id="about"><strong>Learn More About Us</strong></div></a></td></tr></tbody>'
        } else {
            document.getElementById("hometable").innerHTML = '<tbody class="portrait"><tr><td><a class="divimagelink" href="./Green/index.html"><div id="green"><strong>The Ways We\'re Green</strong></div></a></td></tr><tr><td><a class="divimagelink" href="./Homes/index.html"><div id="homes"><strong>Find Homes</strong></div></a></td></tr><tr><td><a class="divimagelink" href="./About/index.html"><div id="about"><strong>Learn More About Us</strong></div></a></td></tr></tbody>';
        }
        lh = document.body.clientHeight;
        lw = window.innerWidth;
    }
}
function start() {
    setInterval(tick, 100);
}