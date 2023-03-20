let bio = document.getElementById("bio")

fetch ("bio.html").then(x => x.text()).then(y => bio.innerHTML = y);

