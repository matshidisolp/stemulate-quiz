// To decode the HTML and make text look clean

export function decodeHTML(str) {
    const el = document.createElement("textarea");
    el.innerHTML = str;
    return el.value;
}