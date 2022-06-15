import type { GeneratorOptions } from "@prisma/generator-helper";

export const generateSeed = async (options: GeneratorOptions) => {
  console.log(options.dmmf.datamodel.models);
};
// seed({
//   project: {
//     amount: 3,
//     factory: ({ faker, index }) => ({
//       name: `Project ${index}`,
//       description: faker.lorem.paragraph(10),
//       members: {
//         max: 15,
//         statics: [
//           ...(index === 3
//             ? [
//                 {
//                   role: "admin",
//                   user: {
//                     auth0Id: "auth0|5e8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8",
//                   },
//                 },
//               ]
//             : []),
//         ],
//       },
//     }),
//   },
// });

// type FactoryMap = {
//   [ModelName]
// }

// const createSeed = (factoryMap) => {
//   const seed = (seedMap) => {
//     // iterate over each table and generate an input we can give to Prisma
//   };
// };
