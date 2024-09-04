"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.archiveComment = exports.publishComment = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var contactThunk_1 = require("./contactThunk");
var initialState = {
    data: [],
    status: 'idle',
    error: null,
};
var contactSlice = (0, toolkit_1.createSlice)({
    name: 'contacts',
    initialState: initialState,
    reducers: {
        publishComment: function (state, action) {
            var contact = state.data.find(function (item) { return item.Contact_id === action.payload; });
            if (contact) {
                contact.status = 'published';
            }
        },
        archiveComment: function (state, action) {
            var contact = state.data.find(function (item) { return item.Contact_id === action.payload; });
            if (contact) {
                contact.status = 'archived';
            }
        },
    },
    extraReducers: function (builder) {
        builder
            .addCase(contactThunk_1.fetchContacts.pending, function (state) {
            state.status = 'pending';
        })
            .addCase(contactThunk_1.fetchContacts.fulfilled, function (state, action) {
            state.status = 'fulfilled';
            state.data = action.payload;
        })
            .addCase(contactThunk_1.fetchContacts.rejected, function (state, action) {
            var _a;
            state.status = 'rejected';
            state.error = (_a = action.error.message) !== null && _a !== void 0 ? _a : 'Failed to fetch contacts';
        });
    },
});
exports.publishComment = (_a = contactSlice.actions, _a.publishComment), exports.archiveComment = _a.archiveComment;
exports.default = contactSlice.reducer;
