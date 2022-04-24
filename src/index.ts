const Main = async () => {
    const Framework = await import("octokit");
    const Middleware = Framework.createNodeMiddleware;

    const Settings = await import("./settings");

    console.log(Settings);
};

(async () => await Main())();

export default Main;

export { Main };
