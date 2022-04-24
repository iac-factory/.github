const Main = async () => {
    const Dot = await import("dotenv");

    return Dot.config({
        debug: false,
        encoding: "utf-8",
        override: true
    });
}

export { Main as Configuration };
export default Main;
