$(document).ready(function () {
    $(".commandInput").keyup(function (t) {
        if (t.keyCode == 13) {
            var value = $(this).val();
            putCommand(value);
            $(".commands").append("<p>" + value + "</p>");
        }
    });


    var working = false;
    window.setInterval(function () {
        if (document.hidden) { return;}
        if (working) {
            return;
        }
        working = true;

        $.ajax({
            url: '/any-response',
            type: "GET",
            contentType: "text/plain",
            success: function (data) {
                var result = JSON.parse(data);
                
                var keys = Object.keys(result);
                for (var i = 0; i < keys.length; i++) {
                    $(".commands").append("<p>" + keys[i] + ":</p>");
                    $(".commands").append("<p>" + result[keys[i]] + "</p>");
                }


                working = false;
            }
        })

    }, 500);
});


function putCommand(cmd) {
    $.ajax({
        url: '/commands/' + $("#clients").val(),
        type: 'PUT',
        contentType: "application/json",
        data: JSON.stringify({ cmd: cmd }),
        success: function (data) {
            $(".commandInput").val("");
        }
    });
}