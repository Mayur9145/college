import React ,{ useState, useEffect }from 'react';
import { Link, useLocation } from 'react-router-dom';

import { AppBar, Typography, Toolbar, Button, Avatar} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';
import useStyles from './styles';
import trophy from '../../images/trophy.jpg';
import heading from '../../images/heading.png';
import * as actionType from '../../constants/actionTypes';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';


const Navbar = () =>{
    const classes =useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch=useDispatch();
    const location=useLocation();

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const logout=()=>{
        dispatch({ type: actionType.LOGOUT });
        window.location.reload();
        setUser(null);
    };
    useEffect(()=>{
        if(user){
            const token=user.token;
            if(token){
                const decodedToken= decode(token);  
                if(decodedToken.exp*1000 < new Date().getTime()) logout();
            }
        }
              
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);


    return (     
        
            <AppBar className={classes.appBar } position = "static" color = "inherit" >
                <div className='sidebar'>
                 
                        <IconContext.Provider value={{ color: '#000' }}>
                            <div className='navbar'>
                            <Link to='#' className='menu-bars'>
                                <FaIcons.FaBars onClick={showSidebar} />
                            </Link>
                            </div>
                            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                            <ul className='nav-menu-items' onClick={showSidebar}>
                                <li className='navbar-toggle'>
                                <Link to='#' className='menu-bars'>
                                    <AiIcons.AiOutlineClose />
                                </Link>
                                </li>
                                {SidebarData.map((item, index) => {
                                return (
                                    <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                    </li>
                                );
                                })}
                            </ul>
                            </nav>
                        </IconContext.Provider>
                  
                </div>
                <div className={`${classes.brandContainer}`} align = "center">
                    <img src = { heading } alt = "College Achievement" height = "45px" / >
                    <img className={classes.image } src = { trophy } alt = "College Achievement" height = "45px" / >
                </div>
                    
                <Toolbar className={classes.toolbar}>
                    { user ? (
                        <div className= {classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                                {user.result.name.charAt(0)}
                            </Avatar>
                            <Typography className={classes.userName} variant="h6">
                                {user.result.name}
                            </Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                        ): (
                           <Button component={Link} to ="/auth" varinat="contained" className={classes.signinButton}>Sign In</Button> 
                            
                        ) 
                    }
                </Toolbar>
                   
            </AppBar>    
      
    );
}
 

export default Navbar;






{/* return (  
        
        <Grow in>
            <AppBar className={classes.appBar } position = "static" color = "inherit" >
            <Container>
                <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <div className={`${classes.brandContainer} ${classes.brandContainerSm}`} align = "center">
                            <Typography component={Link} to="/" className={classes.heading} variant = "h2"> College Diary </Typography> 
                            <img className={classes.image } src = { memories } alt = "College Diary" height = "80" / >
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Toolbar className={classes.toolbar}>
                            { user ? (
                                <div className= {classes.profile}>
                                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                                        {user.result.name.charAt(0)}
                                    </Avatar>
                                    <Typography className={classes.userName} variant="h6">
                                        {user.result.name}
                                    </Typography>
                                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                                </div>
                                ): (
                                    <div className={classes.signin}>
                                        <Button component={Link} to ="/auth" varinat="contained" className={classes.signinButton}>Sign In</Button> 
                                    </div>
                                ) 
                            }
                        </Toolbar>
                    </Grid>
                    </Grid>
                </Container>
            </AppBar>    
        </Grow>
    );
} */}