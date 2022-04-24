const Main = async () => {
    const Dot = await import("dotenv");

    const Configuration = Dot.config({
        debug: true,
        encoding: "utf-8",
        override: true
    });

    console.debug(Configuration.parsed);

    return Configuration;
}

export { Main as Configuration };
export default Main;
