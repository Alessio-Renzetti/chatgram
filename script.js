let invio_username = $("#arrow")
let invio_messaggio = $("#invio_messaggio")
let user = $("#lable")
invio_username.click(function () {
    $("#fix_main").
        hide(500)
    $("#second").
        fadeIn(200)
    user = $("#lable").val()
    setInterval(function () {
        $.get("http://192.168.1.237/chatgram/leggi.php", function (data) {
            let leggi = JSON.parse(data)
            $("#utenti_online").empty()
            $("#mex_content").empty()
            for (i in leggi.utenti_online) {
                $("#utenti_online").
                    append($("<div>").
                    addClass("flex").
                    css("margin-bottom","1rem").
                        append($("<div>").
                            html(`<i class="fa-solid fa-user" style="color:dodgerblue;"></i>`)).
                        append($("<div>").html(`&nbsp;${leggi.utenti_online[i]}`)));
            }
            for (j in leggi.messaggi) {
                if (leggi.messaggi[j].utente == user) {
                    $("#mex_content").
                        append($("<div>").
                            addClass("box_user_mex").
                            append($("<div>").
                                addClass("user_mex").
                                append($("<div>").
                                    addClass("top_mex").
                                    append($("<div>").
                                        addClass("flex").html(`<i class="fa-solid fa-user"></i>`).
                                        append($("<div>").html(`&nbsp;${leggi.messaggi[j].utente}`))).
                                    append($("<div>").text(`${leggi.messaggi[j].timestamp}`))).
                                append($("<div>").text(`${leggi.messaggi[j].messaggio}`))));
                }
                else {
                    $("#mex_content").
                        append($("<div>").
                            addClass("box_server_mex").
                            append($("<div>").
                                addClass("server_mex").
                                append($("<div>").
                                    addClass("top_mex").
                                    append($("<div>").
                                        addClass("flex").
                                        html(`<i class="fa-solid fa-user"></i>`).
                                        append($("<div>").html(`&nbsp;${leggi.messaggi[j].utente}`))).
                                    append($("<div>").text(`${leggi.messaggi[j].timestamp}`))).
                                append($("<div>").text(`${leggi.messaggi[j].messaggio}`))));
                }
            }
        })
    }, 1000)
})
$("#invio_messaggio").click(function () {
    let messaggio = $("#messaggio").val()
    $.post("http://192.168.1.237/chatgram/inserisci_messaggio.php", { "username": user, "messaggio": messaggio })
    $("#messaggio").val("");
})