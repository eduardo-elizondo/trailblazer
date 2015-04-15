$(document).ready(
  function(){
      $('a[href^="#"]').on('click',function (e) {
          e.preventDefault();

          var target = this.hash,
          $target = $(target);

          $('html, body').stop().animate({
              'scrollTop': $target.offset().top
          }, 900, 'swing', function () {
              window.location.hash = target;
          });
      });


    });

    window.addEventListener("scroll", function() {
      if (window.scrollY < 635) {
          $('.navbar').fadeOut();
      }
      else {
          $('.navbar').css('visibility','visible').fadeIn();
          
          (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=1526503704250994&version=v2.0";
            fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'));
      }
    },false);


    $(document).ready(function() {
      $('.test-popup-link').magnificPopup({type:'image'});
    });