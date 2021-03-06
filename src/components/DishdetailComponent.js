import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle,
        Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const minLength = (len) => (val) => !(val) || (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <= len);

class CommentForm extends Component
{
    constructor(props)
    {
        super(props);

        //it works without binding!
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state=
        {
            isModalOpen: false
        }
    }

    toggleModal = () =>
    {
        this.setState(
            {
                isModalOpen: !this.state.isModalOpen
            }
        )
    }

    handleSubmit(values)
    {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render()
    {
        return(
            <React.Fragment>
                <Button className="bg-white text-dark" onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg mr-1"/> 
                    Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating"
                                    name="raring" placeholder="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" 
                                    name="author" placeholder="Your Name" className="form-control" 
                                    validators=
                                    {{
                                        minLength: minLength(3), maxLength: maxLength(15)
                                    }} />
                                    <Errors 
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages=
                                        {{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'                                            
                                        }} 
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment"
                                    name="comment" rows="6" className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

    function RenderDish({dish})
    {
        return(
            <FadeTransform
            in
            transformProps=
            {{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}
            >
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>

        );
    }

    function RenderComments({commnets, postComment, dishId})
    {        
        if(commnets != null)
        {
            return (
                <React.Fragment>
                    <h4>Comments</h4>
                    <div>
                        <Stagger in>
                            {commnets.map( (comment) => 
                                {
                                    return(
                                        <Fade in>
                                            <ul className="list-unstyled">
                                                <li> 
                                                    <p> {comment.comment} </p>
                                                    <p> -- {comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date((Date.parse(comment.date)))) } </p>
                                                </li>
                                            </ul>
                                        </Fade>

                                    );   
                                })}                                
                        </Stagger>
                    </div>
                    <CommentForm dishId={dishId} postComment={postComment} />
                </React.Fragment>
            );
        }
            
        else
            return(
                <div></div>
            );
    }   

    const DishDetail = (props) =>
    {
        if(props.isLoading)
        {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }

        else if(props.errMes)
        {
            return (
                <div className="container">
                    <div className="row">
                        <h4> {props.errMes} </h4>
                    </div>
                </div>
            );
        }
        
        else if(props.dish != null)
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">  
                        <div className="col-12 col-md-5 m-1">                 
                            <RenderDish dish={props.dish} />
                        </div> 
                        <div className="col-12 col-md-5 m-1">                 
                            <RenderComments commnets={props.comments}
                                        postComment={props.postComment}
                                        dishId={props.dish.id} />
                        </div>
                    </div>
                </div>
            );
        else
            return(
                <div>hi</div>
            );
    }

export default DishDetail;