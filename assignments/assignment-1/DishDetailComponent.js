import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';


class DishDetail extends Component 
{
    constructor(props)
    {
        super(props);
    }

    renderDish(dish)
    {
        return(
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    renderComments(commnets)
    {        
        if(commnets != null)
        {
            const commentList = commnets.map( (comment) => 
            {
                return(
                    <ul className="list-unstyled">
                        <li> {comment.comment} </li>
                        <li> -- {comment.author}, {new Date(comment.date).toUTCString()} </li>
                    </ul> 
                );   
            });

            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <div>{commentList}</div>
                </div>
            );
        }
            
        else
            return(
                <div></div>
            );
    }   

    render()
    {
        if(this.props.dish != null)
            return(
                <div className="row">                    
                    {this.renderDish(this.props.dish)}
                    {this.renderComments((this.props.dish || {}).comments)}
                </div>                    
            );
        else
            return(
                <div></div>
            );
    }
}

export default DishDetail;
