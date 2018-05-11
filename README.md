# Swagger Editor Helper
Hack [Swagger Editor](https://github.com/swagger-api/swagger-editor) to Provide View-only Mode.

I don't have enough time and nodejs working experience to contribute to Swagger Editor itself, so I just hack it by override the response in nginx.

The community looks not that easy:
* [How can I export the HTML of the preview? #623](https://github.com/swagger-api/swagger-editor/issues/623) [ NOT WELCOME HERE ]
* [Add a view only mode? #719](https://github.com/swagger-api/swagger-editor/issues/719) [ HACK it yourself ]
* [Feature: Preview Only #795](https://github.com/swagger-api/swagger-editor/pull/795) [ IMPLEMENTED BUT REJECTED, WTF! ]

## Usage
1. Install Swagger Editor by docker:
    ```bash
    docker pull swaggerapi/swagger-editor
    docker run -d -p 9010:8080 swaggerapi/swagger-editor
    ```
    This will run swagger-editor on port 9010
1. Copy `nginx` files to your nginx config directory:
    ```bash
    cp -r nginx/* /etc/nginx
    ```
1. Change `server_name` and `root`
    ```bash
    vim /etc/nginx/sites-enabled/swagger.conf
    ```
    **ATTENTION**: use `public` dir as root
1. Reload nginx
    ```bash
    nginx -t && nginx -s reload
    ```
### HTTPS
If you want to access swagger via https, please:
1. Prepare SSL certificate;
1. Use `swagger.https.conf`:
    ```bash
    ln -snf ../sites-available/swagger.https.conf /etc/nginx/sites-enabled/swagger.conf
    ```
1. Change `ssl_certificate` and `ssl_certificate_key` to use real certificate;
1. Generate a dhparam file:
    ```bash
    sudo openssl dhparam -out /etc/nginx/ssl/dhparam.pem 4096
    ```
1. Then reload nginx:
    ```bash
    nginx -t && nginx -s reload
    ```
