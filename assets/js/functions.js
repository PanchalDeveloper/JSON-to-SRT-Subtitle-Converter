function initializer() {
    const inputTxt = document.getElementById("inputTxt"),
        cnvrtBtn = document.getElementById("cnvrtBtn"),
        mainArea = document.getElementById("mainArea");
    let mainAreaTxt = "";
    Subtitles = [];

    // Running a funtion when clicking on the "Convert" button

    cnvrtBtn.addEventListener("click", () => {
        if (inputTxt.value != "") {
            // Getting values from the input TextArea Box as Objects

            try {
                let inputArr = inputTxt.value.replace(/\s+|\ +/g, ' ').replace(/}[\s\n]*,[\s\n]*/g, "}@newline").split(/@newline/);

                inputArr.forEach(elem => {
                    try {
                        Subtitles.push(JSON.parse(elem));
                    } catch {
                        console.log(`Error occured while converting :- ${elem}`);
                    }
                });

                convertFormat();
            }

            catch (error) {
                // Uncomment it to for Debugging

                // const viewErr = confirm("Your Subtitles does not have the correct syntex ! Please Correct it first or Use diffrent Subtitles.\n\n\t Wanna Check The Problem !?");
                // if (viewErr) { alert(`Error :-\n\n\t\t ${error.message}`); console.log(error.stack); }
            }
        }
        else {
            mainArea.innerHTML = `Please Enter Valid JSON Subtitles <br /><a onclick="location.reload()" class='link'>Click Here</a> to try again.`;
        }
    });

    // The main function for sub conversion

    function convertFormat() {

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

        // Creating Action Buttons and the Output Area within the Main Output Area

        mainArea.innerHTML = `<div class="optArea">
                            <div class="optBtns sticky flex flex-SA flex-wrap mx-auto min-w-fit b-t-1">
                            <input class="froboto m-2 f-weight-5" id="copyIt" type="button" value="Copy it" title="Copy coverted subtitles.">
                            <input class="froboto  m-2 f-weight-5" type="button" value="Clear it"  id="clearIt" title="Clear coverted subtitles.">
                            </div>`
            +
            `<div class="optTxt mx-2 my-4 py-3">` + mainAreaTxt + `</div></div>`;

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
    let i = getFullLength(Math.floor(FullTime.hours), 2) + ":" +
        getFullLength(Math.floor(FullTime.minutes()), 2) + ":" +
        getFullLength(Math.floor(FullTime.seconds()), 2) + "," +
        getFullLength(Math.floor(FullTime.milliSeconds()), 3);
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
    optTxt.innerHTML = "<p class='text-center w-100 my-3'>The text has been Copied to your clipboard.</p>";
}

// Check for Device Width
function deviceWidthCheck() {
    let windowWidth = window.innerWidth;
    const navbarMenuList = document.getElementById('navbarMenuList');
    const navMenuBtn = document.getElementById('navMenuBtn');

    if (windowWidth <= 991) {
        classEdit(navbarMenuList, "add", "hidden");
        classEdit(navbarMenuList, "remove", "show");
        classEdit(navMenuBtn, "remove", "lni-close");
        classEdit(navMenuBtn, "add", "lni-menu");
    }
    else {
        classEdit(navbarMenuList, "add", "show");
        classEdit(navbarMenuList, "remove", "hidden");
    }
}

// Scroll To Given element
function jumpTo(elem) {
    let Elem = document.getElementById(elem.id);
    let position = { top: Elem.offsetTop, left: Elem.offsetLeft, }
    setTimeout(scrollNow, 300);

    function scrollNow() {
        winScroll(x = position.left, y = position.top);
    }
}

// Hide Element when Window Y-axis scroll is greater than given value
function hideOnWinScroll(elem, val) {
    if (window.scrollY > val) {
        elem.style.visibility = "visible";
        elem.style.opacity = "1";
    }
    if (window.scrollY <= val) {
        elem.style.visibility = "hidden";
        elem.style.opacity = "0";
    }
}

// Replace Classes with Given Classes
function changeClasses(elem_id, classSet_1, classSet_2) {

    const iconBtn = document.getElementById(elem_id);
    let newClassArr_1 = classSet_1.split(" "),
        newClassArr_2 = classSet_2.split(" ");

    if (newClassArr_1[0] && newClassArr_2[0]) {
        newClassArr_2.forEach((_class) => {
            iconBtn.classList.toggle(_class);
        });

        newClassArr_1.forEach((_class) => {
            iconBtn.classList.toggle(_class);
        });
    }

}

// Shortand function for Adding/Removing classes in an element 
function classEdit(elem, methode_ = "add", classes = '') {
    if (methode_ == "add") {
        classes.split(' ').forEach((_class) => { elem.classList.add(_class) });
    }
    if (methode_ == "remove") {
        classes.split(' ').forEach((_class) => { elem.classList.remove(_class) });
    }
}

// A function to Set Multipule Attributes at once

function setAttributes(elem, attrs) {
    for (var key in attrs) {
        elem.setAttribute(key, attrs[key]);
    }
}

// Format Date & Time String
const dtFormat = new Intl.DateTimeFormat('default', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
});

// Adding needed numbers of "0" before Digits

function getFullLength(i, lnth) {
    while (i.toString().length < lnth) {
        i = "0" + i;
    }
    return i;
}
