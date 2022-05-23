import http from "../http";
import axios from "axios";

class ImageDataService {
    getAll() {
        return http.get("https://my-first-drupal9-app.lndo.site/jsonapi/node/image_type?include=field_picture");
    }

    get(id) {
        return http.get(`https://my-first-drupal9-app.lndo.site/jsonapi/node/image_type/${id}?include=field_picture`);
    }

    create(data) {
        return http.post("https://my-first-drupal9-app.lndo.site/jsonapi/node/image_type", data);
    }

    update(id, data) {
        return http.patch(`https://my-first-drupal9-app.lndo.site/jsonapi/node/image_type/${id}`, data);
    }

    delete(id) {
        return http.delete(`https://my-first-drupal9-app.lndo.site/jsonapi/node/image_type/${id}`);
    }

    upload(id, file) {
        return axios({
            method: "post",
            url: `{https://my-first-drupal9-app.lndo.site}/jsonapi/node/image_type/${id}/field_picture`,
            headers: {
                "Accept": "application/vnd.api+json",
                "Content-type": "application/octet-stream",
                "Authorization": "Basic " + btoa('USER:PASSWORD'),
                "Content-Disposition": `file;filename="${file.name}"`,
            },
            data: file,
        })
    }

}

export default new ImageDataService();
