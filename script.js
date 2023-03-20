// Script to cycle through gallery images

// Script to open a div with another site inside
let projects = document.querySelectorAll(".project");
let panel = document.getElementById("p-expanded")
let pOpen = false;
// console.log(panel)

// title case from:
// https://www.freecodecamp.org/news/three-ways-to-title-case-a-sentence-in-javascript-676a9175eb27/
//
function titleCase(str) {
  str = str.replaceAll("_", " ").split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}

// Construct Projects
projects.forEach (p_post => {
    let name = p_post.getAttribute("title");
    // insert image
    p_post.firstElementChild.innerHTML = `<img src="projects/${name}/images/${name}.png"></img>`;
    // insert title
    p_post.getElementsByClassName("p-title").item(0).innerHTML = titleCase(name);
    // insert tags
    fetch (`projects/${name}/tags.txt`)
        .then(x => x.text())
        .then(y => p_post.lastElementChild.getElementsByClassName("tag").item(0).innerHTML = y)
    // insert description
    fetch (`projects/${name}/desc.txt`)
        .then(x => x.text())
        .then(y => p_post.lastElementChild.lastElementChild.innerHTML = y)
})
// descriptions.forEach( desc => {
//     name = desc.id
//     if (name) {
//         fetch (`projects/${name}/desc.txt`).then(x => x.text()).then(y => desc.innerHTML = y)
//     }
// })

// Side Panel Operations
// Event Listener
projects.forEach(p => {
    p.addEventListener("click", sidePanel);
})

// Sleep Function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Open Panel Functions
function open_panel(panel) {
    return panel.style.width = "48vw";
}

// Eventlistener Callback
function sidePanel() {
    project = this.getAttribute("title");
    if (pOpen) {
        if (this.getAttribute("title") == cur_project) {
            //you probably want to reload different project hrefs 
            panel.classList.remove("open")
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
            panel.classList.add("open")
        }
        content_fill();

        
        //let thisProject = this.id
        // panel.innerhtml = thisProject.html
        // not inner html lol but there's a thing where you can load a page into a div.
        // you might want to also set a delay.
    }
    cur_project = project
}
