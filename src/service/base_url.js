module.exports = {
	/*Workflow*/

	//get_all_workflow
	all_WF: function () {
		return "/api/workflow/findAllWF";
	},
	//add_workflow
	add_WF: function () {
		return "/api/workflow/addWF";
	},
	//updateWF
	updateWF: function () {
		return "/api/workflow/updateWF";
	},

	//deleteWF
	deleteWF: function () {
		return "/api/workflow/deleteWF";
	},

	/*UserTask*/

	//get_all_userTasks
	all_UserTasks: function () {
		return "/api/userTask/findAlltasks";
	},
	// find_userTask
	find_UserTask: function () {
		return "/api/userTask/findUsertask";
	},

	//affect_Group_to_UserTask
	update_UT: function () {
		return "/api/userTask/updateUT";
	},

	/*Group*/

	//get_all_groups
	all_Groups: function () {
		return "/api/group/findAllGroups";
	},
	addGroup: function () {
		return "/api/group/addGroup";
	},
	deleteGroup: function () {
		return "/api/group/deleteGroup";
	},
	getGroup_Byid: function () {
		return "/api/group/getGroup_Byid";
	},

	/*Form*/

	//get_allForms_by_WF
	get_Forms: function () {
		return "/api/form/findAllForms";
	},

	//get_allForms_by_WF
	all_Forms: function () {
		return "/api/form/findAllForm";
	},

	//add_newForm
	add_Form: function () {
		return "/api/form/addForm";
	},

	//getFormbyUserTask

	getFormbyUserTask: function () {
		return "/api/form/getFormbyUserTask";
	},
	//getFormsByUser
	getFormsByUser: function () {
		return "/api/form/getFormsByUser";
	},

	//getFormbyProcess
	getFormbyProcess: function () {
		return "/api/form/findFormbyProcess";
	},
	//getAllForms
	getAllForms: function () {
		return "/api/form/findAllForm";
	},

	/*User*/

	//check_User
	check_User: function () {
		return "/api/user/check_User";
	},

	//check_User
	getUser_Byid: function () {
		return "/api/user/getUser_Byid";
	},

	//getlistProcessbyUser
	getlistProcessbyUser: function () {
		return "/api/workflow/getlistProcessbyUser";
	},

	//getAllUser
	getAllUsers: function () {
		return "/api/user/getAllUsers";
	},
	//addUser
	addUser: function () {
		return "/api/user/addUser";
	},
	// delete User
	deleteUser: function () {
		return "/api/user/deleteUser";
	},

	/*Requests*/

	//addRequest
	addRequestbyUser: function () {
		return "/api/requests/addRequest";
	},

	//getRequestByUser
	getRequestByUser: function () {
		return "/api/requests/getRequestByUser";
	},

	//getRequestToValidate
	getRequestToValidate: function () {
		return "/api/requests/getRequestToValidate";
	},
	///getRequestValidated
	getRequestValidated: function () {
		return "/api/requests/getRequestValidated";
	},

	//getRequestByid
	getRequestByid: function () {
		return "/api/requests/getRequestByid";
	},
	//getALLRequest
	getALLRequest: function () {
		return "/api/requests/getALLRequest";
	},
	//cancelRequest
	cancelRequest: function () {
		return "/api/requests/cancelRequest";
	},

	/*Response*/

	//addResponse
	addResponsebyUser: function () {
		return "/api/response/addResponse";
	},

	//getAllResponseByUser
	getAllResponseByUser: function () {
		return "/api/response/getAllResponsebyUser";
	},

	getAllResponse: function () {
		return "/api/response/getAllResponse";
	},

	/*Role*/
	addRole: function () {
		return "/api/role/addRole";
	},
	getAllRoles: function () {
		return "/api/role/getAllRoles";
	},
	deleteRole: function () {
		return "/api/role/deleteRole";
	},
	getRole_Byid: function () {
		return "/api/role/getRole_Byid";
	},
};
