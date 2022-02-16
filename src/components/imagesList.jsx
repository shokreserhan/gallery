import React, { Component } from "react";

class imagesList extends Component {

    render(){
        return(
            <div className="other-images">
                {this.props.imagesData.forEach((element,index) => {
                    <img src={`https://picsum.photos/id/${element.id}/${element.width}/${element.height}`} alt={`random image` + index} />
                })}
            </div>
        )
    }
}

export default imagesList;