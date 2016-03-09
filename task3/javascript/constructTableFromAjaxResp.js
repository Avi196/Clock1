/**
 * Created by igor on 9/3/16.
 */
$(document).ready(function() {

    $('#mailsTable').DataTable( {
        ajax : {
            url : "https://db4.insightglobe.net/career/mail",
            dataSrc : "mails"
        },
        columns : [
            { data : "from" },
            { data : "to" },
            { data : "date" },
            { data : "folder" },
            { data : "id" },
            { data : "subject" }
        ]
    } );
} );
