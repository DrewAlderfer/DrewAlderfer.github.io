const feed = document.querySelector(".feed");
const recents = document.querySelector(".r_list");
const nav = document.querySelector(".nav");
const parser = new DOMParser();
const regex = new RegExp("[A-Za-z_0-9]*\.html", "g");
const default_args = [["all"], true];
var post;

const more_button = `<p>Show More</p>
                    <svg class="arrow" width="100" height="30">
                        <polygon points="5,5 50,25 100,5 50,25 5,5"/>
                    </svg>`
const less_button = `<svg class="arrow" width="100" height="30">
                        <polygon points="5,25 50,5 100,25 50,5 5,25"/>
                    </svg>
                    <p>Show Less</p>`

async function toggle_filter(item) {
    if (item.getAttribute("status") == "ON") {
        item.setAttribute("status", "OFF");
        item.setAttribute("style", "color: var(--black)");
    } else {
        item.setAttribute("status", "ON");
        item.setAttribute("style", "color: var(--hl)");
    }
    return true
}

async function setTags() {
    const toggle = await toggle_filter(this);
    let meta = [];
    // const tag = await parser.parseFromString(this.innerHTML, 'text/html');
    const nodes = await document.querySelectorAll('.nav_button');
    for await (node of nodes) {
        if (node.getAttribute('status') == "ON") {
            meta = meta.concat(getMeta(node));
        }
    }
    console.log(meta);
    // console.log(nodes.filter((node) => node.getAttribute('status') == "ON"));
    // const meta = getMeta(tag);
    fetchHTMLContent([meta, false]);
}

async function make_filters(tags) {
    tags.sort();
    result = "";
    for await (tag of tags) {
        // console.log(tag);
        const id = await convertToSnakeCase(tag);
        nav_button = `<div class="nav_button" id="${id}" status="OFF">${tag}
                            <div class="meta">
                                <ul>
                                    <li>${tag}</li>
                                </ul>
                            </div>
                        </div>`
        result = result + nav_button;
    }
    return result
}

async function fill_buffers(args) {
    const tags = args[0];
    const setting = args[1];
    const response = await fetch("projects/");
    const text = await response.text();
    const html_object = await parser.parseFromString(text, 'text/html');
    const file_names = await html_object.querySelectorAll('li');
    let post_buffer = "";
    let link_buffer = "";
    let filter_options = [];
    for await (file of file_names) {
        if (file.innerText.includes(".html", -4)) {
            const p_response = await fetch("projects/" + file.innerText);
            const p_text = await p_response.text();
            const post_html = await parser.parseFromString(p_text, 'text/html');
            const meta = await getMeta(post_html);
            // console.log(meta);
            if (setting) {
                for await (tag of meta) {
                    if (filter_options.includes(tag) !== true && tag !== "all") {
                        filter_options.push(tag);
                    };
                };
            };
            const check = tags.every((element) => meta.indexOf(element) !== -1);
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
    const filter_buffer = await make_filters(filter_options);
    return [post_buffer, link_buffer, filter_buffer]
}


async function fetchHTMLContent(args) {
    const buffers = await fill_buffers(args);
    const link_buffer = await buffers[1];
    const post_buffer = await buffers[0];
    const filter_buffer = await buffers[2];
    if (args[1]) {
        nav.innerHTML = "";
        nav.insertAdjacentHTML("afterbegin", filter_buffer);
    }

    feed.innerHTML = "";
    recents.innerHTML = "";
    recents.insertAdjacentHTML("afterbegin", link_buffer);
    feed.insertAdjacentHTML("afterbegin", post_buffer);
    const buttons = await document.querySelectorAll(".button");
    const navbutt = await document.querySelectorAll(".nav_button");

    await navbutt.forEach(button => {
        button.addEventListener("click", setTags);
    })

    await buttons.forEach((element) => {
        element.innerHTML = "";
        element.insertAdjacentHTML("afterbegin", more_button);
    });

    await buttons.forEach((button) => button.addEventListener("click", (event) => {
        event.target.replaceChildren();
        if (event.target.getAttribute("status") == "ON") {
            event.target.setAttribute("status", "OFF");
            event.target.parentElement.parentElement.querySelector(".hidden").setAttribute("style", "display: none; visibility: hidden");
            event.target.insertAdjacentHTML("afterbegin", more_button);
        } else {
            event.target.setAttribute("status", "ON");
            event.target.parentElement.parentElement.querySelector(".hidden").setAttribute("style", "display: block; visibility: visible");
            event.target.insertAdjacentHTML("afterbegin", less_button);
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
fetchHTMLContent(default_args);
// sort_posts(default_tags);

