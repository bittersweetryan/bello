app.views.TaskView = Backbone.View.extend({

	editTemplate : '#edit-item',

	template : '#list-item',

	tagName : 'li',

	events : {
		'keyup input[type=text]'    : 'save',
		'keyup select'				: 'save',
		'click .edit'               : 'edit',
		'click .remove'             : 'deleteTask'
	},

	initialize : function( model ){

		this.model = model || new app.models.Task();

		this.template = _.template( $( this.template).html() );

		this.editTemplate = _.template( $( this.editTemplate).html() );
	},

	save : function( e ){

		if( e.which && e.which === 13 ){

			this.model.set( 'description', this.$el.find( 'input' ).val() );
			this.model.set( 'list', this.$el.find( 'select' ).val() );

			if( this.model.get( 'id' ) ){
				this.model.save();
			}
			else{
				this.model = app.collections.todos.create( this.model );
			}

			this.render();

		}
		if( e.which && e.which === 27 ){
			this.$el.html( this.template( this.model.toJSON() ) );
		}
	},

	edit : function( e ){
		//should be in render
		this.$el.html( this.editTemplate( this.model.toJSON() ) );

		this.setFocus();
	},

	render : function(){

		this.$el.html(
			( this.model.get( 'id' ) ) ? this.template( this.model.toJSON() ) : this.editTemplate( this.model.toJSON() )
		);

		return this;
	},

	setFocus : function(){
		this.$el.find( 'input' ).focus();
	},

	deleteTask : function(){
		this.model.destroy();

		this.remove();
	}
});