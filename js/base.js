function loadApp() {

	var flipbook = $('.sample-docs');

	// Check if the CSS was already loaded

	if (flipbook.width()==0 || flipbook.height()==0) {
		setTimeout(loadApp, 10);
		return;
	}

	// Arrows

	$(document).keydown(function(e){

		var previous = 37, next = 39;

		switch (e.keyCode) {
			case previous:

				$('.sample-docs').turn('previous');

			break;
			case next:

				$('.sample-docs').turn('next');

			break;
		}

	});

  //next and previous buttons

  $("#next").click(function(){
      $('.sample-docs').turn('next');
  });

  $("#previous").click(function(){
      $('.sample-docs').turn('previous');
  });

  //jump button

  $("#jmp-btn").click(function(){
    var pg = $("#nos-val").val() ;
    if(pg>0 && pg<81){
    $(".sample-docs").turn('page',pg) ;
    }
    else{
      alert("Invalid Page Number") ;
    }
  });

	//table of content

	$("#toc").click(function(){
		$(".sample-docs").turn('page', 2) ;
	});

	//pdf buttons

	$("#pdf").click(function(){
		window.open("files/Level_1.pdf","_blank") ;
	});

	// Create the flipbook

	flipbook.turn({
		elevation: 0,
		acceleration: false,
		gradients: true,
		autoCenter: true,
		duration: 2000,
		pages: 80,
		when: {

		turning: function(e, page, view) {

			var book = $(this),
			currentPage = book.turn('page'),
			pages = book.turn('pages');

			if (currentPage>3 && currentPage<pages-3) {
				if (page==1) {
					book.turn('page', 2).turn('stop').turn('page', page);
					e.preventDefault();
					return;
				} else if (page==pages) {
					book.turn('page', pages-1).turn('stop').turn('page', page);
					e.preventDefault();
					return;
				}
			} else if (page>3 && page<pages-3) {
				if (currentPage==1) {
					book.turn('page', 2).turn('stop').turn('page', page);
					e.preventDefault();
					return;
				} else if (currentPage==pages) {
					book.turn('page', pages-1).turn('stop').turn('page', page);
					e.preventDefault();
					return;
				}
			}

			Hash.go('page/'+page).update();

			if (page==1 || page==pages)
				$('.sample-docs .tabs').hide();


		},

		turned: function(e, page, view) {

			var book = $(this);

			if (page!=1 && page!=book.turn('pages'))
				$('.sample-docs .tabs').fadeIn(500);
			else
				$('.sample-docs .tabs').hide();

			book.turn('center');
			updateTabs();

		},

		missing: function (e, pages) {

			for (var i = 0; i < pages.length; i++)
				addPage(pages[i], $(this));

		}
	}
	});

	flipbook.addClass('animated');

	// Show canvas

	$('#canvas').css({visibility: 'visible'});
}

// Hide canvas

$('#canvas').css({visibility: 'hidden'});

yepnope({
	test: Modernizr.csstransforms,
	yep: ['vendor/turnjs4/lib/turn.min.js', 'css/jquery.ui.css'],
	nope: ['vendor/turnjs4/lib/turn.html4.min.js', 'css/jquery.ui.html4.css'],
	both: ['css/docs.css', 'js/docs.js'],
	complete: loadApp
});

var l = getlinks() ;
for(i=0; i<l.links.length; i++)
{
  var x = document.createElement("IMG");
  x.setAttribute("src", l.links[i]);
  document.getElementById('target').appendChild(x);
}
