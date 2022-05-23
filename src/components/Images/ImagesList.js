import React, {Component} from "react";
import ImageDataService from "../../services/image.service";
import { Link } from "react-router-dom";

export default class DemoList extends Component {
    constructor(props) {
        super(props);
        this.getImageTeaserList = this.getImageTeaserList.bind(this);

        this.state = {
            images: [],
            included: [],
        };
    }

    componentDidMount() {
        this.getImageTeaserList();
    }

    getImageTeaserList() {
        ImageDataService.getAll()
            .then(response => {
                this.setState({
                    images: response.data.data,
                    included: response.data.included
                });
            })
            .catch(err => {
                console.log(err)
            });
    }


    render() {
        const {images, included} = this.state;
        let url = "";

        if (images) {
            return (
                <div className="vehicle-list">
                    <h1>List of available vehicles</h1>
                    <div className="articles">
                        {images &&
                        images.map(function (image) {
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
                                    <article className="article" key={image.id}>
                                        <div>
                                            <img src={"https://my-first-drupal9-app.lndo.site" + url} alt="some-image"/>
                                        </div>
                                        <h2>{image.attributes.title}</h2>
                                        <p className="summary">{image.attributes.body.summary}</p>
                                        <p className="read-more"><a href={"/image/" + image.id}>read more</a></p>
                                    </article>
                                )
                            }
                        )}
                    </div>
                    <Link className="button" to={"/image/add"}>Add Image</Link>
                </div>
            )
        }

        return (
            <div className="vehicle-list">
                <h1>No Image available</h1>
            </div>
        )
    }
}
