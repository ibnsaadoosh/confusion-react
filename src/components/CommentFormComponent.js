import React, {Component} from 'react';
import {Button} from 'reactstrap';

const [modalIsOpen,setIsOpen] = React.useState(false);

class CommentForm extends Component
{
    render()
    {
        return(
            <div>
                <Button>
                    <i className="fa fa-edit fa-lg mr-1"/> 
                        Submit Comment
                </Button>
                <OpenModal />
            </div>
        );
    }
}

export default CommentForm;