const http = require(`node:http`);
const fs = require(`node:fs`);
const path = require("node:path");
const qs = require("node:querystring");
const port = 8080;

const readFiles = (req, res, path, contentType) => {
  fs.readFile(path, (err, data) => {
    if (err != null) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(err);
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
};

// * 서버
http
  .createServer((req, res) => {
    let url = req.url;
    let fileExtension = url.split(`.`)[1];
    let path = url.slice(1, url.length);

    // * 서버에서 요청한 url과, 그 url을 이용해 잡은 상대 경로를 콘솔로 확인
    console.log(`요청 url: ${url}`);
    console.log(`지정 경로: ${path}`);

    // * 확장자명에 따라 타입별로 처리
    if (url === `/`) {
      readFiles(req, res, `index.html`, `text/html`);
    } else if (fileExtension === `ico`) {
      readFiles(req, res, path, `image/vnd.microsoft.icon`);
    } else if (fileExtension === `css`) {
      readFiles(req, res, path, `text/css`);
    } else if (fileExtension === `js`) {
      readFiles(req, res, path, `text/javascript`);
    } else if (fileExtension === `html`) {
      readFiles(req, res, path, `text/html`);
    } else if (fileExtension === `png`) {
      readFiles(req, res, path, `image/png`);
    } else if (fileExtension === `jpg` || fileExtension === `jpeg`) {
      readFiles(req, res, path, `image/jpeg`);
    } else if (fileExtension === `webp`) {
      readFiles(req, res, path, `image/webp`);
    } else if (url.startsWith(`/test`)) {
      if (req.method == `GET`) {
        const inputData = url.split("?")[1];
        const data = qs.decode(inputData);
        console.log(data);
        console.log(data["name-id"]);
        // console.log(Object.entries(data));
        let body;

        req.on("data", (chunk) => {
          console.log(12313);
          console.log(`test` + chunk);
          body += chunk;
        });
        req.on("end", () => {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end(body);
        });
      }

      if (req.method == `POST`) {
        console.log(req);
        // const inputData = url.split("?")[1];
        // const data = qs.decode(inputData);
        // console.log(data);
        let body;

        req.on("data", (chunk) => {
          console.log(chunk);
          body += chunk;
        });
        req.on("end", () => {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end(body);
        });
      }
    }
  })
  .listen(port, () => {
    console.log(`the server is processing on Http://localhost:8080`);
  });
