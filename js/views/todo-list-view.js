app.views.TodoListView = Backbone.View.extend({

	el : '#todo-list',

	events : {
		'click #add' : 'add'
	},

	//maintain a list of task views that are active
	taskViews : [],

	initialize: function(){
		//load from localstorage upon creation
		app.collections.todos.fetch();

		//listen to the collection for items being changed and removed
		this.listenTo( app.collections.todos, 'change', this.arrangeCards );
		this.listenTo( app.collections.todos, 'remove', this.removeView );
	},

	render : function( ){

		app.collections.todos.forEach(
			_.bind( this.appendTask, this )
		);
	},

	arrangeCards : function( ){
		_.each( this.taskViews, function( view ){

			//compare the list of the view to its list
			if( view.$el.parents( 'section' ).attr( 'id' ) !== view.model.get( 'list' ) ){
				view.$el.appendTo( this.$el.find( '#' + view.model.get( 'list' ) ).find( 'ol' ) );
			}
		}, this);
	},

	add : function(){
		this.appendTask();
	},

	appendTask : function( task ){

		var taskView = new app.views.TaskView( task ).render();

		this.taskViews.push( taskView );

		this.$el.find( '#' + ( taskView.model.get( 'list' ) || 'todo' ) ).find( 'ol' ).append( taskView.$el );

		taskView.setFocus();
	},

	//when listening to a remove event on a collection the event listener gets 2 arguments: 
	//model that was removed and the new collection
	removeView: function( removed ){

		this.taskViews = _.filter( this.taskViews, function( view ){
			return view.model.get( 'id' ) !== removed.get( 'id' );
		});
	}
});
