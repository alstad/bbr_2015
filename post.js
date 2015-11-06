$("#postform").submit(function(event) {
    var postCode = $("#postKode").val();
    debug("PostKode: " + postCode);
    var json = {"postKode": postCode};
    postToServer(registerPostUrl, json);
    addMessageToLog(false, "Registrerte post: " +postCode);
    event.preventDefault();
});