# HAECHI: SmartContract Security Diagnostic Tool - client(web)

Please see <a href='https://github.com/byunghyun23/haechi/'>here</a> for more details on the solution.   
This repository is a Springboot web page for clients to use HAECHI.   
Please do <a href='https://github.com/byunghyun23/haechi-server/'>this</a> first before starting Solidity code analysis.   

![image](https://github.com/byunghyun23/haechi-web/blob/master/haechi_web_home.PNG)   

## Try
* You can experience it <a href='http://13.209.7.107:8080'>here</a>!

## Requirements
* Database
```
MariaDB or MySQL
(Be sure to run the sql/haechi.sql file to save the Solidity code and analysis results.)
```

## Details
* Default port (TCP)
```
5757
```
* Default port (web)
```
8080
```
* TCP Steps
```
1. Solidity Code Size
2. Solidity Code
3. Analysis Results of Solidity Code
```

## Run
* java -jar haechi_web.jar

![image](https://github.com/byunghyun23/haechi-web/blob/master/haechi_web_results.PNG)
