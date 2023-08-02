import {Octokit} from "octokit";

const octokit = new Octokit({});

const config = useAppConfig();

export default defineEventHandler(async (event) => {
    const resp = await octokit.request("GET /repos/{owner}/{repo}/issues", {
        owner: config.github.owner,
        repo: config.github.repo,
    });

    return resp.data
})


