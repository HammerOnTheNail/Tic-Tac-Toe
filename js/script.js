jQuery(function ($) {
    var actplayer = 1;
    var vannyertes = false; 
    var player1 = 0;
    var player2 = 0;
    // Átméretezéskor arányszámítás
    $(window).resize(function () {
        if ($(window.top).innerHeight() < $(window.top).innerWidth()) {
            var arany = $(window.top).innerHeight() / 512;
            $('.gamebg').css('height', 512 * arany);
            $('.gamebg').css('width', 512 * arany);
        }
    });

    $('.gamebg td').on('click', function () {
        //itt vizsgáljuk hogy van e nyertes
        if (vannyertes === true){
            return false;
        }    
        // HA már valaki elfogallta ezt a mezőt, akkor nem megyünk tovább
        if (
                $(this).data('player') == 1 ||
                $(this).data('player') == 2
                ) {
            return false;
        }

        // Letároljuk, hogy melyik játékos kattintott az adott mezőbe
        $(this).data('player', actplayer);

        // Beszúrjuk az adott játékos jelét
        var $img = $('<img>');
        if (actplayer == 1) {
            $img.attr('src', 'images/circle.svg');
            actplayer = 2;
        } else {
            $img.attr('src', 'images/x.svg');
            actplayer = 1;
        }
        $(this).append($img);

        // Le ellenőrizzük, hogy a beszúrás után mi az állás
        
        for (var playerid = 1; playerid <= 2; playerid++) {
            for (var i = 1; i <= 3; i++) {
                if (
                    (
                        ($('#1'+i).data('player') == playerid) &&
                        ($('#2'+i).data('player') == playerid) &&
                        ($('#3'+i).data('player') == playerid)
                    ) ||
                    (
                        ($('#'+i+'1').data('player') == playerid) &&
                        ($('#'+i+'2').data('player') == playerid) &&
                        ($('#'+i+'3').data('player') == playerid)
                    )
                ) {
                    vannyertes = true;
                }
            }
            if (vannyertes == false){
                if (
                        (
                            $('#11').data('player') == playerid &&
                            $('#22').data('player') == playerid &&
                            $('#33').data('player') == playerid 
                        ) ||
                        (
                            $('#13').data('player') == playerid &&
                            $('#22').data('player') == playerid &&
                            $('#31').data('player') == playerid 
                        )
                ) {
                    vannyertes =true;
                }
            }
            if (vannyertes == true){
                break;
            }
        }
        if (vannyertes == true){
            var winnermessage = "";
            if (playerid === 1){
                player1++;
                winnermessage = "A nyertes az "+playerid+" játékos";
            }else{
                player2++;
                winnermessage = "A nyertes a "+playerid+" játékos";
            }
            $("#dialog-end").html(winnermessage).dialog({
                modal: true,
                buttons: {
                    "Új játék": function() {
                        vannyertes = false;
                        $('.gamebg td').html('');
                        $('.gamebg td').data('player','');
                        $(this).dialog("close");
                    }
                }
            });
            $("#p1").html(player1);
            $("#p2").html(player2);
        }
    });

    $(window).resize();
});
