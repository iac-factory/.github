export * from "./gists";
export * from "./organization";
export * from "./members";

export * as Repository from "./repository";

import * as Repository from "./repository";

(async () => console.log(await Repository.All()))();
