module.exports = {
	//Workflow

	//get_all_workflow
	all_WF: function () {
		return "http://localhost:8080/api/workflow/findAllWF";
	},

	//UserTask

	//get_all_userTasks
	all_UserTasks: function () {
		return "http://localhost:8080/api/userTask/findAlltasks";
	},
	// find_userTask
	find_UserTask: function () {
		return "http://localhost:8080/api/userTask/findUsertask";
	},

	//affect_Group_to_UserTask
	update_UT: function () {
		return "/api/userTask/updateUT";
	},

	//Group

	//get_all_groups
	all_Groups: function () {
		return "http://localhost:8080/api/group/findAllGroups";
	},

	//Form

	//get_allForms
	get_Forms: function () {
		return "http://localhost:8080/api/form/findAllForms";
	},
	//add_newForm
	add_Form: function () {
		return "/api/form/addForm";
	},
};
