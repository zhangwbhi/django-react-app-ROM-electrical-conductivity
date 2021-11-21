import React from 'react'
import axios from 'axios';
import * as setting from '../setting';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, Typography, Slider, Button } from '@material-ui/core';

// ########################################################
// Material UI inline styles
// ########################################################
const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: "75%",
        marginTop: "15vh",
        marginBottom: "10vh",
        borderRadius: '6px',
        backgroundColor: theme.palette.action.disabledBackground,
    },
    title: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2), paddingLeft: theme.spacing(4),
        color: theme.palette.primary.main,
    },
    sliders: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    slidertop: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(4),

    }
}));

// ########################################################
// Our Custom econd slider. You may use the default slider instead of this
// ########################################################
const EcondSlider = withStyles({
    root: {
        color: '#751E66',
    },
    valueLabel: {
        left: 'calc(-50% -2)',
        top: -22,
        '& *': {
            background: 'transparent',
            color: '#000',
        },
    },
    mark: {
        height: 8,
        width: 1,
        marginTop: -3,
    },
    markActive: {
        opacity: 1,
        backgroundColor: 'currentColor',
    },
})(Slider);

// Marks on the slider track
const marks = [{ value: 0 }, { value: 10 }];

// ########################################################
// The main Home component returned by this Module
// ########################################################
function Home(props) {
    // Material UI Classes 
    const classes = useStyles();

    // React hook state variable - Dimensions
    const [dimensions, setDimensions] = React.useState({

        en: 0.2,
        n2: 0.3,
        o2: 0.2,
        n: 0.3,
        o: 0.1,
        no: 0.0996,
        ion: 0.0004

    });
    // React hook state variable - Prediction
    const [prediction, setPrediction] = React.useState(null)

    // Function to update the Dimensions state upon slider value change
    const handleSliderChange = name => (event, newValue) => {
        setDimensions(
            {
                ...dimensions,
                ...{ [name]: newValue }
            }
        );
    };

    // Function to make the predict API call and update the state variable - Prediction 
    const handlePredict = event => {
        let econdFormData = new FormData();
        econdFormData.append("E/N", dimensions.en);
        econdFormData.append("N2 Fraction", dimensions.n2);
        econdFormData.append("O2 Fraction", dimensions.o2);
        econdFormData.append("N Fraction", dimensions.n);
        econdFormData.append("O Fraction", dimensions.o);
        econdFormData.append("NO Fraction", dimensions.no);
        econdFormData.append("Ion Fraction", dimensions.ion);


        //Axios variables required to call the predict API
        let headers = { 'Authorization': `Token ${props.token}` };
        let url = setting.API_SERVER + '/api/predict/';
        let method = 'post';
        let config = { headers, method, url, data: econdFormData };

        //Axios predict API call
        axios(config).then(
            res => {
                setPrediction(res.data["Predicted Electric Conductivity"])
            }).catch(
                error => { alert(error) })

    }

    function valuetext(value) {
        return `${value} cm`;
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed className={classes.container}>
                <Grid container alignItems="center" spacing={3}>
                    <Grid item xs={6}>
                        <Paper className={classes.title} elevation={0}>
                            <Typography variant="h5">
                                Surrogate Inputs:
                            </Typography>
                        </Paper>
                        <Paper className={classes.sliders}>
                            <Typography id="en" variant="caption" >
                                E/N
                            </Typography>
                            <EcondSlider
                                defaultValue={6}
                                getAriaValueText={valuetext}
                                aria-labelledby="en"
                                step={0.1}
                                min={0}
                                max={1.0}
                                valueLabelDisplay="on"
                                marks={marks}
                                className={classes.slidertop}
                                onChange={handleSliderChange("en")}
                            />
                            <Typography id="n2" variant="caption" gutterBottom>
                                N2 Fraction
                            </Typography>
                            <EcondSlider
                                defaultValue={6}
                                getAriaValueText={valuetext}
                                aria-labelledby="n2"
                                step={0.05}
                                min={0}
                                max={1}
                                valueLabelDisplay="on"
                                marks={marks}
                                className={classes.slidertop}
                                onChange={handleSliderChange("n2")}
                            />
                            <Typography id="o2" variant="caption" >
                                O2 Fraction
                            </Typography>
                            <EcondSlider
                                defaultValue={6}
                                getAriaValueText={valuetext}
                                aria-labelledby="o2"
                                step={0.01}
                                min={0}
                                max={0.22}
                                valueLabelDisplay="on"
                                marks={marks}
                                className={classes.slidertop}
                                onChange={handleSliderChange("o2")}
                            />
                            <Typography id="n" variant="caption" gutterBottom>
                                N Fraction
                            </Typography>
                            <EcondSlider
                                defaultValue={6}
                                getAriaValueText={valuetext}
                                aria-labelledby="n"
                                step={0.01}
                                min={0}
                                max={0.8}
                                valueLabelDisplay="on"
                                marks={marks}
                                className={classes.slidertop}
                                onChange={handleSliderChange("n")}
                            />
                            <Typography id="o" variant="caption" gutterBottom>
                                O Fraction
                            </Typography>
                            <EcondSlider
                                defaultValue={6}
                                getAriaValueText={valuetext}
                                aria-labelledby="o"
                                step={0.01}
                                min={0}
                                max={0.35}
                                valueLabelDisplay="on"
                                marks={marks}
                                className={classes.slidertop}
                                onChange={handleSliderChange("o")}
                            />
                            <Typography id="no" variant="caption" gutterBottom>
                                NO Fraction
                            </Typography>
                            <EcondSlider
                                defaultValue={6}
                                getAriaValueText={valuetext}
                                aria-labelledby="no"
                                step={0.001}
                                min={0}
                                max={0.02}
                                valueLabelDisplay="on"
                                marks={marks}
                                className={classes.slidertop}
                                onChange={handleSliderChange("no")}
                            />
                            <Typography id="ion" variant="caption" gutterBottom>
                                Ion Fraction
                            </Typography>
                            <EcondSlider
                                defaultValue={6}
                                getAriaValueText={valuetext}
                                aria-labelledby="ion"
                                step={0.0001}
                                min={0}
                                max={0.002}
                                valueLabelDisplay="on"
                                marks={marks}
                                className={classes.slidertop}
                                onChange={handleSliderChange("ion")}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" color="primary" onClick={handlePredict}>
                            Predict
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.title} elevation={0}>
                            <Typography variant="caption" display="inline">
                                Predicted Electric Conductivity (S/m): <span>&nbsp;</span>
                            </Typography>
                            <Typography variant="body1" display="inline">
                                {prediction}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default Home