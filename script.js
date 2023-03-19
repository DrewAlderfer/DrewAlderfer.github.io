// Script to cycle through gallery images

// Script to open a div with another site inside
let projects = document.querySelectorAll(".project");
let panel = document.getElementById("p-expanded")
let pOpen = false;
let descriptions = document.querySelectorAll(".description")
// console.log(panel)

descriptions.forEach( desc => {
    number = desc.id
    if (number) {
        fetch (`projects/${number}/desc.txt`).then(x => x.text()).then(y => desc.innerHTML = y)
    }
})

projects.forEach(p => {
    p.addEventListener("click", sidePanel);
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function open_panel(panel) {
    return panel.style.width = "45vw";
}

function sidePanel() {
    project = this.getAttribute("title");
    if (pOpen) {
        if (this.getAttribute("title") == cur_project) {
            //you probably want to reload different project hrefs 
            panel.style.width = 0;
            pOpen = false;
            panel.innerHTML = ""
        } else {
            fetch (`projects/${project}/index.html`).then(x => x.text()).then(y => panel.innerHTML = y)
        }

    } else {
        open_panel(panel);
        async function content_fill(){
            await sleep(1050);
            fetch (`projects/${project}/index.html`)
                .then(x => x.text())
                .then(y => panel.innerHTML = y);
            pOpen = true;
        }
        content_fill();

        
        //let thisProject = this.id
        // panel.innerhtml = thisProject.html
        // not inner html lol but there's a thing where you can load a page into a div.
        // you might want to also set a delay.
    }
    cur_project = project
}
