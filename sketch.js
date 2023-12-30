let capture;
let posenet;
let singlePose;
let skeleton;
let sunglasses;
let thug_cap;
let cigar;

function setup(){
    createCanvas(1000,1000);
    capture = createCapture(VIDEO);
    capture.hide();

    posenet = ml5.poseNet(capture,modelLoded);
    posenet.on('pose',receivedPoses);

    sunglasses = loadImage('images/sunglasses.png');
    thug_cap = loadImage('images/thug_cap.png');
    cigar = loadImage('images/cigar.png');
}

function receivedPoses(poses){
    console.log(poses);
    if(poses.length>0){
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }

}

function modelLoded(){
    console.log('Model has loaded');
}

function draw(){
    image(capture,0,0);

    if(singlePose){
        fill(255,0,0);
        
        for(let i=0; i<singlePose.keypoints.length; i++){
            ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y,10,10); 
        }

        stroke(255,255,255);
        strokeWeight(5);
        for(let j=0; j<skeleton.length;j++){
            line(skeleton[j][0].position.x,skeleton[j][0].position.y,skeleton[j][1].position.x,skeleton[j][1].position.y);
        }

        image(thug_cap, singlePose.nose.x-30, singlePose.nose.y-75, 55,55);
        image(sunglasses, singlePose.nose.x-20, singlePose.nose.y-30, 45,45);
        image(cigar, singlePose.nose.x , singlePose.nose.y+8, 15,10);
    }
    

}
