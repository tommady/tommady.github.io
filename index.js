import { Octokit } from "https://cdn.skypack.dev/@octokit/core";
const octokit = new Octokit();

const run = async () => {
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
};

run();
