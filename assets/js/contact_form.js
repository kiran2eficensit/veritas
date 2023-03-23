$(document).ready(function(){
    function emailvalidate(email){
        let regex = new RegExp(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/);
        if(regex.test(email)){
            return false
        }
        else{
            return true
        }
    }
    function numbervalidate(phno){
        if(phno.length == 10){
            return false
        }
        else{
            return true
        }
    }
    $("#successbtn").click(function () {	
        var Name = $("#Name").val();
        var Email = $("#Email").val();
        var ph_num = $("#ph_num").val();
        var Company = $("#Company").val();
        var message = $("#message").val();
        if (Name == '') {
            $('#error_div').show()
                document.getElementById('alery').innerHTML = "Name is Required!"
        }
        else if(Email == ''){
            $('#error_div').show()
                document.getElementById('alery').innerHTML = "Email is Required!"
        }
        else if(ph_num == ''){
            $('#error_div').show()
                document.getElementById('alery').innerHTML = "Phone Number Required!"
        }
        else if(Company == ''){
            $('#error_div').show()
                document.getElementById('alery').innerHTML = "Company is Required!"
        }
        else if(message == ''){
            $('#error_div').show()
                document.getElementById('alery').innerHTML = "Message is Required!"
        }
        else if(emailvalidate(Email)){
            $('#error_div').show()
                document.getElementById('alery').innerHTML = "Enter Correct Email!"
        }
        else if(numbervalidate(ph_num)){
            $('#error_div').show()
                document.getElementById('alery').innerHTML = "Enter Correct Phone Number!"
        }
        else {
            // AJAX Code To Submit Form.
            $.ajax({
                type: "POST",
                url: "https://us-central1-emailservice-4e7fc.cloudfunctions.net/api/sendemail",
                data: {
                    "dynamic_template_data":{
                                 "email": Email,
                                 "firstname": Name,
                                 "lastname": Name,
                                 "phonenumber": ph_num,
                                 "comments": message,
                                 "subject":"Thank you for contacting Veritas Weaver",
                              },
                     "body":"This is a test mail",
                    //  "to":[email],
                     "to" : [Email],
                     "cc" : [], 
                     "bcc" : [],
                     "attachments":[
                   ],
                   "template_id":"d-60d22d7065964ac8ab47358a0b1c8e28"
                   },
                cache: false,
                success: function (result) {
                    $('#error_div').hide()
                    $("#successsent").show();
                    setTimeout($("#successsent").hide(), 5000);
                }
            });
        }
        return false;
    });
});