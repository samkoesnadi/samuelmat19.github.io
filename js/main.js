// cd js; watchify main.js -o bundle.js -v

"use strict";
global.$ = require("jquery");
global.jQuery = $;
var db = require("./db.js")();
// require("../include/jGravity.js");
var onclickcopy_input = false; // Toggle click_copy to be a button or not
var copy_text_global = "";

function checkKeyup(id_str, func, range='str') { // 13 is to detect Enter! // the func has one argument of the typed value
    $(id_str).on('keyup input', function (e) {
        // alert(e.keyCode || e.which);
        // if (range=='num') {
        //     if (e.keyCode>=48&&e.keyCode<=57) {
        //         func($(this).val());
        //     }
        // } else {
        //     func($(this).val());
        // }
        func($(this).val());
    });
} // To check everytime the key is up on specific element

function connectMouseDown (target, callback) {
    if (onclickcopy_input==false) {
        $(target).val(" Click here");
        $(target).css("cursor", "pointer");
        $(target).on('mousedown', callback);
        onclickcopy_input = true;
    }
}

// Here comes the real deal of the program
const copyID_length = 10;
$(document).ready(function() {
    checkKeyup("#copy_input", function(val) {
        db.get(val, function(msg_str) {
            $("#copy_textarea").val(msg_str);
        });
    }, 'num');
    checkKeyup("#copy_textarea", function(val) {
        copy_text_global = val;
        if (val != '') {
            connectMouseDown("#copy_input", function () { // After it is click
                $("#copy_input").css("cursor", "auto");
                $("#copy_input").unbind();
                db.add(copy_text_global, function(copy_id) {
                    $("#copy_input").val(copy_id);
                    $("#copy_input").attr("readonly","readonly");
                })
            })
        }
    });
});
