Img ="";
status2 = "";
objects = [];

function preload(){
    alarm = loadSound("alarm.wav");
}
function setup(){
    Canvas = createCanvas(380,380);
    Canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
}
function draw(){
    image(video,0,0,380,380);
    if(status2 != ""){
        objectDetector.detect(video,gotposes);
        for(i= 0;i< objects.length;i++){
            r = random(255);
            g = random(255);
            b = random(255);
            document.getElementById("status").innerHTML = "Status: Object detected";
            
        fill(r,g,b);
        textSize(20);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label+ " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height); 
        if(objects[i].label == "person"){
            document.getElementById("Baby").innerHTML = "Baby is found";
            alarm.stop();
        }
        else{
            document.getElementById("Baby").innerHTML = "Baby is not detected";
            alarm.play();
        }
        /*if(objects.length > 0){
            document.getElementById("Baby").innerHTML = "Baby is not detected";
            alarm.play();
        }*/
        }
        
        
    }
    

  
}
function modelLoaded(){
    console.log("ModelLoaded");
    status2 = true;
   
}
function gotposes(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}