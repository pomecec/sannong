<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="content/static/css/bootstrap-3.2.0/bootstrap.css" rel="stylesheet">
    <title></title>
</head>
<body>
<div class="container">
    <div class="row clearfix">
        <div class="col-md-12 column">
            <jsp:include page='navbar.jsp'/>
        </div>
    </div>
    <div class="row clearfix">
        <div class="col-md-2 column">
            <jsp:include page='sidebar.jsp'/>
        </div>
        <div class="col-md-7 column">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
                <li class="active"><a href="javascript:void(0)" onclick="showQuestions(1)" role="tab" data-toggle="tab" id="q1">项目状态</a></li>
                <li><a href="javascript:void(0)" onclick="showQuestions(2)" role="tab" data-toggle="tab" id="q2">问卷题集二</a></li>
                <li><a href="javascript:void(0)" onclick="showQuestions(3)" role="tab" data-toggle="tab" id="q3">问卷题集三</a></li>
                <li><a href="javascript:void(0)" onclick="showQuestions(4)" role="tab" data-toggle="tab" id="q4">问卷题集四</a></li>
                <li><a href="javascript:void(0)" onclick="showQuestions(5)" role="tab" data-toggle="tab" id="q5">问卷题集五</a></li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
                <form id="answerForm" role="form" action="updateAnswers" method="post">
	                <div class="tab-pane active" id="questionnaire"></div>
	                <input type="hidden" name="answerStatus" id="answerStatus" > 
	                <input type="hidden" name="questionnaireNo" id="questionnaireNo" >
	            </form>
            </div>
            <hr/>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick="submitForm(0)">暂存</button>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick="submitForm(1)">提交</button>
            <sec:authorize access="hasRole('ROLE_ADMIN') and isAuthenticated()">
                <form role="form">
                    <div class="form-group">
                        <label>状态</label>

                        <textarea class="form-control" rows="3"></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary">更新</button>
                </form>
            </sec:authorize>

        </div>
    </div>
</div>
<div class="row clearfix">
    <div class="col-md-12 column">
        <jsp:include page='footer.jsp'/>
    </div>
</div>
</body>
<script src="content/static/js/sannong/personal-center/questionnaire.js"></script>
<script id="question-template" type="text/x-handlebars-template">
    {{#questions}}
	    <div class="J_group_radio">
	        <h5>{{fromOne @index}}. {{questionContent}}</h5>
	        <label class="radio-inline">
	            <input type="radio" name="answers[{{fromZero @index}}]" id="inlineRadio31" value="{{questionNumber}}:a"> {{option1}}
	        </label>
	        <label class="radio-inline">
	            <input type="radio" name="answers[{{fromZero @index}}]" id="inlineRadio32" value="{{questionNumber}}:b"> {{option2}}
	        </label>
	        <label class="radio-inline">
	            <input type="radio" name="answers[{{fromZero @index}}]" id="inlineRadio33" value="{{questionNumber}}:c"> {{option3}}
	        </label>
	        <label class="radio-inline">
	            <input type="radio" name="answers[{{fromZero @index}}]" id="inlineRadio34" value="{{questionNumber}}:d"> {{option4}}
	        </label>
	        <label class="radio-inline">
	            <input type="radio" name="answers[{{fromZero @index}}]" id="inlineRadio35" value="{{questionNumber}}:e"> {{option5}}
	        </label>
	    </div>
    {{/questions}}
</script>
</html>
