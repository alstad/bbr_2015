function showWeapons(weapons) {
    //console.log("Weapons", messages.meldinger);
    $('#weapons').empty();
    if (weapons.length == 0) {
        $('#weapons').html("No weapons");
    } else {
        $.each(weapons, function(index, weapon) {
            console.log("Weapon: ", weapon);
            //$('#weapons').add("div");
            //$('#weapons').append("test");
            $('#weapons').append("<input type=\"radio\" name=\"vaapenId\" value=\"" +weapon.vaapenId  +"\"> " +weapon.vaapenId +":" +weapon.beskrivelse +"<br>");
        });
        $('#weapons').append("<input type=\"radio\" name=\"vaapenId\" value=\"NONE\"> INGEN<br><p/>");
    }
}

$("#postform").submit(function(event) {
    var postCode = $("#postKode").val();
    var vaapenId = $('input:radio[name=vaapenId]:checked').val();
    debug("PostKode: " + postCode);
    debug("VaapenId: " + vaapenId);
    if (vaapenId && vaapenId != "NONE") {
        var json = {"postKode": postCode, "v&aring;pen": vaapenId};
    } else {
        var json = {"postKode": postCode};
    }
    postToServer(registerPostUrl, json);
    addMessageToLog(false, "Registrerte post: " +postCode);
    $("#postKode").val("");
    event.preventDefault();
});