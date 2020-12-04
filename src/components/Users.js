import React, { useState, useEffect } from 'react';
import './Users.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import _ from 'lodash';
import ViewUser from './ViewUser';
import { connect } from 'react-redux';

const useStyles = makeStyles({
    root: {
        height: 250
    },
});


const Users = (props) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [persons, setPersons] = useState([]);
    const [sortName, setSortName] = useState('');
    const [personsCopy, setPersonsCopy] = useState([]);
    const [showView, setShowView] = useState(false);

    useEffect(() => {
        axios.get(`https://reqres.in/api/users?delay=3`)
            .then(res => {
                if (res.data && res.data.data && res.data.data.length > 0) {
                    setLoading(false);
                    setPersons(res.data.data);
                    setPersonsCopy(res.data.data);
                }

            })
    }, [])

    const handleChange = e => {
        let arr = [...personsCopy];
        if (e.target.value !== '') {
            arr = _.sortBy(arr, e.target.value);
        }
        setPersons(arr);
        setSortName(e.target.value);
    }

    const viewCard = (card) => {
        props.setViewObj(card);
        setShowView(true);
    }

    const navigateBack = () => {
        props.setViewObj({});
        setShowView(false);
    }

    return (
        <div className="fullWidth fullHeight">
            {loading &&
                <div className="progress">
                    <div className="load-text">Loading</div>
                    <CircularProgress disableShrink />
                </div>}
            <AppBar position="static">
                <Toolbar>
                    <div className="h-font">Users</div>
                </Toolbar>
            </AppBar>
            {(!showView) ? <React.Fragment>
                {(persons && persons.length > 0 && !loading) &&
                    <div className='card-main container'>
                        <div className='form-select'>
                            <FormControl className={classes.margin + ' form-width '}>
                                <div className='sort-text'>Sort By</div>
                                <NativeSelect
                                    value={sortName}
                                    onChange={handleChange}
                                >
                                    <option aria-label="None" value="">None</option>
                                    <option value='first_name'>First Name</option>
                                    <option value='last_name'>Last Name</option>
                                </NativeSelect>
                            </FormControl>
                        </div>
                        <div className='row'>
                            {persons.map(person => (
                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 p-t-20 p-b-20">
                                    <Card className={classes.root} onClick={() => viewCard(person)}>
                                        <CardActionArea className="fullHeight">
                                            <div className="img-div">
                                                <img className='fullWidth' src={person.avatar} alt='' />
                                            </div>
                                            <CardContent>
                                                <div className="text-center user-name">
                                                    {person.first_name + ' ' + person.last_name}
                                                </div>
                                                <div className="text-center p-t-10">
                                                    {person.email}
                                                </div>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </div>

                            ))}
                        </div>
                    </div>}
            </React.Fragment>
                : <ViewUser navigateBack={navigateBack} />}

        </div>
    );
};



const mapDispatchToProps = (dispatch) => {
    return {
        setViewObj: (obj) => dispatch({ type: "SET_VIEWOBJ", viewObj: obj })
    }
}

export default connect(null, mapDispatchToProps)(Users);