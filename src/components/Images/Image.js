import React, {Component} from "react";
import ImageDataService from "../../services/image.service";
import { Link } from "react-router-dom";

export default class DemoList extends Component {
    constructor(props) {
        super(props);
        this.getImage = this.getImage.bind(this);
        this.removeImage = this.removeImage.bind(this);

        this.state = {
            image: {},
            included: [],
        };
    }

    componentDidMount() {
        this.getImage(this.props.match.params.id);
    }

    getImage(id) {
        ImageDataService.get(id)
            .then(response => {
                this.setState({
                    image: response.data.data,
                    included: response.data.included
                });
            })
            .catch(err => {
                console.log(err)
            });
    }

    removeImage() {
        ImageDataService.delete(this.state.image.id)
            .then(response => {
                console.log(response);
                this.props.history.push('/')
            })
            .catch(err => {
                console.log(err)
            });
    }


    render() {
        const {image, included} = this.state;
        let url;

        if (image.id) {
            if (image.relationships.field_picture.data) {
            url = included.filter( i =>
                i.id === image.relationships.field_picture.data.id
            ).map((image) => (
                image.attributes.uri.url
            ))
        } else {
            url = "";
        }
            return (
                <div className="vehicle-info" key={image.id}>
                    <h1>{image.attributes.title}</h1>
                    <div>
                        <img src={"https://my-first-drupal9-app.lndo.site/" + url} alt="Image"/>
                    </div>
                    <div>{image.attributes.body.value}</div>
                    <div className="div-buttons">
                        <Link className="button" to={"/image/" + image.id + "/add"}>Edit Image</Link>
                        <a className="button button-red" onClick={this.removeImage}>Remove Image</a>
                    </div>
                </div>
            )
        }
        return (
            <div className="vehicle-info">
                <h1>Image not found</h1>
            </div>
        )
    }
}
