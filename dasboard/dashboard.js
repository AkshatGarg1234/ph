let availSlot = 120;
let totalCars = 0;
let revenue=0;

function update() {
    document.getElementById("availableSlot").innerText = availSlot;
    document.getElementById("totalCars").innerText = totalCars;
    document.getElementById("revenue").innerText=revenue;
}

function timeToSeconds(hours, minutes, seconds) {
    return hours * 3600 + minutes * 60 + seconds;
}

update();

function removeSlotCard(event) {
    const slotCard = event.target.closest(".slotCard");
    if (slotCard) {
        const selection = slotCard.querySelector(".availability");
        const selectedValue = selection.value;

        if ((selectedValue === "occupied" || selectedValue === "reserved") && availSlot < 120) {
            availSlot++;
        }
        if(selectedValue==='occupied'){
            let leavingTime=new Date();
            let lhours = leavingTime.getHours();
            let lminutes = leavingTime.getMinutes();
            let lseconds = leavingTime.getSeconds();
            let checkinTime = slotCard.dataset.checkinTime.split(":").map(Number);
            let time1Seconds = timeToSeconds(checkinTime[0], checkinTime[1], checkinTime[2]);
            let time2Seconds = timeToSeconds(lhours, lminutes, lseconds);
            let differenceInSeconds = time2Seconds - time1Seconds;
            revenue+=differenceInSeconds*1;
            update();
        }

        slotCard.remove();
        update();
    }
}

const modal = document.getElementById("modalContainer");
const save = document.getElementById("save");
const add = document.getElementById("add");
const slots = document.querySelector(".slots");
const closed=document.getElementById("close");

add.addEventListener("click", function() {
    modal.style.display = "block";
});

save.addEventListener("click", function() {
    var slotName = document.getElementById("slotName").value;
    var namee = document.getElementById("name").value;
    var vNumber = document.getElementById("vNumber").value;
    var cDetails = document.getElementById("cDetails").value;
    var request = document.getElementById("request").value;
    var checkinTime;
    modal.style.display = "none";

    const el = document.createElement("div");
    el.classList.add("slotCard");
    el.innerHTML = `    
        <div class="details">
            <p>Slot: ${slotName}</p>
            <p>Name: ${namee}</p>
            <p>Car details: ${cDetails}</p>
            <p>Car Number: ${vNumber}</p>
            <p>Colour: ${request}</p>
            <p id="checkInTime">CheckIn Time: </p>
            <select name="availability" class="availability">
                <option value="select">Select</option>
                <option value="occupied">Occupied</option>
                <option value="reserved">Reserved</option>
            </select>
            <br>
            <button class="remove">X</button>
        </div>
    `;
    document.getElementById("slotName").value = "";
    document.getElementById("name").value = "";
    document.getElementById("vNumber").value = "";
    document.getElementById("cDetails").value = "";
    document.getElementById("request").value = "";


    const releaseButton = el.querySelector(".remove");
    releaseButton.addEventListener("click", function() {
        if(selectedValue==='occupied'){
        el.dataset.checkinTime = `${Chours}:${Cminutes}:${Cseconds}`;
        removeSlotCard(event);
        }
        else{
            removeSlotCard(event);
        }
    });
    

    const selection = el.querySelector(".availability");
    prevValue = selection.value;
    selection.addEventListener("change", function() { 
        selectedValue = selection.value;
        if (prevValue === 'select' && selectedValue === 'occupied') {
            availSlot--;
            totalCars++;
            let checkTime=new Date().toLocaleTimeString("en-IN");
            let checkinTime=new Date();
            Chours = checkinTime.getHours();
            Cminutes = checkinTime.getMinutes();
            Cseconds = checkinTime.getSeconds();
            el.querySelector("#checkInTime").innerText="Checkin time: "+checkTime;
            el.querySelector(".availability").style.backgroundColor="#33B864";
            update();
        } else if (prevValue === 'select' && selectedValue === 'reserved') {
            el.querySelector(".availability").style.backgroundColor ="#FFDB58";
            revenue+=10;
            availSlot--;
            update();
        } else if (prevValue === 'occupied' && selectedValue === 'select') {
            availSlot++;
            el.querySelector(".availability").style.backgroundColor="grey";
            update();
        } else if (prevValue === 'reserved' && selectedValue === 'select') {
            availSlot++;
            el.querySelector(".availability").style.backgroundColor="grey";
            update();
        }
        else if(prevValue==='reserved' && selectedValue==='occupied'){
            totalCars++;
            el.querySelector(".availability").style.backgroundColor="#33B864";
            update();
            let checkTime=new Date().toLocaleTimeString("en-IN");
            let checkinTime=new Date();
            Chours = checkinTime.getHours();
            Cminutes = checkinTime.getMinutes();
            Cseconds = checkinTime.getSeconds();
            el.querySelector("#checkInTime").innerText="Checkin time: "+checkTime;
        }
        prevValue = selectedValue;
    });

    slots.appendChild(el);
});

closed.addEventListener("click",function(){
    document.getElementById("slotName").value = "";
    document.getElementById("name").value = "";
    document.getElementById("vNumber").value = "";
    document.getElementById("cDetails").value = "";
    document.getElementById("request").value = "";

    modal.style.display = "none";
})