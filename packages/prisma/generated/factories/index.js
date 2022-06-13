"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.createCategoryFactory = exports.createPostFactory = exports.createProfileFactory = exports.createUserFactory = void 0;
var prisma_factory_1 = require("prisma-factory");
function createUserFactory(requiredAttrs, options, hooks) {
    return (0, prisma_factory_1.createFactory)('User', requiredAttrs, __assign(__assign({}, options), { client: '/Users/jgoux/Documents/code/acme/node_modules/@prisma/client' }), hooks);
}
exports.createUserFactory = createUserFactory;
function createProfileFactory(requiredAttrs, options, hooks) {
    return (0, prisma_factory_1.createFactory)('Profile', requiredAttrs, __assign(__assign({}, options), { client: '/Users/jgoux/Documents/code/acme/node_modules/@prisma/client' }), hooks);
}
exports.createProfileFactory = createProfileFactory;
function createPostFactory(requiredAttrs, options, hooks) {
    return (0, prisma_factory_1.createFactory)('Post', requiredAttrs, __assign(__assign({}, options), { client: '/Users/jgoux/Documents/code/acme/node_modules/@prisma/client' }), hooks);
}
exports.createPostFactory = createPostFactory;
function createCategoryFactory(requiredAttrs, options, hooks) {
    return (0, prisma_factory_1.createFactory)('Category', requiredAttrs, __assign(__assign({}, options), { client: '/Users/jgoux/Documents/code/acme/node_modules/@prisma/client' }), hooks);
}
exports.createCategoryFactory = createCategoryFactory;
