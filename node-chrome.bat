:: Beginning of hub batch file
set SERVER_VERSION=3.4.0
set HUB_PORT=5557
set REGISTER_IP=localhost:4444
set CHROME_DRIVER=node_modules\chromedriver\lib\chromedriver\chromedriver.exe
java -Dwebdriver.chrome.driver=%CHROME_DRIVER% -jar selenium-server-standalone-%SERVER_VERSION%.jar -role node -hub http://%REGISTER_IP%/grid/register -browser "browserName=chrome,version=59,maxinstance=2,platform=WINDOWS" -port %HUB_PORT%
:: End of hub batch file
pause