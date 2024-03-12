const feed = document.querySelector(".feed");
const recents = document.querySelector(".recent");
const parser = new DOMParser();
const regex = new RegExp("[a-z_0-9]*\.html", "g");
const post_info = [];
const post_title = [];

function fetchHTMLContent() {
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
                feed.insertAdjacentHTML("beforeend", postString);
                return parser.parseFromString(postString, 'text/html');
            })
            .then((postHtml) => {
                const info = postHtml.querySelector(".post_info").innerText;
                const title = postHtml.querySelector(".post_header").innerText;
                const link = convertToSnakeCase(title);
                html_element = `<a href="#${link}"><div class="jump_link">\n\t<span class="r_title">${title}</span>\n\t<span class="r_date">${info}</span>\n</div></a>`
                console.log(html_element);
                recents.insertAdjacentHTML("beforeend", html_element);
            });
        }
    });
}

function convertToSnakeCase(titleCaseString) {
    return titleCaseString.toLowerCase().replace(/\s+/g, '_');
}

function zip(...arrays) {
    const length = Math.min(...arrays.map(arr => arr.length));
    return Array.from({ length }, (_, index) => arrays.map(arr => arr[index]));
}
// Usage example:
fetchHTMLContent();



