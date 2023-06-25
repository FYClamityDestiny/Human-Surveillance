img = '';
statuse = "";
objects = [];
function preload() {
    music = loadSound("babymusic.mp3");
}

function setup() {
    myCanvas = createCanvas(380, 380);
    myCanvas.center();
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
}
function modelLoaded() {
    console.log("Model Loaded!");
    statuse = true;
}
function draw() {
    image(video, 0, 0, 380, 380);
    if (statuse != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectdetector.detect(video,gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status:Baby Detected";
                fill(r, g, b);
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + ":" + percent + "%", objects[i].x + 10, objects[i].y + 10);
                noFill();
                stroke(r, g, b);
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == "person") {
                music.stop();
                document.getElementById("number_of_objects").innerHTML =  "Baby is detected";
              
            }
            else{
                document.getElementById("status").innerHTML = "Status:Baby not Detected";
                music.play();
            }
        }
            if(objects.length == 0){
                document.getElementById("number_of_objects").innerHTML = "Baby not Detected";
                music.play();
            }
        }
    }


function gotResult(error, results) {
    if (error) {
        console.error();
    }
    else {
        console.log(results);
        objects = results;
    }
}
function start() {
    ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}