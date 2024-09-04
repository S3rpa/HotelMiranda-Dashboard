"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var contactSlice_1 = require("../../../features/contacts/contactSlice");
var contactThunk_1 = require("../../../features/contacts/contactThunk");
var styled_components_1 = require("styled-components");
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 5%;\n  background-color: #f7f7f7;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  color: #333;\n"], ["\n  padding: 5%;\n  background-color: #f7f7f7;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  color: #333;\n"])));
var SectionTitle = styled_components_1.default.h2(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  font-size: 1.5rem;\n  color: #333;\n  margin-bottom: 2rem;\n"], ["\n  font-size: 1.5rem;\n  color: #333;\n  margin-bottom: 2rem;\n"])));
var ReviewSection = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background-color: white;\n  padding: 5%;\n  border-radius: 0.75em;\n  box-shadow: 0 0.25em 0.375em rgba(0, 0, 0, 0.1);\n  margin-bottom: 2rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n"], ["\n  background-color: white;\n  padding: 5%;\n  border-radius: 0.75em;\n  box-shadow: 0 0.25em 0.375em rgba(0, 0, 0, 0.1);\n  margin-bottom: 2rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n"])));
var TableContainer = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  background-color: white;\n  padding: 2%;\n  border-radius: 0.75em;\n  box-shadow: 0 0.25em 0.375em rgba(0, 0, 0, 0.1);\n  flex-grow: 1;\n"], ["\n  background-color: white;\n  padding: 2%;\n  border-radius: 0.75em;\n  box-shadow: 0 0.25em 0.375em rgba(0, 0, 0, 0.1);\n  flex-grow: 1;\n"])));
var TabNav = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  border-bottom: 0.1em solid #ddd;\n  margin-bottom: 2rem;\n\n  button {\n    padding: 1% 2%;\n    background: none;\n    border: none;\n    border-bottom: 0.2em solid transparent;\n    cursor: pointer;\n    font-weight: bold;\n    color: #333;\n\n    &:hover, &.active {\n      border-bottom: 0.2em solid #135846;\n      color: #135846;\n    }\n  }\n"], ["\n  display: flex;\n  border-bottom: 0.1em solid #ddd;\n  margin-bottom: 2rem;\n\n  button {\n    padding: 1% 2%;\n    background: none;\n    border: none;\n    border-bottom: 0.2em solid transparent;\n    cursor: pointer;\n    font-weight: bold;\n    color: #333;\n\n    &:hover, &.active {\n      border-bottom: 0.2em solid #135846;\n      color: #135846;\n    }\n  }\n"])));
var Table = styled_components_1.default.table(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  width: 100%;\n  border-collapse: collapse;\n\n  th, td {\n    padding: 1.5%;\n    border-bottom: 0.1em solid #ddd;\n    text-align: left;\n    font-size: 1rem;\n  }\n"], ["\n  width: 100%;\n  border-collapse: collapse;\n\n  th, td {\n    padding: 1.5%;\n    border-bottom: 0.1em solid #ddd;\n    text-align: left;\n    font-size: 1rem;\n  }\n"])));
var PublishButton = styled_components_1.default.button(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  background: none;\n  border: none;\n  color: #28a745;\n  cursor: pointer;\n\n  &:hover {\n    color: #218838;\n  }\n"], ["\n  background: none;\n  border: none;\n  color: #28a745;\n  cursor: pointer;\n\n  &:hover {\n    color: #218838;\n  }\n"])));
var ArchiveButton = styled_components_1.default.button(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  background: none;\n  border: none;\n  color: #dc3545;\n  cursor: pointer;\n\n  &:hover {\n    color: #c82333;\n  }\n"], ["\n  background: none;\n  border: none;\n  color: #dc3545;\n  cursor: pointer;\n\n  &:hover {\n    color: #c82333;\n  }\n"])));
var PaginationContainer = styled_components_1.default.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  margin-top: 1rem;\n"], ["\n  display: flex;\n  justify-content: center;\n  margin-top: 1rem;\n"])));
var PageButton = styled_components_1.default.button(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  padding: 0.5rem 1rem;\n  margin: 0 0.5rem;\n  background-color: ", ";\n  color: ", ";\n  border: 1px solid #ddd;\n  cursor: pointer;\n  border-radius: 5px;\n\n  &:hover {\n    background-color: #135846;\n    color: white;\n  }\n"], ["\n  padding: 0.5rem 1rem;\n  margin: 0 0.5rem;\n  background-color: ", ";\n  color: ", ";\n  border: 1px solid #ddd;\n  cursor: pointer;\n  border-radius: 5px;\n\n  &:hover {\n    background-color: #135846;\n    color: white;\n  }\n"])), function (_a) {
    var $active = _a.$active;
    return ($active ? '#135846' : 'white');
}, function (_a) {
    var $active = _a.$active;
    return ($active ? 'white' : '#333');
});
var ContactPage = function () {
    var dispatch = (0, react_redux_1.useDispatch)();
    var _a = (0, react_redux_1.useSelector)(function (state) { return state.contacts; }), comments = _a.data, status = _a.status;
    var _b = (0, react_1.useState)('all'), currentTab = _b[0], setCurrentTab = _b[1];
    var _c = (0, react_1.useState)(1), currentPage = _c[0], setCurrentPage = _c[1];
    var recordsPerPage = 4;
    (0, react_1.useEffect)(function () {
        if (status === 'idle') {
            dispatch((0, contactThunk_1.fetchContacts)());
        }
    }, [dispatch, status]);
    var filteredComments = comments.filter(function (comment) {
        if (currentTab === 'all')
            return true;
        return comment.status === currentTab;
    });
    var indexOfLastRecord = currentPage * recordsPerPage;
    var indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    var currentComments = filteredComments.slice(indexOfFirstRecord, indexOfLastRecord);
    var totalPages = Math.ceil(filteredComments.length / recordsPerPage);
    var handleTabClick = function (tab) {
        setCurrentTab(tab);
        setCurrentPage(1);
    };
    var handlePublish = function (id) {
        dispatch((0, contactSlice_1.publishComment)(id));
    };
    var handleArchive = function (id) {
        dispatch((0, contactSlice_1.archiveComment)(id));
    };
    var handlePageChange = function (pageNumber) {
        setCurrentPage(pageNumber);
    };
    return (<Container>
      <SectionTitle>Latest Review by Customers</SectionTitle>
      <ReviewSection>
      </ReviewSection>

      <SectionTitle>All Comments</SectionTitle>
      <TableContainer>
        <TabNav>
          <button className={currentTab === 'all' ? 'active' : ''} onClick={function () { return handleTabClick('all'); }}>
            All Comments
          </button>
          <button className={currentTab === 'published' ? 'active' : ''} onClick={function () { return handleTabClick('published'); }}>
            Published
          </button>
          <button className={currentTab === 'archived' ? 'active' : ''} onClick={function () { return handleTabClick('archived'); }}>
            Archived
          </button>
        </TabNav>
        <Table>
          <thead>
            <tr>
              <th>Contact ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentComments.map(function (comment) { return (<tr key={comment.Contact_id}>
                <td>#{comment.Contact_id}</td>
                <td>{comment.Date}</td>
                <td>{comment.Customer}</td>
                <td>{comment.Comment}</td>
                <td>
                  {comment.status === 'archived' ? (<PublishButton onClick={function () { return handlePublish(comment.Contact_id); }}>
                      Publish
                    </PublishButton>) : (<ArchiveButton onClick={function () { return handleArchive(comment.Contact_id); }}>
                      Archive
                    </ArchiveButton>)}
                </td>
              </tr>); })}
          </tbody>
        </Table>
        <PaginationContainer>
          {__spreadArray([], Array(totalPages), true).map(function (_, index) { return (<PageButton key={index} $active={currentPage === index + 1} onClick={function () { return handlePageChange(index + 1); }}>
              {index + 1}
            </PageButton>); })}
        </PaginationContainer>
      </TableContainer>
    </Container>);
};
exports.default = ContactPage;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
