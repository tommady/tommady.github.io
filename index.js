import { Spinner } from "./spin.js";
const spinner = new Spinner({ color: "#eb7070", lines: 9, animation: 'spinner-line-fade-quick' }).spin(document.getElementById("loading"));

const run = async () => {
    const { Octokit } = await import("https://cdn.skypack.dev/@octokit/core");
    const octokit = new Octokit();
    const response = await octokit.request('GET /users/{username}/gists', {
        username: 'tommady'
    });

    const dl = document.getElementById("posts");
    response.data.forEach(function(obj) {
        if (obj.description.includes("#post")) {
            const dt = document.createElement("dt");
            const dd = document.createElement("dd");
            const a = document.createElement("a");
            a.setAttribute("href", obj.html_url);
            a.setAttribute("target", "_blank");

            const ddp = document.createElement("p");
            const ddt = document.createTextNode(obj.description.replace("#post", ""));
            ddp.appendChild(ddt);
            a.appendChild(ddp);
            dd.appendChild(a);

            const createdAt = new Date(Date.parse(obj.created_at));
            const dtp = document.createElement("p");
            const dtt = document.createTextNode(createdAt.toDateString());
            dtp.appendChild(dtt);
            dt.appendChild(dtp);

            dl.appendChild(dt);
            dl.appendChild(dd);
        }
    });

    spinner.stop();
};

run();
