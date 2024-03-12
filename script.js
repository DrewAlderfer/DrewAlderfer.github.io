const feed = document.querySelector(".feed");
const recents = document.querySelector(".r_list");
const navbutt = document.querySelectorAll(".nav_button");
const parser = new DOMParser();
const regex = new RegExp("[a-z_0-9]*\.html", "g");
const post_info = [];
const post_title = [];
const default_tags = ["programming"]

// add eventlistener
navbutt.forEach(button => {
    button.addEventListener("click", setTags);
})

function setTags() {
    const tag = parser.parseFromString(this.innerHTML, 'text/html');
    const meta = getMeta(tag);
    fetchHTMLContent(meta);
}

function fetchHTMLContent(tags) {
    console.log(tags);
    recents.innerHTML = "";
    feed.innerHTML = "";
    fetch("./projects").then((response) => response.text())
    .then((text) => { return parser.parseFromString(text, 'text/html') })
    .then((htmlObject) => htmlObject.querySelector('ul').innerText)
    .then((inner_text) => { 
        // console.log(inner_text);
        return inner_text.match(regex);
    })
    .then((str_match) => { 
        // console.log(str_match) 
        for (const fileName of str_match) {
            fetch(`./projects/${fileName}`)
            .then((response) => { 
                // console.log(`${fileName}`);
                return response.text();
            })
            .then((postString) => { 
                // console.log(postString);
                return parser.parseFromString(postString, 'text/html');
            })
            .then((postHtml) => {
                const meta = getMeta(postHtml);
                console.log(meta);
                const check = tags.some((element) => meta.indexOf(element) !== -1);
                if (check) {
                    const post = postHtml.querySelector(".post").outerHTML;
                    const info = postHtml.querySelector(".post_info").innerText;
                    const title = postHtml.querySelector(".post_header").innerText;
                    const link = convertToSnakeCase(title);
                    html_element = `<a href="#${link}"><div class="jump_link">\n\t<span class="r_title">${title}</span>\n\t<span class="r_date">${info}</span>\n</div></a>`
                    // console.log(html_element);
                    feed.insertAdjacentHTML("beforeend", post);
                    recents.insertAdjacentHTML("beforeend", html_element);
                }
            });
        }
    });
}

function convertToSnakeCase(titleCaseString) {
    return titleCaseString.toLowerCase().replace(/\s+/g, '_');
}
function getMeta(htmlList) {
    const result = htmlList.querySelector(".meta").querySelector("ul").innerText.toLowerCase().split('\n').map((element) => element.trim()).filter((element) => element.length > 0);
    return result;
}
// Usage example:
fetchHTMLContent(default_tags);



