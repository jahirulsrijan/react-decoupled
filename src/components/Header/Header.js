import React, {useState} from "react";
import Navigation from '../Navigation/Navigation'


const Header = () => {
    let nav_items = {data: [{attributes: {title: "", link: {uri: "#"}, weight: -49}}, {attributes: {title: "Home", link: {uri: "#"}, weight: 0}}]};
    if (!localStorage.getItem('nav-items')) {
        getMenu();
    }
    let [responseObj, setResponseObj] = useState(localStorage.getItem('nav-items') ? localStorage.getItem('nav-items') : JSON.stringify(nav_items));


    function getMenu() {
        fetch(`{URL}/jsonapi/menu_link_content/menu_link_content`, {
            "method": "GET",
            "headers": {
                "Accept": "application/vnd.api+json",
                "Content-type": "application/vnd.api+json",
                "Authorization": "Basic " + btoa('jahir:islam'),
            }
        })
            .then(response => response.json())
            .then(response => {
                localStorage.setItem('nav-items', JSON.stringify(response));
                setResponseObj(JSON.stringify(response));
            })
            .catch(err => {
                console.error(err);
            });
    }


    return (
        <header>
            <div className="site-branding">
                <h1>My Image Library</h1>
            </div>
            <Navigation
                responseObj={responseObj}
            />
        </header>

    )
}

export default Header;
