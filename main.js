video = ""
status = ""
objects = []
objects_name = ""
function setup() {
    video = createCapture(VIDEO);
    video.hide()
    canvas = createCanvas(500, 400)
    canvas.center()
}

function draw() {
    image(video, 0, 0, 500, 400)

    if (status != "") {
        objectDetector.detect(video, gotResult)

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected"

            fill("#FF0000")
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15)
            noFill()
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)

            if (objects[i].label == objects_name) {
                objectDetector.detect(video, gotResult)
                document.getElementById("number_of_objects").innerHTML = "Status: Objects Found"
                synth = window.speechSynthesis
                utterThis = new SpeechSynthesisUtterance(objects_name + "found")
                synth.speak(utterThis)

                
            }

            else{
                console.log("error")
                document.getElementById("number_of_objects").innerHTML = "Status: Objects Not Detected"
            }
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
    objects_name = document.getElementById("object_names").value
}

function modelLoaded() {
    console.log(modelLoaded)
    status = true
}

function gotResult(error, results) {
    if (error) {
        console.log(error)
    }

    else {
        console.log(results)
        objects = results
    }
}