1) Run "go mod init" in root directory

2) Start Database
-> docker run -it --rm --name cindex-user-db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=debezium -e MYSQL_USER=admin -e MYSQL_PASSWORD=password invent360/rc9-db-system:1.0.0
-> docker run --name cindex-user-db -p 5432:5432 -e POSTGRES_PASSWORD=password -d postgres