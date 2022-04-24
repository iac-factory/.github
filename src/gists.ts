import { Pager } from "./pager";
import { Application } from "./application";

const Main = async () => {
    const app = await Application();

    const { data: { login } } = await app.rest.users.getAuthenticated();
    const { data, headers, url } = await app.rest.gists.listForUser( {
        username: login
    } );

    const gists = {
        pager: Pager(headers, url),
        data: [... data]
    };

    do {
        gists.pager = Pager(headers, gists.pager.iterator.next.url);
        const response = await app.rest.gists.listForUser( {
            username: login, page: Number(gists.pager.iterator.next)
        } );

        gists.data.push(... response?.data);

    } while (gists.pager.comparator === false)

    Reflect.set( gists, "total", gists.data.length );

    console.debug("[Debug] Gist(s)" + ":", gists);

    return gists;
};

/// (async () => await Main())();

export { Main as Gists };

export default Main;
