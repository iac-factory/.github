const Main = async () => {
    const Framework = await import("octokit");

    const Settings = await ( await import("./settings") ).Configuration();

    const Configuration = Settings.parsed;

    return new Framework.Octokit( { auth: Configuration.TOKEN, userAgent: "IaC-Factory" } );
};

const Application = (async () => await Main())();

const $ = async () => Application;

export { $ as Application };

export default async () => Application;

/// (async () => await Main())();
