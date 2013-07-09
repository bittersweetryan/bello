app.routes.AppRoute = Backbone.Router.extend({

	routes : {
		''      : 'main',
		'add'   : 'add'
	},

	main : function(){
		app.views.todoListView.render();
	},

	add : function(){

	}
});