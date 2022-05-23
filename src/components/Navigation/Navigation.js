import React from 'react';


const Navigation = (props) => {
    let response = JSON.parse(props.responseObj);
    return (
        <ul>
            <li><a href={"/"}>Home</a></li>
            {response.data.map((item, i) => <li key={item + i}><a href={item.attributes.link.uri.split('internal:')[1]}>{item.attributes.title}</a></li> )}
        </ul>
    )
}

export default Navigation;
