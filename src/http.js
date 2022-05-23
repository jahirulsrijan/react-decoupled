import axios from "axios";

export default axios.create({
    baseURL: "",
    headers: {
        "Accept": "application/vnd.api+json",
        "Content-type": "application/vnd.api+json",
        "Authorization": "Basic " + btoa('jahir:islam'),
    }
});
