/**
 * Created by Bright Huang on 11/1/14.
 */

define(['jquery', 'bootstrap', 'handlebars', 'sannong', 'validate', 'ajaxHandler', 'jqueryForm', 'formValidator',
        'region', 'additionalMethods'],
    function($, bootstrap, handlebars, sannong, validate, ajaxHandler, jqueryForm, formValidator,
                 region, additionalMethods) {

        "use strict";

        var userProfile = {};
            userProfile.Model = {
                newCellphoneError: '<label id="newCellphone-error" class="error" for="newCellphone" style="display: inline-block;">手机号码已存在</label>'
            };
            userProfile.View = {
                userProfileView: $("#userProfileView"),
                sideBar: $(".sidebar"),
                userManagementTab: $("#userManagementTab"),
                userProfileTab: $("#userProfileTab"),
                userPasswordTab: $("#userPasswordTab"),
                newCellphone: $("#newCellphone"),
                newCellphoneError: $("#newCellphone-error")
            };

            function showValidationError(){
                userProfile.View.newCellphoneError.remove();
                userProfile.View.newCellphone.removeClass("error");
                userProfile.View.newCellphone.after(userProfile.Model.newCellphoneError);
                userProfile.View.newCellphone.addClass("error");
            };


        function sendValidationCode(){
            ajaxHandler.sendRequest({
                url: 'user-profile/sendValidationCode',
                type: 'POST',
                data: {
                    newCellphone: $("#newCellphone").val()
                },
                success: function(response){
                    if (response != "") {
                        $("#validationCode").removeAttr("disabled");
                    } else {
                        $("#validationCode").attr({disabled: "disabled"});
                    }
                },
                fail: function(response){
                    $("#validationCode").attr({disabled: "disabled"});
                }
            });
        }

        userProfile.addEventListener = function(){
            $("#provinceSelect").change(function(event){
                region.Controller.addCities();
            });

            $("#citySelect").change(function(event){
                $('#districtSelect option').remove();
                region.Controller.addDistricts();
            });

            $("#userProfileSubmit").click(function(event){
                var validator = formValidator.getValidator("#userProfileForm");
                if (validator.form() == true){
                    $("#userProfileForm").ajaxSubmit(function(message) {
                        $("#return").after('<label id="jobTitle-error" class="error" for="jobTitle">已保存</label>');
                        return false;
                    });
                }
            });

            $("#validationCodeBtn").click(function(event){
                ajaxHandler.sendRequest({
                    type: "GET",
                    url: "user-profile/validateUniqueCellphone",
                    data:{cellphone: $("#newCellphone").val()},
                    success: function(response){
                        if (response == true){
                            var validator = formValidator.getValidator("#userProfileForm");
                            var newCellphoneValid = validator.element($("#newCellphone"));
                            if (validator.form() == true && newCellphoneValid == true ){
                                additionalMethods.updateTimeLabel("#action-send-code", "验证码");
                                sendValidationCode();
                            }
                        }else{
                            showValidationError();
                        }
                    },
                    fail: function(){
                        showValidationError();
                    }
                });
            });
        }

        userProfile.show = function(){
            userProfile.Controller.renderUserProfileView("", "#userProfileView");
        }

        userProfile.Controller = {
            emptyUserProfileView: function(){
                $("#userProfileView").empty();
            },
            renderUserProfileView: function(userName, viewName){
                ajaxHandler.sendRequest({
                    type: "GET",
                    url: "user-personal-center/user-profile",
                    data:{userName: userName},
                    success: function(response){
                        if (response.statusCode < 2000){
                            var userProfileViewHandler = handlebars.compile($("#user-profile-template").html());
                            var html = userProfileViewHandler(response.models.userProfile);
                            $(viewName).empty();
                            $(viewName).append(html);

                            region.Controller.addCityOptions(viewName + " #citySelect", response.models.cities);
                            region.Controller.addDistrictOptions(viewName + " #districtSelect", response.models.districts);
                            region.Controller.selectOption(viewName + " #provinceSelect", response.models.userProfile.companyProvince);
                            region.Controller.selectOption(viewName + " #citySelect", response.models.userProfile.companyCity);
                            region.Controller.selectOption(viewName + " #districtSelect", response.models.userProfile.companyDistrict);

                            region.select('select', {
                                provinceOption: {
                                    value: response.models.userProfile.companyProvince,
                                    text: $("#provinceSelect option:selected").text()
                                },
                                cityOption: {
                                    value: response.models.userProfile.companyCity,
                                    text: $("#citySelect option:selected").text()
                                },
                                districtOption: {
                                    value: response.models.userProfile.companyDistrict,
                                    text: $("#districtSelect option:selected").text()
                                }
                            });

                            userProfile.addEventListener();
                        }
                    },
                    fail: function(){
                    }
                });
            }
        };

        $(function() {

            region.select('select');

            userProfile.addEventListener();
        });

        sannong.UserProfile = userProfile;
        return userProfile;

});