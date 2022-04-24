import { Application } from "./application";

/***
 *
 * @param {string} name
 * @param debug
 * @returns {Promise<?>}
 * @constructor
 */
const Main = async ( name: string = "iac-factory", debug: boolean = false ) => {
    const app = await Application();

    const { data: { login } } = await app.rest.users.getAuthenticated();
    const { data: $ } = await app.rest.orgs.listMembers( {
        username: login, org: name
    } );

    (debug) && console.debug( "[Debug] Organization Member(s)" + ":", $ );

    return $;
};

/// ( async () => await Main() )();

export { Main as Members };

export default Main;
