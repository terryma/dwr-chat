var nick = "";

$(document).ready(function() {
    dwr.engine.setActiveReverseAjax(true);
    ChatChat.getStates();
    // hide the chat input div on start
    $("#messageDiv").hide();
    $("#nameButton").click(sendName);
    $("#nameText").keyup(function(e) {
        if(e.keyCode == 13) {
            sendName();
        }
    });
    $("#messageButton").click(sendMessage);
    $("#messageText").keyup(function(e) {
        if(e.keyCode == 13) {
            sendMessage();
        }
    });
    $(window).bind("beforeunload", function() {
        leave();
    });
});

function sendName() {
    nick = $("#nameText").val();
    // TODO: validate name?
    if(nick == "") return;
    ChatChat.registerName(nick);

    send(getTime() + ">" + "(" + nick + " joined the room...)");
    $("#nameDiv").hide();
    $("#messageDiv").show();
}

function sendMessage() {
    message = $("#messageText").val();
    if(message == "") return;
    send(getTime() + " " + nick + ">" + message);
    $("#messageText").val("");
}

function leave() {
    if (nick == null || nick == "") return;
    ChatChat.unregisterName(nick);
    send(getTime() + ">" + "(" + nick + " left the room...)");
}

function send(message) {
    ChatChat.sendMessage(message);
    update(message);
}

function update(message) {
    var listEl = $("<li/>");
    // break message down into escaped section + unescape section(emoticon) + escaped section + unescaped section....
    var messageSections = processEmoticons(message);
    for (var i = 0; i < messageSections.length; i+=2) {
        var unescape = messageSections[i];
        var escape = messageSections[i+1];
        if (unescape != null && unescape != "")
            listEl = listEl.append($("<div/>").text(unescape).html());
//      listEl = listEl.text(unescape);
        if (escape != null && escape != "")
            listEl = listEl.append(escape);
    }
    listEl.appendTo("#chatOutput");
//  $("<li/>").text(message).appendTo($("#chatOutput"));
//  dwr.util.addOptions("chatOutput", [message]);
    scroll();
}

//This function will take in a user inupt message, and break it down into sections of escape and unescape chunks
function processEmoticons(message) {
    var sections = [];
    // an emoticon is of the form :emoticon_name:
    // first find the '>' symbol in every message
    var i = 0, j = 0, k = 0, l = 0; // i is the beginning, j is first colon, and k is second colon
    l = message.indexOf(">");
    if (l == -1) {
        sections[0] = message;
        return;
    }

    // 00:11:22 terry>hello world -> nothing is changed
    // 00:11:22 terry>hello world :blah: hello world -> is :blah: is a valid emoticon, then replace :blah: with <img src="blah">
    var ii = 0;
    var jj = 1;
    while(true) {
        j = message.indexOf(":", l);
        if (j == -1) break;
        k = message.indexOf(":", j+1);
        if (k == -1) break;

        var textInBtw = message.substring(j+1, k);
        var found = false;
        for (var e in emoticons) {
            if (textInBtw == emoticons[e]) {
                found = true;
                break;
            }
        }
        if (found) {
            sections[ii] = message.substring(i, j);
            ii+=2;
            sections[jj] = '<img class="emoticon" src="resources/images/' + textInBtw + '"/>';
            jj+=2;
            i = k + 1;
            l = k + 1;
        } else {
            l = k;
        }
    }

    sections[ii] = message.substring(i);
    sections[jj] = null;
    return sections;
}

function updateAll(messages) {
    for (var i in messages) {
        update(messages[i]);
    }
//  dwr.util.addOptions("chatOutput", messages);
    scroll();
}

function updatePeople(names) {
    dwr.util.removeAllOptions("people");
    dwr.util.addOptions("people", names);
}

function scroll() {
    var div = document.getElementById("chatOutputDiv");
    div.scrollTop = div.scrollHeight;
}

function getTime() {
    var currentTime = new Date();
    var hour = currentTime.getHours();
    if (hour < 10) hour = "0"+hour;
    var minute = currentTime.getMinutes();
    if (minute < 10) minute = "0"+minute;
    var second = currentTime.getSeconds();
    if (second < 10) second = "0"+second;
    return hour + ":" + minute + ":" + second;
}

function log(msg) {
    $("<p/>").text(msg).appendTo($("body"));
}
