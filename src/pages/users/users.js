"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var usersThunk_1 = require("../../../features/users/usersThunk");
var UsersTable_1 = require("../../components/UsersTable");
var Pagination_1 = require("../../components/Pagination");
var fa_1 = require("react-icons/fa");
var userStyles_1 = require("../../components/userStyles");
var Users = function () {
    var _a = (0, react_1.useState)('all'), filter = _a[0], setFilter = _a[1];
    var _b = (0, react_1.useState)(''), searchTerm = _b[0], setSearchTerm = _b[1];
    var _c = (0, react_1.useState)(1), currentPage = _c[0], setCurrentPage = _c[1];
    var usersPerPage = 10;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var dispatch = (0, react_redux_1.useDispatch)();
    var users = (0, react_redux_1.useSelector)(function (state) { return state.users.data; });
    var usersStatus = (0, react_redux_1.useSelector)(function (state) { return state.users.status; });
    var _d = (0, react_1.useState)({
        key: 'name',
        direction: 'asc',
    }), sortConfig = _d[0], setSortConfig = _d[1];
    (0, react_1.useEffect)(function () {
        if (usersStatus === 'idle') {
            dispatch((0, usersThunk_1.GetUsers)());
        }
    }, [dispatch, usersStatus]);
    var filteredUsers = users
        .filter(function (user) { return filter === 'all' || user.state === filter; })
        .filter(function (user) {
        return user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.work.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.telephone.includes(searchTerm);
    })
        .sort(function (a, b) {
        var key = sortConfig.key;
        var direction = sortConfig.direction === 'asc' ? 1 : -1;
        return a[key] > b[key] ? direction : a[key] < b[key] ? -direction : 0;
    });
    var totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    var currentUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);
    var handleRowClick = function (id) {
        navigate("/users/".concat(id));
    };
    var handleSort = function (key) {
        var direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key: key, direction: direction });
    };
    var handleDelete = function (userId) {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch((0, usersThunk_1.DeleteUser)(userId)).then(function () {
                dispatch((0, usersThunk_1.GetUsers)());
            });
        }
    };
    var handleCreate = function () {
        navigate('/users/new');
    };
    return (<userStyles_1.Container>
      <userStyles_1.Header>
        <userStyles_1.NewUserButton onClick={handleCreate}>
          <fa_1.FaPlus /> Add User
        </userStyles_1.NewUserButton>
      </userStyles_1.Header>
      <userStyles_1.Tabs>
        <userStyles_1.Tab $active={filter === 'all'} onClick={function () { return setFilter('all'); }}>
          All Users
        </userStyles_1.Tab>
        <userStyles_1.Tab $active={filter === 'ACTIVE'} onClick={function () { return setFilter('ACTIVE'); }}>
          Active Users
        </userStyles_1.Tab>
        <userStyles_1.Tab $active={filter === 'INACTIVE'} onClick={function () { return setFilter('INACTIVE'); }}>
          Inactive Users
        </userStyles_1.Tab>
      </userStyles_1.Tabs>
      <UsersTable_1.default users={currentUsers} handleRowClick={handleRowClick} handleSort={handleSort} sortConfig={sortConfig} onDelete={handleDelete}/>
      <Pagination_1.default currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
    </userStyles_1.Container>);
};
exports.default = Users;
