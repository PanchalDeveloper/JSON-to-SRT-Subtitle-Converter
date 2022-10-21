let Subtitles = new Array;
function initializer() {
    let inputTxt = document.getElementById("inputTxt"),
        cnvrtBtn = document.getElementById("cnvrtBtn"),
        mainArea = document.getElementById("mainArea"),
        mainAreaTxt = "";

    // Running a funtion when clicking on the "Convert" button

    cnvrtBtn.addEventListener("click", function () {
        if (inputTxt.value != "") {

            Subtitles = [];

            // Getting values from the input TextArea Box as Objects

            let inArray = inputTxt.value.replace(/\s+|\ +/g,'').replace(/},{|},\n{|}\n,{/gm, "} , {").split(/ , /);

            inArray.forEach(elem => {
                Subtitles.push(JSON.parse(elem));
            });

            // console.log(Subtitles);

            convert();
        }
        else {
            mainArea.innerHTML = `Please Enter Valid JSON Subtitles <br /><a onclick="location.reload()">Click Here</a> to try again.`;
        }
    });

    // The main function for sub conversion

    function convert() {

        let index, timeFrom, timeTo, timeStamps = "", dialogue, pharse;

        // Running a loop to get all array items

        for (let key in Subtitles) {
            index = (Math.floor(key) + 1);

            pharse = Subtitles[key].content;

            //pharse = pharse.replace(/"/gm, "");
            pharse = pharse.replace(/(\\r|\r|\n|\\n)/g, "<br> ");

            dialogue = pharse;
            timeFrom = Subtitles[key].from;
            timeTo = Subtitles[key].to;

            timeStamps = calcTime(timeFrom) + " --> " + calcTime(timeTo);

            console.log(key + "\n" + pharse + "\n" + timeStamps);

            mainAreaTxt += index + "<br/>" +
                timeStamps + "<br/>" +
                dialogue + "<br/><br/>";
        }

        // for ease you can also use this loop like :-

        /*
        for (let i = 0; i < Subtitles.length; i++) {

            index = (i + 1);
            
            pharse = JSON.stringify(Subtitles[i].content);
            pharse = pharse.replace(/"/gm, "");
            
            pharse = pharse.replace(/(\\r|\r|\n|\\n)/g, "<br> ");
            dialogue = pharse;
            
            timeFrom = Subtitles[i].from;
            timeTo = Subtitles[i].to;
    
            timeStamps = calcTime(timeFrom) + " --> " + calcTime(timeTo);
            
            mainAreaTxt += index + "<br/>" +
            timeStamps + "<br/>" +
            dialogue + "<br/><br/>";
        }
        */

        // Creating Action Buttons and the Output Area within the Main Output Area

        mainArea.innerHTML = `<div class="optBtns flex fsa">
                            <input class="froboto " id="copyIt" type="button" value="Copy it">
                            <input class="froboto" type="button" value="Clear it"  id="clearIt">
                            </div>`
            +
            `<div class="optTxt">` + mainAreaTxt + `</div>`;

        let copyIt = document.querySelector("#copyIt");
        copyIt.addEventListener("click", CopyTxt, false);
        clearIt.addEventListener("click", function () {
            location.reload();
        });
    }

}
// A function for calculaing the time period for dialogue

function calcTime(time) {
    let FullTime = {
        // Getting Hours from Seconds
        hours: time / (60 * 60),
        // Getting remaining Minutes from Hours
        minutes: function () {
            return ((this.hours * 60) - parseInt(this.hours) * 60);
        },
        // Getting remaining Seconds from Minutes
        seconds: function () {
            return ((this.minutes() * 60) - parseInt(this.minutes()) * 60);
        },
        // Getting remaining MilliSeconds from Seconds
        milliSeconds: function () {
            return ((this.seconds() * 1000) - parseInt(this.seconds()) * 1000);
        }
    }
    let i = fullDigits(Math.floor(FullTime.hours), 2) + ":" +
        fullDigits(Math.floor(FullTime.minutes()), 2) + ":" +
        fullDigits(Math.floor(FullTime.seconds()), 2) + "," +
        fullDigits(Math.floor(FullTime.milliSeconds()), 3);
    return i;

}

// A function to copy the DIV text

function CopyTxt() {


    let OptText = mainArea.innerText;
    let optTxt = document.querySelector(".optTxt");

    // creating an hiden inbput-box to put output in it so we can copy it later (here cta means copyTextArea)

    const cta = document.createElement("textarea");

    // Setting Attribute values

    setAttributes(cta, {
        "id": "CTA",
        "style": "visibility: none; min-height:50px;"
    });

    // Or we can set it in a normal way to

    /*
    cta.setAttribute("style", "display:none,height:15px;");
    cta.setAttribute("id", "CTA");
 
    or
 
    Object.assign(cta,{id: "CTA",
                       style: "visibility: none; min-height:50px;"})
    */

    cta.value = OptText;
    // console.log(cta);    

    // Adding cta Element to the Document (it is not Necessary)

    // mainArea.appendChild(cta);

    cta.select();
    cta.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(cta.value);
    optTxt.innerHTML = "The text has been Copied to your clipboard.";
    optTxt.style.marginTop = "45vh"
}

// A function to Set Multipule Attributes at once in JS

function setAttributes(elem, attrs) {
    for (var key in attrs) {
        elem.setAttribute(key, attrs[key]);
    }
}

// Adding needed "0" before Digits

function fullDigits(i, lnth) {
    if (i.toString().length < lnth) {
        while (i.toString().length < lnth) {
            i = "0" + i;
        }
        return i;
    }
    else { return i; }
}

// Run the 'initializer()' function when page loads

window.onload = initializer;