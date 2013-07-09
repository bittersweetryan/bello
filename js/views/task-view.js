;( function( $, _, Backbone, undefined){

	//precompile our templates
	var template = _.template( $( '#list-item' ).html() ),
		editTemplate = _.template( $(  '#edit-item' ).html() );

	app.views.TaskView = Backbone.View.extend({

		tagName : 'li',

		events : {
			'keyup input[type=text]'    : 'save',
			'keyup select'				: 'save',
			'click .edit'               : 'edit',
			'click .remove'             : 'deleteTask'
		},

		initialize : function( model ){

			this.model = model || new app.models.Task();
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
				this.$el.html( template( this.model.toJSON() ) );
			}
		},

		edit : function( e ){
			//should be in render
			this.$el.html( editTemplate( this.model.toJSON() ) );

			this.$el.find( 'option[value=' + this.model.get( 'list' ) + ']' ).attr( 'selected', 'selected' );

			this.setFocus();
		},

		render : function(){

			this.$el.html(
				( this.model.get( 'id' ) ) ? template( this.model.toJSON() ) : editTemplate( this.model.toJSON() )
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
}( window.jQuery, window._, window.Backbone ) );
