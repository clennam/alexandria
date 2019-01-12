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

    put(url, values, callback) {
        $.ajax({
            url: this.baseURL + url,
            type: 'PUT',
            data: values,
            success: callback
        });
    }

}

let JsonServer = new JSONServer("http://localhost:3000/");
