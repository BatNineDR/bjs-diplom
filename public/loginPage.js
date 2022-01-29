"use strict";

const userFormFirst = new UserForm();

userFormFirst.loginFormCallback = data => {
    ApiConnector.login(data, response => {
        if(response.success) {
            location.reload();
        } else {
            userFormFirst.setLoginErrorMessage(response.error);
        }
    });
}

userFormFirst.registerFormCallback = data => {
    ApiConnector.register(data, response => {
        if(response.success) {
            location.reload();
        } else {
            userFormFirst.setRegisterErrorMessage(response.error);
        }
    });
}