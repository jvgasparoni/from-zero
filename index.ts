const fs = require("fs");
const pg = require("pg");
const url = require("url");

const config = {
  user: "avnadmin",
  password: "AVNS_P-lXe6cRBd4nuYIdO7B",
  host: "pg-18bb7641-jvgasparoni-from-zero.c.aivencloud.com",
  port: 13217,
  database: "defaultdb",
  ssl: {
    rejectUnauthorized: true,
    ca: `-----BEGIN CERTIFICATE-----
MIIEUDCCArigAwIBAgIUAQwHOwRNamk+/GSF4MT0z7gFTTEwDQYJKoZIhvcNAQEM
BQAwQDE+MDwGA1UEAww1OTA2YzIxMjItMGE0Zi00ODg0LTkxM2MtOTRkMjA0NGU3
NzRiIEdFTiAxIFByb2plY3QgQ0EwHhcNMjUwODE5MjAwMDM5WhcNMzUwODE3MjAw
MDM5WjBAMT4wPAYDVQQDDDU5MDZjMjEyMi0wYTRmLTQ4ODQtOTEzYy05NGQyMDQ0
ZTc3NGIgR0VOIDEgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC
AYoCggGBAKQT/n8IF6TNx+yawqZisl582waW10sOpZpevMLlo76iR1qvmJHCU7Db
c3WcpvrbQh8QeANBurCBpZu8BlCk3vmBpHd/AQbVc9xzLDbq8Hr76Osm7UG+nEkR
I1SKnuZEwErK1eZ/LlxPkogqZttFvmSClyrebcON+AzcmROBAqHFNVJ20AXHVwn/
i/YZBJ57/0z9KI+HZESAqv9zkftqUgCbQGkImInu2eF5lUzkzEbtLwTu9TS94qcK
yoD8TewlJsPhWfxNxRReD4Ho5oN+tYxb3CnX6Fh8nMzF2jBUmOY9vKI+Jq/mRrO/
dkwrP3/6EJArkYIauBPgNuEtKQFXLIDniODJFoNhxMYByrr9RxUIeRetFvQdydpX
bjCFXcIzbqkJ7DhNeTw+9pyEiz0j0J3VFh5HsBFhnfBnBB/yFNjlOWCi1Knn39V2
5o6SGyLrRxU3SNu8Wdq6wZ+qvwCEgcwtqU9oMH2Po45QVqg454OBdC7R8Z6KeyyO
k9YPOtWLMQIDAQABo0IwQDAdBgNVHQ4EFgQU7UhBZVjR58x/qYQ4q8brMwpRF6sw
EgYDVR0TAQH/BAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQAD
ggGBADZK99gHUNzTVAYB8RJNbDsFXuoonRVN3pT4Gc6j47+XLeTLf6ncMo3WZCan
V3txOUvuWo9/EvwI9ORouAIU54iMe2Q6FszVKdPBEHO2MuAb4sPyBkweXJ9yQ9sn
xYlwZy8uOEkMKAl3I6qYk4aKfcKVDVbXuCBw0c50XsyEvo+6KKjRo2je2WgPw23+
Zw4SjxaoJJNHECFvbWFQRem39oRMKHGWjEmNwyDtl3VqbTvhH5wqaqAIOK+5T+cX
9W4HofSF2Rl9N+Evq3LQtqZfuFbZnWNEV+JxrDIzjhZHuK5+3vnKgfCgRYqA/4nD
zVl2RTAXpzqXS0zF+/J4Dq7gUOpcGnNU/O2wXpm57DzNjpHBxNEakHPeD6K+DS94
ohT2y2y3WlI61wuq7/Lmsgdlh1Oa8KBLcURHLznkccVpi7czz0FAO1yv3vBWzsTP
p0xj0Q9GC5VceirTmJaZhszHUQK7YHG6YgQIJWgmB+8VH1Lk96qUG+uc7GkIdbQh
6ZhQ7Q==
-----END CERTIFICATE-----`,
  },
};

const client = new pg.Client(config);
client.connect(function (err) {
  if (err) throw err;
  client.query("SELECT VERSION()", [], function (err, result) {
    if (err) throw err;

    console.log(result.rows[0].version);
    client.end(function (err) {
      if (err) throw err;
    });
  });
});
