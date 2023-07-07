import "./assets/styles/styles.scss";



//_______________________CARROUSEL___________________________________
//page accueil & service (carrousel)
// obtiens  l'element de  slider
var slider = document.getElementById("slider");

// obtiens  les element de la diapositives
var slides = slider.querySelectorAll(".slide");

// Creation d'un index pour commencer le diapositive
var indice = 0;

// fonction pour montrer le second diapositives
function next() {
  // Ocultamos todas las diapositivas
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Incrementamos el índice
  indice++;

  // Si llegamos al final de la lista de diapositivas, volvemos al principio
  if (indice >= slides.length) {
    indice = 0;
  }

  // Mostramos la diapositiva actual
  slides[indice].style.display = "block";
}

// Mostramos la primera diapositiva
next();

// Establecemos un intervalo para mostrar la siguiente diapositiva cada 3 segundos
setInterval(next, 3000);

$(document).ready(function () {
  $(".img_container img:first-child").addClass("active");

  var lastScrollTop = 0;

  $(window).scroll(function () {
    var st = $(this).scrollTop();
    if (st > lastScrollTop) {
      // Scroll vers le bas
      $(".toBeFaded").fadeIn(2000);
    } else {
      // Scroll vers le haut
      $(".toBeFaded").fadeOut(2000);
    }
    lastScrollTop = st;
  });

  var nbrImgs;
  var counter;
  var leftValue;

  function init(elem) {
    counter = elem.parent().find(".img_container img.active").index();
    leftValue = counter * -100;
    nbrImgs = elem.parent().find(".img_container img").length;
  }

  function handleCarousel(scenario, elem) {
    var eqPosition;

    if (scenario == 1) {
      eqPosition = counter - 1;
      leftValue += 100;
    } else {
      eqPosition = counter + 1;
      leftValue -= 100;
    }

    elem.parent().find(".img_container img").removeClass("active");
    elem.parent().find(".img_container img").eq(eqPosition).addClass("active");
    elem
      .parent()
      .find(".img_container")
      .animate({ left: leftValue + "%" }, 1000);
  }

  $(".arrow_left").click(function () {
    init($(this));
    if (counter > 0) {
      handleCarousel(1, $(this));
    }
  });

  $(".arrow_rigth").click(function () {
    init($(this));
    if (counter < nbrImgs - 1) {
      handleCarousel(2, $(this));
    }
  });
});
