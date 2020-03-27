module.exports = {
	//Get all Workflow
	all_WF: function() {
		return "http://localhost:8080/findAllWF";
	},
	// Get all User Tasks
	all_UserTasks: function() {
		return "http://localhost:8080/findAlltasks";
	},
	//Get all groups of users
	all_Groups: function() {
		return "http://localhost:8080/findAllGroups";
	}
};
