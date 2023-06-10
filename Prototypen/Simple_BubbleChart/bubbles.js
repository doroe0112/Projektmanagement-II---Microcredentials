
t = [
    {"id": 1, "name": "C++", "semester":    [0.4, 2, 3, 4, 5, 6], "x": 80.0, "y": 80.0, "r": 30.0},
    {"id": 2, "name": "Python", "semester": [1.2, 2, 3, 4, 5, 6], "x": 120.0, "y": 120.0, "r": 40.0},
    {"id": 3, "name": "Java", "semester":   [3.2, 2, 3, 4, 5, 6], "x": 140.0, "y": 140.0, "r": 50.0},
    {"id": 4, "name": "Presi", "semester":  [1.9, 2, 3, 4, 5, 6], "x": 180, "y": 180, "r": 60.0},
    {"id": 5, "name": "Teamarbeit", "semester":    [2, 2, 3, 4, 5, 6], "x": 220, "y": 220, "r": 70.0},
    {"id": 6, "name": "Unix", "semester":    [2, 2, 3, 4, 5, 6], "x": 220, "y": 220, "r": 70.0},
    {"id": 7, "name": "OOP", "semester":    [2, 2, 3, 4, 5, 6], "x": 220, "y": 220, "r": 70.0},
    {"id": 8, "name": "Office", "semester":    [2, 2, 3, 4, 5, 6], "x": 220, "y": 220, "r": 70.0},
    {"id": 9, "name": "Ansible", "semester":    [2, 2, 3, 4, 5, 6], "x": 220, "y": 220, "r": 70.0},
    {"id": 10, "name": "Pipeline", "semester":    [2, 2, 3, 4, 5, 6], "x": 220, "y": 220, "r": 70.0},
    {"id": 11, "name": "SQL", "semester":    [2, 2, 3, 4, 5, 6], "x": 220, "y": 220, "r": 70.0},
    {"id": 12, "name": "REST", "semester":    [2, 2, 3, 4, 5, 6], "x": 220, "y": 220, "r": 70.0},
    {"id": 13, "name": "SCRUM", "semester":    [2, 2, 3, 4, 5, 6], "x": 220, "y": 220, "r": 70.0},
    {"id": 14, "name": "Caching", "semester":    [2, 2, 3, 4, 5, 6], "x": 220, "y": 220, "r": 70.0},
    {"id": 15, "name": "JS", "semester":    [2, 2, 3, 4, 5, 6], "x": 220, "y": 220, "r": 70.0},
    {"id": 16, "name": "Rust", "semester":    [2, 2, 3, 4, 5, 6], "x": 220, "y": 220, "r": 70.0},
    {"id": 17, "name": "Vim", "semester":    [2, 2, 3, 4, 5, 6], "x": 220, "y": 220, "r": 70.0},
    {"id": 18, "name": "Go", "semester":    [2, 2, 3, 4, 5, 6], "x": 220, "y": 220, "r": 70.0},
    {"id": 19, "name": "Git", "semester":    [2, 2, 3, 4, 5, 6], "x": 220, "y": 220, "r": 70.0},
    {"id": 20, "name": "Recursive", "semester":    [2, 2, 3, 4, 5, 6], "x": 220, "y": 220, "r": 70.0},
    {"id": 21, "name": "Haskell", "semester":    [2, 2, 3, 4, 5, 6], "x": 220, "y": 220, "r": 70.0},
]

function clearCanvas() {
    ctx.clearRect(0, 0, c.width, c.height);
}

function randomMinusPlus() {
    if ( Math.random() < 0.1 ) {
        return -1;
    } else {
        return 1;
    }
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function setPosCircles(nr) {

    for (i=0; i<t.length; i++) {
        t[i].x = c.width/2 + randomMinusPlus() * Math.random()*50;
        t[i].y = c.height/2 + randomMinusPlus() * Math.random()*50;
        //t[i].r = t[i].semester[nr]*50;
        t[i].r = random(25, 70);
    }
}

// This function changes position until movement is over 
2500
function changePosCircles() {
    for (i=0; i<t.length; i++) {
        for (j=0; j<t.length; j++) {
            
            xtrend = t[i].x - t[j].x
            ytrend = t[i].y - t[j].y
            d = (( xtrend )**2 + ( ytrend )**2)**0.5;
            
            //same circle
            if (d < 1.0) {
                continue
            }
            rg = t[i].r + t[j].r
            if ( d < rg ) {
                //document.getElementById("debug").innerHTML += "d: " + d + "<br>\n" + "rg: " + rg;
                t[j].x -= xtrend*0.1; //randomMinusPlus() *
                t[j].y -= ytrend*0.1;
                movement++;
            }

        }
    }
    drawBubbles()

    //console.log( movement )

    if (movement > 2500) {
        clearInterval(moveBubbles)
    }
}


function animatePos() {
    counter = 0;
    console.log("Movement:", movement, " Counter: ", counter);

    // Rufe Funktion alle 100ms wieder auf
    moveBubbles = setInterval(changePosCircles, 100)

    /*
    while ( movement < 100 && counter < 100) {
        //setInterval(changePosCircles, 1000);
        changePosCircles();
        counter++;
    }
    */

    console.log("Movement:", movement, " Counter: ", counter);
}



function test1() {
    movement++;
}

// Moves circles so many times till static result is reached
function changeToStaticPos() {
    change = 1;
    while ( change == 1 ) {
        change = 0;
        for (i=0; i<t.length; i++) {
            for (j=0; j<t.length; j++) {

                xtrend = t[i].x - t[j].x
                ytrend = t[i].y - t[j].y
                d = (( xtrend )**2 + ( ytrend )**2)**0.5;

                //same circle
                if (d < 1.0) {
                    continue
                }
                rg = t[i].r + t[j].r
                if ( d < rg ) {
                    //document.getElementById("debug").innerHTML += "d: " + d + "<br>\n" + "rg: " + rg;
                    t[j].x -= xtrend*0.1; //randomMinusPlus() *
                    t[j].y -= ytrend*0.1;
                    change = 1;
                }
            }
        }
    }
    drawBubbles()
}



function drawBubbles() {
    ctx.font = "12px Arial";

    clearCanvas()

    for (i=0; i<t.length; i++) {
        ctx.beginPath();
        ctx.fillText(t[i].name, t[i].x-t[i].r/2, t[i].y);
        ctx.arc(t[i].x, t[i].y, t[i].r, 0, 2*Math.PI);
        ctx.stroke();
    }
}


function increaseBubble(nr) {
    t[nr-1].r += 10;
}

function printaTable() {
    str1 = "<table border>\n"
    //header = ["Name"];
    str1 += "<tr>\n\t<td>ID</td>\n\t<td>Name</td>\n"
    // Create header
    for (i=1; i<=6; i++) {
        //header.push("Semester" +i);
        str1 += "\t<td>Semester " + i + "</td>\n"
    }

    str1 += "\n\t<td>X</td>\n\t<td>Y</td>\n"

    str1 += "</tr>\n"

    // Fill values
    
    for (i=0; i<t.length; i++) {
        str1 += "<tr>\n"
        
        str1 += "\t<td>"+ t[i].id +"</td>\n"
        str1 += "\t<td>"+ t[i].name +"</td>\n"

        for (j=0; j<6; j++) {
            str1 += "\t<td>"+ t[i].semester[j] +"</td>\n"
        }
        
        str1 += "\t<td>"+ t[i].x +"</td>\n"
        str1 += "\t<td>"+ t[i].y +"</td>\n"

        str1 += "</tr>\n"
    }
    


    str1 += "</table>"
    document.getElementById("p1").innerHTML = str1;
    //return str1;
  }

  function printLinks() {
    list1 = []
    for(i=0; i<t.length; i++) {
        list1.push('<button class="btn btn-secondary mb-2" id="b'+ t[i].id.toString() +'" onclick="increaseBubble('+ t[i].id.toString() +')">'+ t[i].name +'</button>')
    }

    document.getElementById("skillLinks").innerHTML = list1.join("\n");
  }

