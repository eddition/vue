'use strict'

var vm = new Vue({
	el: '#widget',

	data: {
		id      :   0,
		title   : '',
		imgPath : '',
		desc    : '',
		rating  : '',
		link    : '',
		apiLink : "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?limit=5&country=us&apikey=6czx2pst57j3g47cvq9erte5",
		list    : []
	}, 

	ready: function(){
		this.getList();
	}, 

	methods: {
		getList: function(){
            this.$http.get(this.apiLink, function (data, status, request) {
                this.list = data.movies;
    			this.setMovie();
                this.loading = false;
            })
            .error(function (data, status, request) {
                console.log('error');
            })
        },
        setMovie: function(e){
        	if (e){
        		var i = parseInt(e.currentTarget.getAttribute('val'));
        		this.toggleActiveClass(e.currentTarget);
        	} else {
        		i = 0
        	}

        	var movie = this.list[i];
        	this.title = movie.title;
        	this.imgPath = movie.posters.thumbnail;
        	this.desc = movie.synopsis;
        	this.rating = this.calcRating(movie.ratings.audience_score);
        	this.link = movie.links.alternate;
        	this.renderRatings();
        },
        calcRating: function(score){
        	var rating = Math.floor(score/20);
        	return rating;
        },

        renderRatings: function(){
        	var parent = document.getElementsByClassName('ratings-container')[0];
        	// Empty Rating Container
        	while(parent.firstChild){ parent.removeChild(parent.firstChild) }
        	// Append Stars to ratings container based on rating
        	for(var i = 0; i < this.rating; i++){
        		var star = document.createElement('img');
        		star.classList.add('star');
        		star.setAttribute('src', 'assets/star.svg')
        		parent.appendChild(star);
        	}
        },

        toggleActiveClass: function(el){
        	var active = document.getElementsByClassName('active');
        	active[0].classList.remove('active');
        	el.classList.add('active');
        }
	}
});