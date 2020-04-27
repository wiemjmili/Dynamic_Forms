const url = "http://localhost:8080";

module.exports = {
	//Workflow

	//get_all_workflow
	all_WF: function () {
		return url + "/api/workflow/findAllWF";
	},
	//add_workflow
	add_WF: function () {
		return "/api/workflow/addWF";
	},

	//UserTask

	//get_all_userTasks
	all_UserTasks: function () {
		return url + "/api/userTask/findAlltasks";
	},
	// find_userTask
	find_UserTask: function () {
		return url + "/api/userTask/findUsertask";
	},

	//affect_Group_to_UserTask
	update_UT: function () {
		return "/api/userTask/updateUT";
	},

	//Group

	//get_all_groups
	all_Groups: function () {
		return url + "/api/group/findAllGroups";
	},

	//Form

	//get_allForms
	get_Forms: function () {
		return url + "/api/form/findAllForms";
	},

	//add_newForm
	add_Form: function () {
		return "/api/form/addForm";
	},

	//getFormbyProcess
	getFormbyProcess: function () {
		return url + "/api/form/findFormbyProcess";
	},

	//User

	//check_User
	check_User: function () {
		return url + "/api/user/check_User";
	},

	//getlistProcessbyUser
	getlistProcessbyUser: function () {
		return url + "/api/workflow/getlistProcessbyUser";
	},

	//Requests

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

	//getAllForms
	getAllForms: function () {
		return "/api/form/findAllForm";
	},
};
