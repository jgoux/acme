import { parse } from "./parse/index.js";
import { serialize } from "./serialize/index.js";

if (process.argv[2]) {
  void parse(process.argv[2])
    .then(serialize)
    .then((document) => {
      console.log(document);
    });
}
