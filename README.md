
2021.07.13
==========

Для установки cordova-plugin-local-notifications при разворачивании проекта единожды
выполнить из командной строки скрипт `cordova_add_notification_plugin.bat`



1. в package.json прописаны ошибочные пути до плагинов cordova, в самом низу
поправить на пути из проекта:

  "devDependencies": {
    "com-darryncampbell-cordova-plugin-intent": "file:./plugins/com-darryncampbell-cordova-plugin-intent",
    "phonegap-plugin-barcodescanner": "~8.0.0",
    "ru.domino.urovo": "file:./plugins/ru.domino.urovo"
  }



--------------------------------------------

Если apk на все внешние запросы возвращает 404, это значит, что не установлен или не настроен плагин https://github.com/apache/cordova-plugin-whitelist
В config.xml должно быть:
<access origin="*" />

-----------------------------------------------------------------------------------------------------------------------------------



Установить SDK target: https://github.com/apache/cordova-android/pull/699

В config.xml прописать:
    <preference name="android-minSdkVersion" value="28" />
    <preference name="android-targetSdkVersion" value="28" />

 Можно так: cordova build android --minSdkVersion=28
> cordova build android --minSdkVersion=28 --prod --release

 Просмотр свойств приложения: 
 > aapt dump badging c:\SAND\courierapp\platforms\android\app\build\outputs\apk\debug\app-debug.apk

-----------------------------------------------------------------------------------------------------------------------------------
Чтобы работали http запросы на Android 9
There are two things to correct in config.xml So the right answer should be adding the xmls:android:

<widget id="com.my.awesomeapp" version="1.0.0" 
xmlns="http://www.w3.org/ns/widgets"
xmlns:android="http://schemas.android.com/apk/res/android" 
xmlns:cdv="http://cordova.apache.org/ns/1.0">
plus editing the config to allow:

<platform name="android">
  <edit-config file="app/src/main/AndroidManifest.xml" mode="merge" target="/manifest/application">
      <application android:usesCleartextTraffic="true" />
  </edit-config>
</platform>
-----------------------------------------------------------------------------------------------------------------------------------


Посмотреть содержимое манифеста в уже собранном apk: 
> aapt d xmltree a.apk AndroidManifest.xml > 1

Кроме того, теперь чтобы выложить на GooglePlay нужно генерить не apk, а Android App Bundle.
Он генерится через AndroidStudio после того, как Cordova сделала своё дело (cordova run android --prod --release)

We have generated the bundle with Android Studio.


The steps are:

0. c:\SAND\courierapp\platforms\android\CordovaLib\AndroidManifest.xml - комментируем строку <uses-sdk android:minSdkVersion="19" />
1. Launch Android Studio
2. Go To Import Project (Eclipse ADT, Gradle, etc).
	если здесь ругается на Left... , то в указанной функции нужно просто стереть <<

3. Select Android platform directory in your project (/platforms/android).
4. Wait for finish the Sync
5. Go to Build > Generate Sign Bundle
6. Complete sign data
7. Upload de .aab file generated (in path /platforms/android/outputs/
8. Note: if you have problems with minSDK version, fix this and make a resync


Публикуем: https://play.google.com/console/u/0/developers 



# CourierApp frontend

Это подготовленный проект React + Cordova
см. https://github.com/johnkmzhou/cordova-create-react-app

## Зависимости

Необходимо установить nodejs не ниже 9.4.0.
Установить yarn (скачать с сайта)
В папке проекта выполнить команду:

    yarn

## Разработка

Для запуска сервера разработки в папке проекта выполнить команду:

    yarn start

Позволяет отлаживаться в браузере без кордовы.

## Сборка проекта

Для сборки дистрибутива в папке проекта выполнить команду:

yarn build

## Посмотреть на устройстве:
Выполнить команды:

        1. yarn run build
        2. cordova emulate android
		   или
	       cordova run android
           или
           cordova build android --minSdkVersion=28 --prod --release

Смысл в том, что реакт собирается в папку www, а кордова потом оттуда к себе забирает.

## Тесты

Starts the test runner.

yarn test


## Описание/ТЗ

Приложение работает с облаком.
В облаке делаются две таблички - одна хранит список заказов, вторая - точки геопозиции курьера

Когда в Юпитере назначают заказ курьеру, этот заказ уходит в первую табличку.

Курьер регистрируется в приложении под своим логином/паролем.
Отсюда приложение знает, какие заказы загрузить.

В идеале, приложение должно само загрузить новые заказы (через Server-Sent Events). Если не получится, то по кнопке "обновить".

Приложение уже получает заказы в нужном порядке

Когда курьер выезжает, он нажимает кнопку "Выехал".
С этого момента начинается регистрация положения курьера - его геопозиция периодически отправляется в облако.
(Либо автоматически, когда геопозиция отдаляется от ресторана.)

Когда курьер доставляет заказ, он нажимает на заказ, открывается модальное окошко с тремя кнопками:
"Доставлено" - В этот момент в облако уходит сообщение, что заказ доставлен.,
"Не доставлено" - пишет почему (или выбирает из списка),
"Отмена".


Как работает регистрация:
1. Чтобы курьер зарегистрировался, нам нужно знать, в какой облачной БД (ОБД) его искать. Это сохраняется в LocalStorage.
2. Поэтому, при самом первом запуске, вместе с логином показывается поле, куда нужно ввести адрес сервера регистрации (это не адрес облака). адрес сервера авторизации и имя курьера сохраняются в LocalStorage. Если адрес сервера сохранён, он не запрашивается. Этот адрес потом можно поменять в настройках.
3. Логин и пароль отсылаются на сервер регистрации. На сервере регистрации стоит Python скрипт, который ловит эти сообщения, делает запрос к Oracle и отсылает приложению имя и UID курьера и идентификатор базы данных.
Номер порта (на котором работает скрипт), идентификатор базы данных и параметры соединения с Oracle скрипт берёт из ini файла.
4. Облаку передаются UID курьера и идентификатор БД.

Приложение курьера
добавить:

Сумму, время доставки, комментарий

Курьер должен видеть все заказы, отправленные в производство и иметь возможность взять себе или отказаться от взятого.
У дргуих курьеров такие заказы должны пропасть
