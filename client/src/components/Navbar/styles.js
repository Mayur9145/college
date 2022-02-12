import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    heading: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        fontSize: '2em',
        fontWeight: 300,
    },
    image: {
        marginLeft: '10px',
        marginTop: '5px',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '400px',
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
        },
    },
    profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '400px',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
            marginTop: 20,
            justifyContent: 'center',
        },
    },
    logout: {
        marginLeft: '20px',
    },
    userName: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            width: 'auto',
            justifyContent: 'center',
        },
    },
    // [theme.breakpoints.down('sm')]: {
    //     brandContainerSm: {
    //         display: 'block',
    //         width: 'auto',
    //         justifyContent: 'center',
    //     }

    // },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },

}));
// import { makeStyles } from '@material-ui/core/styles';
// import { deepPurple } from '@material-ui/core/colors';

// export default makeStyles((theme) => ({
//     appBar: {
//         borderRadius: 15,
//         margin: '30px 0',
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: '10px 50px',
//     },
//     heading: {
//         color: 'rgba(0,183,255, 1)',
//         textDecoration: 'none',
//     },
//     image: {
//         marginLeft: '15px',
//     },
//     toolbar: {
//         display: 'flex',
//         justifyContent: 'flex-end',
//         width: '320px',

//     },
//     profile: {
//         paddingTop: "10px",
//         paddingBottom: "10px",
//         paddingRight: "50px",
//         display: 'flex',
//         justifyContent: 'space-between',
//         width: '400px',
//         alignItems: 'center',


//     },
//     userName: {
//         display: 'flex',
//         alignItems: 'center',
//     },
//     brandContainer: {
//         display: 'flex',
//         alignItems: 'center',
//     },

//     [theme.breakpoints.down('sm')]: {
//         brandContainerSm: {
//             display: 'block',
//             alignItems: 'center',
//         }

//     },

//     purple: {
//         color: theme.palette.getContrastText(deepPurple[500]),
//         backgroundColor: deepPurple[500],
//     },
//     signin: {
//         paddingTop: '50px',
//         paddingBottom: '50px',
//         justifyContent: 'space-between',
//         width: '350px',


//     },
//     signinButton: {
//         backgroundColor: '#24a0ed',

//     }


// }));