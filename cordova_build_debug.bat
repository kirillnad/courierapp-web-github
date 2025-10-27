set SLAVE_AAPT_TIMEOUT=500
REM cordova build android --minSdkVersion=28
cordova build android --minSdkVersion=27 --device --debug --consolelog
pause
