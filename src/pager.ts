declare type Headers = {
    "cache-control"?: string;
    "content-length"?: number;
    "content-type"?: string;
    date?: string;
    etag?: string;
    "last-modified"?: string;
    link?: string;
    location?: string;
    server?: string;
    status?: string;
    vary?: string;
    "x-github-mediatype"?: string;
    "x-github-request-id"?: string;
    "x-oauth-scopes"?: string;
    "x-ratelimit-limit"?: string;
    "x-ratelimit-remaining"?: string;
    "x-ratelimit-reset"?: string;
    [header: string]: string | number | undefined;
};

/***
 * See {@link Pager} or Example for Implementation Detail(s)
 *
 * @example
 * const Pager = ( headers: Headers, url: URL | string ): Paginator => {
 *     const Next = new RegExp( "<(?<url>.*)>; rel=\"next\"", "g" );
 *     const Last = new RegExp( "(.*)<(?<url>.*)>; rel=\"last\"", "g" );
 *
 *     const pager = [ new RegExp( "(?<page>page=.*)", "g" ), new RegExp( "(?<page>page=.*)", "g" ) ];
 *
 *     const next = Next.exec( headers.link )?.groups?.url ?? null;
 *     const step = pager[0].exec( next ?? "" )?.groups?.page?.split( "=" )?.pop() ?? null;
 *
 *     const last = Last.exec( headers.link )?.groups?.url ?? null;
 *     const ending = pager[1].exec( last ?? "" )?.groups?.page?.split( "=" )?.pop() ?? null;
 *
 *     return {
 *         url,
 *         iterator: {
 *             next: {
 *                 url: next,
 *                 page: step
 *             },
 *             last: {
 *                 url: last,
 *                 page: ending
 *             },
 *             end: ( step == ending )
 *         }
 *     };
 * };
 *
 */
declare interface Paginator {
    iterator: {
        next: {
            url: string | URL;
            page: string | number;
        };
        last: {
            url: string | URL;
            page: string | number;
        };
        end: boolean;
    };

    url: URL | string;

    comparator: boolean;
}

/***
 *
 * @param {Headers} headers
 * @param {URL | string} url
 * @returns {Paginator}
 *
 * @constructor
 *
 * @example
 * const { data: { login } } = await Application.rest.users.getAuthenticated();
 *
 * const { data, headers, url } = await Application.rest.gists.listForUser( {
 *     username: login
 * } );
 *
 * const $ = {
 *     pager: Pager(headers, url),
 *     data: [... data]
 * };
 *
 * do {
 *     $.pager = Pager(headers, $.pager.iterator.next.url);
 *     const response = await Application.rest.gists.listForUser( {
 *         username: login, page: Number($.pager.iterator.next)
 *     } );
 *
 *     $.data.push(... response?.data);
 *
 * } while ($.pager.comparator === false)
 *
 */
const Pager = ( headers: Headers, url: URL | string ): Paginator => {
    const Next = new RegExp( "<(?<url>.*)>; rel=\"next\"", "g" );
    const Last = new RegExp( "(.*)<(?<url>.*)>; rel=\"last\"", "g" );

    const pager = [ new RegExp( "(?<page>page=.*)", "g" ), new RegExp( "(?<page>page=.*)", "g" ) ];

    const next = Next.exec( headers.link )?.groups?.url ?? null;
    const step = pager[0].exec( next ?? "" )?.groups?.page?.split( "=" )?.pop() ?? null;

    const last = Last.exec( headers.link )?.groups?.url ?? null;
    const ending = pager[1].exec( last ?? "" )?.groups?.page?.split( "=" )?.pop() ?? null;

    return {
        url, comparator: url === last,
        iterator: {
            next: {
                url: next,
                page: step
            },
            last: {
                url: last,
                page: ending
            },
            end: ( step == ending )
        }
    };
};

export { Pager };

export default Pager;

export type { Headers, Paginator };
