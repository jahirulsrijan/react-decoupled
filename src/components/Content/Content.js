import React from 'react';
import { Switch, Route/*, Link*/ } from "react-router-dom";
import imageList from '../Images/ImagesList';
import Image from '../Images/Image';
import ImageAdd from '../Images/imageAdd';


const Content = () => {
    return (
        <div className="content-wrapper">
            <Switch>
                <Route exact path={["/"]} component={imageList}/>
                <Route exact path="/image/add" component={ImageAdd}/>
                <Route path="/image/:id/add" component={ImageAdd}/>
                <Route path="/image/:id" component={Image}/>
            </Switch>
        </div>
    )
};

export default Content;
