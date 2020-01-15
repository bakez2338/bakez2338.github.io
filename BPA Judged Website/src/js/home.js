var height = screen.availHeight();
var width = screen.availWidth();
function tick() {
    if (height < width) {
        document.getElementById("hometable").innerHTML = "<tbody><tr><!--Columns of the tables each containing a div with an image as the background, as well as some text to put on top of the image--><td><a class="divimagelink" href="./Green/index.html"><div id="green"><strong>The Ways We're Green</strong></div></a></td><td><a class="divimagelink" href="./Homes/index.html"><div id="homes"><strong>Find Homes</strong></div></a></td><td><a class="divimagelink" href="./About/index.html"><div id="about"><strong>Learn More About Us</strong></div></a></td></tr></tbody>"
    } else {
        
    }
}