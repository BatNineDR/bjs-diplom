"use strict";

const userLogout = new LogoutButton();

userLogout.action = () => {
    ApiConnector.logout(response => {
        if(response.success) {
            location.reload();
        }
    });
}

ApiConnector.current(response => {
    if(response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoardFirst = new RatesBoard();

ratesBoardFirst.exchangeRatesCallback = () => {
    ApiConnector.getStocks(response => {
        if(response.success) {
            ratesBoardFirst.clearTable();
            ratesBoardFirst.fillTable(response.data);
        }
    });
}

ratesBoardFirst.exchangeRatesCallback();
setInterval(ratesBoardFirst.exchangeRatesCallback, 60000);

const moneyManagerFirst = new MoneyManager();

moneyManagerFirst.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManagerFirst.setMessage(response.success, `Ваш ${data.currency} счет успешно пополнен!`);
        } else {
            moneyManagerFirst.setMessage(response.success, response.error);
        }
    });
}

moneyManagerFirst.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManagerFirst.setMessage(response.success, `Конвертация валют из ${data.fromCurrency} в ${data.targetCurrency} произведена успешно!`);
        } else {
            moneyManagerFirst.setMessage(response.success, response.error);
        }
    });
}

moneyManagerFirst.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManagerFirst.setMessage(response.success, `Перевод ${data.amount} ${data.currency} произведен успешно!`);
        } else {
            moneyManagerFirst.setMessage(response.success, response.error);
        }
    });
}

const favoritesWidgetFirst = new FavoritesWidget();

favoritesWidgetFirst.getFavoritesCallback = () => {
    ApiConnector.getFavorites(response => {
        if(response.success) {
            favoritesWidgetFirst.clearTable();
            favoritesWidgetFirst.fillTable(response.data);
            moneyManagerFirst.updateUsersList(response.data);
        }
    });
}

favoritesWidgetFirst.getFavoritesCallback();

favoritesWidgetFirst.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if(response.success) {
            favoritesWidgetFirst.clearTable();
            favoritesWidgetFirst.fillTable(response.data);
            moneyManagerFirst.updateUsersList(response.data);
            favoritesWidgetFirst.setMessage(response.success, `Пользователь ${data.name} успешно добавлен!`);
        } else {
            favoritesWidgetFirst.setMessage(response.success, response.error);
        }
    });
}

favoritesWidgetFirst.removeUserCallback = id => {
    ApiConnector.removeUserFromFavorites(id, response => {
        if(response.success) {
            favoritesWidgetFirst.clearTable();
            favoritesWidgetFirst.fillTable(response.data);
            moneyManagerFirst.updateUsersList(response.data);
            favoritesWidgetFirst.setMessage(response.success, `Пользователь успешно удален!`);
        } else {
            favoritesWidgetFirst.setMessage(response.success, response.error);
        }
    });
}
