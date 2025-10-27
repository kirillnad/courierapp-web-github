nvm use 14
set JAVA_HOME=C:\Program Files\Java\jdk1.8.0_191
set path=C:\Program Files\Java\jdk1.8.0_191\bin;%PATH%

set SLAVE_AAPT_TIMEOUT=500

rem set NODE_OPTIONS=--openssl-legacy-provider

start /wait yarn build

cordova run android --minSdkVersion=28 --device --debug --consolelog
pause
