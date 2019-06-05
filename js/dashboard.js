// dashboard.js
// Javascript for the dashboard

// users array of the user icon in the top right corner
var users = document.getElementsByClassName("users");

// grabbing all the available project cards
var cards = document.getElementsByClassName("card");

// main element where the new projects will be appended.
var main = document.getElementById("main");

// where the projects will be appended when they are dragged over the button history.
var historyProject = document.getElementById("historyProject");

// activity container
var ActivityEl = document.getElementById("activityContainer");

var btnHistory = document.getElementById("btnHistory");
var sibBtnHistory = document.getElementById("sibBtnHistory");
var btnHistoryIcon = document.getElementById("btnHistoryIcon");
var containerHistory = document.getElementById("containerHistory");

var cardDisposal = document.getElementById("cardDisposal");

// makes the elements draggable
for (var i=0; i<users.length; i++) {
    users[i].setAttribute("draggable", true);
}

//--* GLOBAL variables *--

// references to the ID of card and user
var cardId;
var userId;

// array for alle Acitivity loggene
const activityLogEntries = [];

// putting id's on the users
for(var i =0; i<users.length; i++){
    users[i].addEventListener("dragstart", e => {
        userId = e.target.id;
    });
}


let newProjectBtn = document.getElementById("btnCreateCard");

newProjectBtn.addEventListener("click", AddProject);

var projects =[];
var counterProject = 0;
var counterUser = 0;

function AddProject(){
    let newProjectObj = {
        name: prompt("name"),
        info: prompt("info"),
        elementId: "",
        users: []
    }
    projects.push(newProjectObj);
    PrintOutActivityLog("cardAdded", newProjectObj.name);
    
    
    RenderProject(projects[projects.length-1]);
}

// function thats runs when creating project from the "create" button
function RenderProject(project){
    var createArticle = document.createElement("ARTICLE");
    var createDiv = document.createElement("DIV");
    var createH3 = document.createElement("H3");
    var createP = document.createElement("P");
    var createBtn = document.createElement("button");
    var createLink = document.createElement("a");
    
    createArticle.className = "cm-card cm-shadow-wb";
    createDiv.className = "cm-text";
    createBtn.className = "cm-button";
    
    createArticle.id = "project" + counterProject;
    project.elementId = createArticle.id;
    counterProject++;
    
    createH3.innerText = project.name;
    createP.innerText = project.info;
    createLink.innerText = "Enter";
    
    main.appendChild(createArticle);
    createArticle.appendChild(createDiv);
    createDiv.appendChild(createH3);
    createDiv.appendChild(createP);
    createDiv.appendChild(createBtn);
    createBtn.appendChild(createLink); 
    
    var cardList = [];
    
    createArticle.addEventListener("drop", e => {
        for(var i=0; i<projects.length; i++) {
            if (userId === "") {break;}
            if (projects[i].elementId === cardId && !projects[i].users.includes(userId)) {
                projects[i].users.push(userId);
                let user = document.getElementById(userId);
                let card = document.getElementById(cardId);
                let cln = user.cloneNode(true);
                card.appendChild(cln);
                PrintOutActivityLog("addedUser", userId, projects[i].name);
                userId = "";
                break;
            } 
        }
    });
    
    createArticle.addEventListener("dragover", e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        cardId = e.target.id;
    });
    
    createLink.setAttribute("href", "project.html");
    
    createArticle.setAttribute("draggable", true);
    
    createArticle.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", e.target.id);
    });
}

// Adding projects to history
btnHistory.addEventListener("dragover", e=> {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
});

sibBtnHistory.addEventListener("drop", e=> {
    e.preventDefault();
    var projectData = e.dataTransfer.getData("text/plain");
    var card = document.getElementById(projectData);
    historyProject.appendChild(card);
});

// remove projects
cardDisposal.addEventListener("dragover", e=> {
    e.preventDefault();
});

cardDisposal.addEventListener("drop", e=> {
    var id = e.dataTransfer.getData("text/plain");
    var element = document.getElementById(id);
    for(var i=0; i<projects.length; i++) {
        if(projects[i].elementId.includes(id)) {
            PrintOutActivityLog("cardRemoved", projects[i].name);
            element.parentNode.removeChild(element);
            projects.splice(i, 1);
            break;
        } else {
            var project = document.getElementById(projects[i].elementId);
            for(var j=0; j<project.childElementCount; j++) {
                var elements = project.children;
                if(elements[j].id === id) {
                    elements[j].parentElement.removeChild(elements[j]);
                    projects[i].users.splice(projects[i].users.indexOf(id), 1);
                    PrintOutActivityLog("userRemoved", id, projects[i].name);
                    break;
                }
            }
        }
    }
});

// logging events activity log
function PrintOutActivityLog(handling, item1, item2){
      
    let activityText ="";
    let currentTime = new Date();
    let date = currentTime.getFullYear() + "-" + (currentTime.getMonth()+1) + "-" +currentTime.getDate();
    let time = currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
    let dateTime = date + " " +  time;

    switch(handling){
        case "addedUser": activityText = " lagt til " + item1 + " til prosjektet " + item2;

            break;

        case "cardAdded": activityText = " Opprettet prosjektet " + item1;

            break;
            
        case "cardRemoved": activityText = " Slettet prosjektet " + item1;
            
            break;
        
        case "userRemoved": activityText = " Slettet " + item1 + " fra prosjektet " + item2;
            
            break;
    }
        
    activityLogEntries.push({
        logEntry: activityText,
        logDate: dateTime,
        name: "Prosjekt Leder"
            
    });
    renderActivityLogFromArray(activityLogEntries[activityLogEntries.length-1])
            
}
 
//tar inn et objekt fra activityLogEntries og rendrer det ut i ActivityLoggen på siden.  
function renderActivityLogFromArray(entry){
        
    let createLogEntryContainer = document.createElement("DIV");
    let createLogEntryUser = document.createElement("H3");
    let createLogEntry = document.createElement("P");
    let createLogDate = document.createElement("p");

    createLogEntryContainer.className ="activity-item cm-text-light cm-card-2 cm-shadow-c";
    createLogEntryUser.className ="cm-text-p1";
    createLogEntry.className ="cm-text-p1";
    createLogDate.className ="activity-time cm-text-p1";

    createLogEntryUser.innerText = entry.name;
    createLogEntry.innerText = entry.logEntry;
    createLogDate.innerText = entry.logDate;

    ActivityEl.appendChild(createLogEntryContainer);
    createLogEntryContainer.appendChild(createLogEntryUser);
    createLogEntryContainer.appendChild(createLogEntry);
    createLogEntryContainer.appendChild(createLogDate);
}
