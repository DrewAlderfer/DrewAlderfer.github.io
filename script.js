const feed = document.querySelector(".feed");
const recents = document.querySelector(".r_list");
const navbutt = document.querySelectorAll(".nav_button");
const parser = new DOMParser();
const regex = new RegExp("[A-Za-z_0-9]*\.html", "g");
const default_tags = ["all"];
var post;
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
    const response = await fetch("projects/");
    const text = await response.text();
    const html_object = await parser.parseFromString(text, 'text/html');
    const file_names = await html_object.querySelectorAll('li');
    let post_buffer = "";
    let link_buffer = "";
    for await (file of file_names) {
        if (file.innerText.includes(".html", -4)) {
            const p_response = await fetch("projects/" + file.innerText);
            const p_text = await p_response.text();
            const post_html = await parser.parseFromString(p_text, 'text/html');
            const meta = await getMeta(post_html);
            const check = tags.some((element) => meta.indexOf(element) !== -1);
            if (check) {
                const info = await post_html.querySelector(".post_info").innerText.trim();
                const title = await post_html.querySelector(".post_header").innerText.trim();
                const id = convertToSnakeCase(title);
                post_html.querySelector(".post_header").setAttribute('id', id);
                const post = await post_html.querySelector(".post").outerHTML;
                html_element = `<a href="#${id}"><div class="jump_link">\n\t<span class="r_title">${title}</span>\n\t<span class="r_date">${info}</span>\n</div></a>`
                post_buffer = post + post_buffer;
                link_buffer = html_element + link_buffer;
            }
        }
    }
    feed.innerHTML = "";
    recents.innerHTML = "";
    recents.insertAdjacentHTML("afterbegin", link_buffer);
    feed.insertAdjacentHTML("afterbegin", post_buffer);
    const buttons = await document.querySelectorAll(".button");
    await buttons.forEach((button) => button.addEventListener("click", (event) => {
        if (event.target.getAttribute("status") == "ON") {
            event.target.setAttribute("status", "OFF");
            event.target.parentElement.parentElement.querySelector(".hidden").setAttribute("style", "display: none; visibility: hidden");
            event.target.innerText = "Show More";
        } else {
            event.target.setAttribute("status", "ON");
            event.target.parentElement.parentElement.querySelector(".hidden").setAttribute("style", "display: block; visibility: visible");
            event.target.innerText = "Show Less";
        }
    }));
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
// sort_posts(default_tags);

