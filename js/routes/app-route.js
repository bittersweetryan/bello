app.routes.AppRoute = Backbone.Router.extend({

	routes : {
		''      : 'main'
	},

	main : function(){
		app.views.todoListView.render();
	}
});