<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

<html>
<head>
  <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
  <title>ChatChat</title>
  <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/yui/reset-fonts-grids.css"/>"> 
  <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/ChatChat/chatchat.css"/>"> 
  <script type="text/javascript" src="<c:url value="/resources/javascripts/jquery/jquery-1.3.2.min.js"/>"></script>
  <script type="text/javascript" src="<c:url value="/resources/javascripts/jquery/jquery.scrollTo-1.4.0-min.js"/>"></script>
  <script type="text/javascript" src="<c:url value="/resources/javascripts/jquery/jquery.hoverpulse.js"/>"></script>
  <script type="text/javascript" src="<c:url value="/resources/javascripts/ChatChat/chatchat.js"/>"></script>
  <script type="text/javascript" src="<c:url value="/dwr/engine.js"/>"></script>
  <script type="text/javascript" src="<c:url value="/dwr/interface/ChatChat.js"/>"></script>
  <script type="text/javascript" src="<c:url value="/dwr/util.js"/>"></script>
  <script type="text/javascript">
  var emoticons = [];
  $(document).ready(function() {
      <c:forEach var="emoticon" items="${emoticon_links}" varStatus="counter">
        emoticons[${counter.index}] = "${emoticon}";
        emoticon_el = $("#emoticon${counter.index}");
        emoticon_el.click(function () {
            $("#messageText").val($("#messageText").val() + ":"+"${emoticon}"+":");
            $("#messageText")[0].focus();
        });
      </c:forEach>
  });
  </script>
</head>

<body>
  <div id="doc2" class="yui-t7">
    <div id="hd"><h1>ChatChat</h1></div>
    <div id="bd">
      <div class="yui-g">
        <div id="chatOutputDiv">
          <ul id="chatOutput"></ul>
        </div>
        <div id="peopleDiv">
          <ul id="people"></ul>
        </div>
        <div id="nameDiv">
            <label for="nameText">nickname:</label>
            <input id="nameText" type="text" />
            <a id="nameButton">enter room</a>
        </div>
        <div id="messageDiv">
            <label for="messageText">message:</label>
            <input id="messageText" type="text" />
            <a id="messageButton">send</a>
        </div>
        <div id="emoticonDiv">
            <c:forEach var="emoticon" items="${emoticon_links}" varStatus="counter">
                <img id="emoticon${counter.index}" title="${emoticon}" src="resources/images/${emoticon}" />
            </c:forEach>
        </div>
      </div>
    </div>
    <div id="ft"><p>ChatChat is a simple DWR demo. For more information on DWR, visit http://directwebremoting.org/</p></div>
  </div>
</body>
</html>
