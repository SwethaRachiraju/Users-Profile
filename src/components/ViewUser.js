import React, { useState, useEffect } from 'react';
import './Users.css';
import axios from 'axios';
import { CircularProgress, Icon, IconButton } from '@material-ui/core';
import { connect } from 'react-redux';

const ViewUser = (props) => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState('');

    useEffect(() => {
        axios.get(`https://reqres.in/api/users/${props.viewUser.id}`)
            .then(res => {
                if (res.data) {
                    setLoading(false);
                    setUserData(res.data)
                }

            })
    }, [props.viewUser])


    return (
        <div className="fullWidth">
            {loading &&
                <div className="progress">
                    <div className="load-text">Loading</div>
                    <CircularProgress disableShrink />
                </div>}
            <div className='view-user-main'>
                <div className='p-l-30 p-t-20' onClick={() => props.navigateBack()}>
                    <IconButton>
                        <span class="material-icons">
                            keyboard_backspace
                    </span>
                    </IconButton>
                </div>
                <div className='fullWidth justify-center flex'>
                    <div className="view-img">
                        {(userData && userData.data) && <img className='fullWidth' src={userData.data.avatar} alt='' />}
                    </div>
                </div>
                <div className='container'>
                    <div className="row p-t-20 p-b-20">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  text-right label-text">First Name:</div>
                        {(userData && userData.data) && <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-left value-text">{userData.data.first_name}</div>}
                    </div>
                    <div className="row p-t-20 p-b-20">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  text-right label-text">Last Name:</div>
                        {(userData && userData.data) && <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-left value-text">{userData.data.last_name}</div>}
                    </div>
                    <div className="row p-t-20 p-b-20">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  text-right label-text">Email:</div>
                        {(userData && userData.data) && <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-left value-text">{userData.data.email}</div>}
                    </div>
                    <div className="row p-t-20 p-b-20">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  text-right label-text">Support Text:</div>
                        {(userData && userData.support) && <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-left value-text">{userData.support.text}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        viewUser: state.user.viewObj
    }
}
export default connect(mapStateToProps, null)(ViewUser);