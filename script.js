const feed = document.querySelector(".feed");
const recents = document.querySelector(".r_list");
const navbutt = document.querySelectorAll(".nav_button");
const parser = new DOMParser();
const regex = new RegExp("[A-Za-z_0-9]*\.html", "g");
const default_tags = ["all"]
// add eventlistener
navbutt.forEach(button => {
    button.addEventListener("click", setTags);
})

function setTags() {
    const tag = parser.parseFromString(this.innerHTML, 'text/html');
    const meta = getMeta(tag);
    fetchHTMLContent(meta);
}

async function fetchHTMLContent(tags) {
    feed.innerText = "";
    recents.innerText = "";
    const post_list = [];
    console.log(typeof post_list);
    return fetch("./projects").then((response) => response.text())
    .then((text) => { return parser.parseFromString(text, 'text/html') })
    .then((htmlObject) => htmlObject.querySelector('ul').innerText)
    .then((inner_text) => { 
        return inner_text.match(regex);
    })
    .then((str_match) => { 
        str_match.sort().reverse();
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
                // console.log(postHtml);
                const meta = getMeta(postHtml);
                const check = tags.some((element) => meta.indexOf(element) !== -1);
                if (check) {
                    const info = postHtml.querySelector(".post_info").innerText.trim();
                    const title = postHtml.querySelector(".post_header").innerText.trim();
                    const id = convertToSnakeCase(title);
                    postHtml.querySelector(".post_header").setAttribute('id', id);
                    const post = postHtml.querySelector(".post").outerHTML;
                    html_element = `<a href="#${id}"><div class="jump_link">\n\t<span class="r_title">${title}</span>\n\t<span class="r_date">${info}</span>\n</div></a>`
                    feed.insertAdjacentHTML("beforeend", post);
                    recents.insertAdjacentHTML("beforeend", html_element);
                    // post_list.push([info, title, post, html_element]);
                }
            });
        };
        // return post_list;
    });
}

// async function sort_posts(tags) {
//     const posts = await fetchHTMLContent(tags);
//     posts.forEach((item) => {
//         console.log(item);
//     });
// }

function convertToSnakeCase(titleCaseString) {
    return titleCaseString.toLowerCase().replace(/\s+/g, '_');
}
function getMeta(htmlList) {
    const result = htmlList.querySelector(".meta").querySelector("ul").innerText.toLowerCase().split('\n').map((element) => element.trim()).filter((element) => element.length > 0);
    return result;
}
// Usage example:
fetchHTMLContent(default_tags);
// sort_posts(default_tags);






