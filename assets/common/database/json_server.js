class JSONServer {

    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    get(url, callback) {
        $.get(this.baseURL + url, callback);
    }

    post(url, values, callback) {
        $.post(this.baseURL + url, values, callback);
    }

}

let JsonServer = new JSONServer("http://localhost:3000/");
