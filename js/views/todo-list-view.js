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

	//when the list renders tell it to add all the todos from the collection
	render : function( ){

		app.collections.todos.forEach(
			_.bind( this.appendTask, this )
		);
	},

	arrangeCards : function( ){

		_.each( this.taskViews, function( view ){

			//compare the sections list to the list value of the model, if they don't match
			//put it in the right list
			if( view.$el.parents( 'section' ).attr( 'id' ) !== view.model.get( 'list' ) ){
				this.addToList( view.model.get( 'list' ), view.$el );
			}
		}, this);
	},

	add : function(){
		//proxy to append call append task with no arguments
		this.appendTask();
	},

	appendTask : function( task ){
		//create a new task view
		var taskView = new app.views.TaskView( task ).render();
		//add it to the internal array
		this.taskViews.push( taskView );
		//append it to the right list
		this.addToList( taskView.model.get( 'list' ), taskView.$el );

		taskView.setFocus();
	},

	addToList : function( list, $el ){
		this.$el.find( '#' + ( list || 'todo' ) ).find( 'ol' ).append( $el );
	},
	//when listening to a remove event on a collection the event listener gets 2 arguments: 
	//model that was removed and the new collection
	removeView: function( removed ){

		this.taskViews = _.filter( this.taskViews, function( view ){
			return view.model.get( 'id' ) !== removed.get( 'id' );
		});
	}
});
