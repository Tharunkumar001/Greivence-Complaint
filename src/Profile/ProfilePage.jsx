import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Cookies} from 'react-cookie';
import TopNavBar from '../ComplaintContainer/TopNavBar';
import Axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import WaveBackground from "../Assets/profile.svg";
import PersonImage from "../Assets/Person.jpg";
import { Card, CardContent } from '@material-ui/core';
import { CardBody } from 'reactstrap';


import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const useStyles = makeStyles((theme) => ({
    rootCard:{
        marginLeft:"30px",
        border:"none",
        background:"none"

    },
        card:{
        width:'max-content',
        padding:'20px',
        marginBottom:'10px',
        margin:'10px',
        border:"none",
        background:"none"
    },
    android:{
        width:'50px'
    },
    card2:{
        position:'right',
        padding:'10px',
        margin:'10px',  
    },
    bar:{
        marginBottom:'5px',  
        color:"black",
    },
    innercard:{
        width:'max-content',
        marginBottom:'10px',
        margin:'10px',
        
        marginLeft:'auto',
        marginRight:'auto',
    },
    textinCard:{
        margin:"10px"
    },

    Avatar:{
        width:theme.spacing(7),
        height:theme.spacing(7),
        display:"flex", marginLeft:"auto", marginRight:"auto"

    },

    Forflex:{
        display:"flex",
        flexDirection:"column",
        gap:"4rem",
        justifyContent:"center",
        alignItems:"center",
        paddingTop:"2rem",
        [theme.breakpoints.up("sm")]: {
            flexDirection:"row",
            
        },
    },

    forChart:{
        backgroundImage:`url(${WaveBackground})`,
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover",
        height:"60hv",
        width:"80%",
        paddingTop:"5rem"
    }

  
}))


const ProfilePage = (props) => {
    const [ProfilePage,setProfilePage] = useState({username:'issues to access',email:'issues to access',logedIn:""});
    const [barData,setBarData] = useState({hostel:0,academic:0,transport:0,ragging:0,others:0})

    const classes = useStyles();

    


    useEffect(() => {
        Axios.post("https://grievence-backend.herokuapp.com/getComplaintCount",{Email:sessionStorage.getItem("mail")}).then((res) => {
         setBarData({...barData,hostel:res.data[0],academic:res.data[1],ragging:res.data[2],transport:res.data[3],others:res.data[4]})
        })
   
    },[barData])

    const totalComplaintsCount = (barData.hostel + barData.academic + barData.transport + barData.ragging + barData.others);
 
    const chartData = [
        { field: 'Hostel', percentage: barData.hostel },
        { field: 'Academic', percentage: barData.academic },
        { field: 'Transport', percentage: barData.transport },
        { field: 'Ragging', percentage: barData.ragging },
        { field: 'Others', percentage: barData.others },
    
      ];


    useEffect(() => {
        
        Axios.put("https://grievence-backend.herokuapp.com/getUserdetails",{Email:sessionStorage.getItem("mail")}).then((res) => {
//https://grievence-backend.herokuapp.com
            setProfilePage({...ProfilePage,username:res.data.name,email:res.data.email,logedIn:res.data.logedIn})
        })

        
                                                                                     
    })


    return ( 
        <div>

            <div>
                <TopNavBar />
            </div>

            <div style={{paddingTop:"5rem",}}>

                <Avatar alt="Profile Pic" src="PersonImage" className={classes.Avatar}/>

                <h2 style={{textAlign:"center"}}>{ProfilePage.username}</h2>
                <h6 style={{textAlign:"center"}}>{ProfilePage.email}</h6>

                <div className={classes.Forflex}>
                    <Fragment>
                        <Card style={{width:"fit-content",textAlign:"center"}}>
                            <CardBody>
                                {barData.hostel}
                            </CardBody>

                            <CardContent>
                                Hostel 
                            </CardContent>
                        </Card>
                    </Fragment>

                    <Fragment>
                        <Card style={{width:"fit-content",textAlign:"center"}}>
                            <CardBody>
                                {barData.academic}

                            </CardBody>

                            <CardContent>
                                Academic 
                            </CardContent>
                        </Card>
                    </Fragment>

                    <Fragment>
                        <Card style={{width:"fit-content",textAlign:"center"}}>
                            <CardBody>
                                {barData.transport}

                            </CardBody>

                            <CardContent>
                                Transport
                            </CardContent>
                        </Card>
                    </Fragment>

                    <Fragment>
                        <Card style={{width:"fit-content",textAlign:"center"}}>
                            <CardBody>
                                {barData.ragging}

                            </CardBody>

                            <CardContent>
                                Ragging
                            </CardContent>
                        </Card>
                    </Fragment>

                    <Fragment>
                        <Card style={{width:"fit-content",textAlign:"center"}}>
                            <CardBody>
                                {barData.others}

                            </CardBody>

                            <CardContent>
                                Others
                            </CardContent>
                        </Card>
                    </Fragment>

                   
                </div>


                <div classname={classes.forChart} >
                    <Paper>
                        <Chart
                            data={chartData}
                        >
                        <ArgumentAxis />
                        <ValueAxis max={5} />

                        <BarSeries
                            valueField="percentage"
                            argumentField="field"
                        />
                        <Title text="Complaint Percentage" />
                        <Animation />
                        </Chart>
                    </Paper>

                </div>
            </div>

      </div>
    )
}

export default ProfilePage

