import React from "react";
import ImageDataService from "../../services/image.service";

class AddImage extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeSummary = this.onChangeSummary.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.getImage = this.getImage.bind(this);
        this.newImage = this.newImage.bind(this);
        this.CreateImage = this.CreateImage.bind(this);
        this.CreatePicture = this.CreatePicture.bind(this);
        this.setCreatedId = this.setCreatedId.bind(this);
        this.imageFile = this.imageFile.bind(this);

        this.state = {
            image: {
                id : null,
                title: "",
                summary: "",
                body: "",
            },
            image: "",
            submitted: false,
            patch: false,
        };
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.setState({
               patch: true,
            });
            this.getImage(this.props.match.params.id);
        }
    }

    getImage(id) {
        ImageDataService.get(id)
            .then(response => {
                this.setState({
                    //image: response.data.data,
                    //included: response.data.included,
                    image: {
                        id: response.data.data.id,
                        title: response.data.data.attributes.title,
                        summary: response.data.data.attributes.body.summary,
                        body: response.data.data.attributes.body.value,
                    }
                });
                console.log(response.data.data);
            })
            .catch(err => {
                console.log(err)
            });
    }

    onChangeTitle(e) {
        this.setState({
            image: {
                id : this.state.image.id,
                title: e.target.value,
                summary: this.state.image.summary,
                body: this.state.image.body,
            }
        });
    }

    onChangeSummary(e) {
        this.setState({
            image: {
                id : this.state.image.id,
                title: this.state.image.title,
                summary: e.target.value,
                body: this.state.image.body,
            }
        });
    }

    onChangeBody(e) {
        this.setState({
            image: {
                id : this.state.image.id,
                title: this.state.image.title,
                summary: this.state.image.summary,
                body: e.target.value
            }
        });
    }

    onChangeImage() {
        this.setState({
            image: this.imageFile()
        });
    }

    imageFile() {
        let input = document.querySelector('input[type=file]');

        return input.files[0];
    }

    setCreatedId(response) {
        this.setState({
            image: {
                id: response.data.id
            }
        });
    }

    CreateImage() {
        if (!this.state.patch) {
            let image = {
                "data": {
                    "type": "node--image_type",
                    "attributes" : {
                        "title": this.state.image.title,
                        "body": {
                            "value": this.state.image.body,
                            "summary": this.state.image.summary,
                        }
                    }
                }
            };

            ImageDataService.create(image)
                .then(response => {
                    console.log(response);
                    if (this.state.image) {
                        this.setCreatedId(JSON.parse(response.request.response));
                        this.CreatePicture();
                    }
                    this.setState({
                        submitted: true
                    });
                })
                .catch(err => {
                   console.log(err);
                });
        } else {
            let image = {
                "data": {
                    "type": "node--image_type",
                    "id": this.state.image.id,
                    "attributes" : {
                        "title": this.state.image.title,
                        "body": {
                            "value": this.state.image.body,
                            "summary": this.state.image.summary,
                        }
                    }
                }
            };

            ImageDataService.update(this.state.image.id ,image)
                .then(response => {
                    console.log(response);
                    if (this.state.image) {
                        this.setCreatedId(JSON.parse(response.request.response));
                        this.CreatePicture();
                    }
                    this.setState({
                        submitted: true
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }

    }

    CreatePicture() {
        console.log(this.state.image);
        ImageDataService.upload(this.state.image.id, this.state.image)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
    }

    newImage() {
        this.setState({
            id: null,
            title: "",
            summary: "",
            paragraph: "",
            submitted: false
        });
    }

    render() {

        return (
            <div className="vehicle-info">
                <h1>Add Image</h1>
                <div className="submit-form">
                    {this.state.submitted ? (
                        <div>
                            <h4>You submitted successfully!</h4>
                            <a className="button" onClick={this.newImage}>
                                Add
                            </a>
                        </div>
                    ) : (
                        <ul>
                            <li>
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    required
                                    value={this.state.image.title}
                                    onChange={this.onChangeTitle}
                                    name="title"
                                />
                            </li>
                            <li>
                                <label htmlFor="summary">Summary</label>
                                <textarea
                                    className="form-control"
                                    id="summary"
                                    required
                                    value={this.state.image.summary}
                                    onChange={this.onChangeSummary}
                                    name="summary"
                                />
                            </li>
                            <li>
                                <label>Body</label>
                                <textarea
                                    className="form-control"
                                    id="paragraph"
                                    required
                                    value={this.state.image.body}
                                    onChange={this.onChangeBody}
                                    name="paragraph"
                                />
                            </li>
                            <li>
                                <label>Upload Image</label>
                                <input type="file"
                                       accept="image/png, image/jpeg"
                                       id="image"
                                       onChange={this.onChangeImage}
                                />
                            </li>
                            <a onClick={this.CreateImage} className="button">
                                {this.state.patch ? "Update" : "Add"}
                            </a>
                        </ul>
                    )}
                </div>
            </div>
        )
    }
}

export default AddImage;