
This project contains a multi tenant personal site buider. 
The nginx reverse proxy routes the request to the correct server. For subdomains *.domain.com the tenants server is called. The main page is responsible for adding tenants and a tenant can edit his data. 

### How to execute it ?

1. open the phpmyadmin ui and execute the init.sql file located at the root folder

2. Create a cert folder `mkdir cert` and add inside the cert folder a certificate named `certificate.crt` and a private key named `private.key`.

3. Execute `docker compose up`