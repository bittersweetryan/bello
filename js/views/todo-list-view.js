app.views.TodoListView = Backbone.View.extend({

	el : '#todo-list',

	events : {
		'click #add' : 'add'
	},

	taskViews : [],

	initialize: function(){
		app.collections.todos.fetch();

		this.listenTo( app.collections.todos, 'change', this.arrangeCards );
		this.listenTo( app.collections.todos, 'remove', this.removeView );
	},

	//when listening to a collection the event listener gets 3 arguments: model that was changed, collection, and options passed into the create
	render : function( task ){

		var self = this;

		if( !task ){
			app.collections.todos.forEach(
				_.bind( this.appendTask, this )
			);
		}
		else{
			this.appendTask( task );
		}
	},

	arrangeCards : function( ){
		_.each( this.taskViews, function( view ){

			if( view.$el.parents( 'section' ).attr( 'id' ) !== view.model.get( 'id' ) ){
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

	removeView: function( removed ){

		this.taskViews = _.filter( this.taskViews, function( view ){
			return view.model.get( 'id' ) !== removed.get( 'id' );
		});
	}
});
