app.collections.Todos = Backbone.Collection.extend({

	localStorage : new Backbone.LocalStorage('todos'),

	model : app.models.Task
});