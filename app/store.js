"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var contactSlice_1 = require("../features/contacts/contactSlice");
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        contacts: contactSlice_1.default
    },
});
exports.default = exports.store;
