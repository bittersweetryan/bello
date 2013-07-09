window.app = ( function( $, _, Backbone, undefined ){
	return {
		name : 'Bbello',
		version : '0.1',
		start : function(){

			this.routes.appRoute = new this.routes.AppRoute();
			this.collections.todos = new this.collections.Todos();

			this.views.todoListView = new this.views.TodoListView();

			Backbone.history.start();

		},
		collections: {},
		views : {},
		models : {},
		routes : {}
	};

}( window.jQuery, window.underscore, window.Backbone ) );