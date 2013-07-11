window.app = ( function( $, Backbone, undefined ){

	return {
		name : 'Bello',
		version : '0.1',
		start : function(){

			/* don't include these right away */
			this.routes.appRoute = new this.routes.AppRoute();
			this.collections.todos = new this.collections.Todos();

			this.views.todoListView = new this.views.TodoListView();
			/* end don't include */

			Backbone.history.start();

		},
		collections: {},
		views : {},
		models : {},
		routes : {}
	};

}( window.jQuery, window.Backbone ) );