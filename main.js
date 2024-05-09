Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');


function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="capcture_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Vm5YkaPcU/',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The prediction is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "Proper Mask")
        {
            document.getElementById("update_gesture").innerHTML = "&#128567;";
        }
        if(results[0].label == "Improper Mask")
        {
            document.getElementById("update_gesture").innerHTML = "&#129319;";
        }
        if(results[0].label == "No Mask")
        {
            document.getElementById("update_gesture").innerHTML = "&#129298;";
        }
    }
}

