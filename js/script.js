$(document).ready(function () {
  const json_url = 'http://majer.tangun.pl/standups.json';

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var obj = JSON.parse(this.responseText);

          var $card_deck = $("<div>", {"class": "cardDeck"});
          $("#cards").append($card_deck);

          for (var i = 0; i < obj.standups.length; i++) {
            var $div = $("<div>", {"class" : "cardColor " + i});
            var $div2 = $("<div>", {"class" : "singleCard"});
            var $text = $("<span>", {"class" : "text"});
            var $description = $("<span>", {"class" : "description desc-"+i}).hide();
            var $img = $("<img>", {"src": obj.standups[i].poster, "class" : "img-fluid", id: "poster"});
            var $p = $("<p>", {id: "data", "class" : "card-text"});
            var $buttonInfo = $("<a>", {"href":"#", "class" : "buttonInfo "+i});
            $buttonInfo.append("Opis");

            $p.append("<b>" + obj.standups[i].artist + "</b> : " + obj.standups[i].title);

            $text.append(
              "<span class='duration'>Długość: " + obj.standups[i].duration_min + " min | " + obj.standups[i].year + " rok </span><br />" +
              "<a href='"+obj.standups[i].imdb_link+"'class='imdbLink' target='_blank'>Ocena imdb: " + obj.standups[i].imdb_rate + "</a> <br />" +
              "<a href='"+ obj.standups[i].netflix_link +"' class='buttonNetflix' target='_blank'>Netflix</a><br />"
            );

            $description.append(
              obj.standups[i].description + "<br />"
              //+ "<a href='#' class='buttonBack'>cofnij</a>"
            );

            $card_deck.append($div);
            $div.append($div2);
            $div2.append($text);
            $text.append($buttonInfo);
            $div2.append($description);
            $div2.append($img);
            $div2.append($p);

            $buttonInfo.click(info);
            function info() {
              for (var j = 0; j < obj.standups.length; j++) {
                var tmp = $(this).hasClass(j);
                if (tmp) {
                  $(this).parent(".text").css("display","none");
                  $(this).parents().find(".desc-"+j).show();
                }
              } return false;
            }

            $description.click(back);
            function back() {
              $(this).hide();
              $(this).siblings(".text").show();
            }
          }

      }
  };
  xmlhttp.open("GET", json_url, true);
  xmlhttp.send();
});
