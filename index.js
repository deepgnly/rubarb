$(document).ready(function () {
    let useHttp = false
    let str = localStorage.getItem("item")
    if (str != null && str !== undefined && str != "") {
        let js = JSON.parse(str)

        $("#jobDescriptionHolder").val(js["jobDesc"])
        $("#resumeHolder").val(js["resume"])
        $("#excludedWordsHolder").val(js["excludedWords"])
    }

    $("#execute").click(function () {

        let d = {
            "jobDesc": $("#jobDescriptionHolder").val(),
            "resume": $("#resumeHolder").val(),
            "excludedWords": $("#excludedWordsHolder").val()
        }

        localStorage.setItem("item", JSON.stringify(d))

        if (useHttp === true) {
            $.ajax({
                type: 'POST',
                url: '/test',
                data: JSON.stringify(d),
                success: function (data) {
                    $("#commonWordsHolder").val(data["intersection"])
                    $("#missingWordsHolder").val(data["difference"])

                },
                contentType: "application/json",
                dataType: 'json'
            })
        } else {
            let data = execute($("#jobDescriptionHolder").val(), $("#resumeHolder").val(), $("#excludedWordsHolder").val())
            $("#commonWordsHolder").val(data["intersection"])
            $("#missingWordsHolder").val(data["difference"])
        }
    })
})
