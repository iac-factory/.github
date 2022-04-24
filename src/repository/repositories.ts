import { Application } from "../application";

/***
 *
 * @param {string} name
 * @param {boolean} debug
 * @returns {Promise<?>}
 * @constructor
 */
const Main = async ( name: string = "iac-factory", debug: boolean = false ) => {
    const app = await Application();

    const { data: { login } } = await app.rest.users.getAuthenticated();
    const { data: $ } = await app.rest.repos.listForOrg( {
        username: login, org: name
    } );

    (debug) && console.debug( "[Debug] Organization Repositories (All)" + ":", $ );

    return $;
};

/// ( async () => await Main() )();

export { Main as All };

export default Main;
