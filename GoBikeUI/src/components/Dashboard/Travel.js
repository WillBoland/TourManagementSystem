import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import Panel from "./Panel";
import { Grid } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import Button from "../../assets/components/CustomButtons/Button.js";
import Btn from '@material-ui/core/Button';
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Autocomplete from "@material-ui/lab/Autocomplete";
import moment from "moment";
import { config } from '../Constants'

class Travel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: "",
      searchResult: "",
      onewayflag: "",
      departurecity: "",
      arrivalcity: "",
      countoftravellers: "",
      travellerclass: "",
      stop:"",
      returnFlights:"",
      flights:"",
    };
    // this.handleEmailIDChange = this.handleEmailIDChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDateChange1 = this.handleDateChange1.bind(this);
    this.handleChangeMode = this.handleChangeMode.bind(this);
    this.handleResetMode = this.handleResetMode.bind(this);
    this.handleChangeLeavingFrom = this.handleChangeLeavingFrom.bind(this);
    this.handleChangeArrivalAt = this.handleChangeArrivalAt.bind(this);
    this.handleCountoftravellers = this.handleCountoftravellers.bind(this);
    this.handletravellerclass = this.handletravellerclass.bind(this);
    this.handleAirportSearch = this.handleAirportSearch.bind(this);
    this.handleStopClass = this.handleStopClass.bind(this)
    this.handleFlightSearch = this.handleFlightSearch.bind(this)
    this.renderFlights = this.renderFlights.bind(this)
    this.renderReturnFlights = this.renderReturnFlights.bind(this)
    // this.handleChangeLeavingFrom2 = this.handleChangeLeavingFrom2.bind(this);
    // this.handleChangeLeavingFrom1 = this.handleChangeLeavingFrom1.bind(this);
  }

  countoftravellers = ["1", "2", "3", "4"];

  travellerclass = ["ECONOMY", "PREMIUM_ECONOMY", "BUSINESS", "FIRST"];

  stop = ["Non-stop", "Multiple"];

  cities = ["Chicago", "Bloomington"];

  useStyles = makeStyles((theme) => ({
    root1: {
      minWidth: 100,
    },
    title1: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    root: {
      flexGrow: 2,
      // float:"right",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    logo: {
      color: "green",
      click: "cursor",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  handleChangeLeavingFrom = (event, value) => {
    event.preventDefault();
    console.log(value);
    this.setState({ departurecity: value });
  };

  handleCountoftravellers = (event,value) => {
    event.preventDefault();
    console.log(value);
    this.setState({ countoftravellers: value });
  }

  handletravellerclass = (event,value) => {
    event.preventDefault();
    console.log(value);
    this.setState({ travellerclass: value });
  }

  
  handleStopClass = (event,value) => {
    event.preventDefault();
    console.log(value);
    this.setState({ stop: value });
  }

  handleDateChange = (date) => {
    const arrivalDate = moment(date).format("YYYY-MM-DD");
    this.setState({ selectedDate: arrivalDate });
  };

  handleChangeArrivalAt = (event, value) => {
    event.preventDefault();
    console.log(value);
    this.setState({ arrivalcity: value });
  };

  handleDateChange1 = (date) => {
    console.log(date)
    const beginDate = moment(date).format("YYYY-MM-DD");
    console.log(beginDate);
    this.setState({ depatureDate: beginDate });
  };

  classes = this.useStyles;

  handleSubmit = (event) => {
    event.preventDefault();
    var targetUrl = "http://localhost:8080/traveller/logout";

    fetch(targetUrl, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        // check for error response
        if (response.status == "200") {
          this.state.isLoggedOut = "True";
          if (this.state.isLoggedOut == "True") {
            console.log("redirecting to home page.....");
            this.props.history.push("/traveller/signin");
            // <Redirect to={'/traveller/success'} />
          }
          // get error message from body or default to response statusText
        }

        // this.setState({ totalReactPackages: data.total })
      })
      .catch((error) => {
        // this.setState({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
  };

  handleFlightSearch = (event) => {
    event.preventDefault();
    this.state.searchResult = true;

    console.log("departure date " + this.state.depatureDate);
    console.log("arrival date " + this.state.selectedDate);
    console.log("arrival city " + this.state.arrivalcity);
    console.log("departure city " + this.state.departurecity);
    console.log("no of travellers " + this.state.countoftravellers);
    console.log("traveller class " + this.state.travellerclass);

    var targetUrl = config.API_URL + "/travel/search/flight";
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: this.state.departurecity[0].iataCode,
        destination: this.state.arrivalcity[0].iataCode,
        travelDate:this.state.depatureDate,
        returnDate: this.state.arrivaldDate,
        nonStop: this.state.stop === "Non-stop",
        adults: this.state.countoftravellers,
        travelClass: this.state.travellerclass,
      }),
    };
    fetch(targetUrl, requestOptions)
    .then(res => res.json())
    .then((response) => {
       if(response.flights.length === 0 && response.returnFlights.length === 0){
          alert("No flights found for your search. Please select different route!")
          console.log("test")
       } else {
         this.setState({
          flights : response.flights,
          returnFlights : response.returnFlights,
         })
       }
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
  };

  handleAirportSearch = (query) => {
    //setIsLoading(true);
    console.log(query)
    var targetUrl = config.API_URL + "/travel/airport/search/"+query;
    fetch(targetUrl,{
      method: "GET",
       credentials: "include",
       headers: {'Content-Type': 'application/json', Accept: 'application/json'},
     })
     .then(res => res.json())
      .then((res) => {
        console.log(res)
        const options = res.data.map((i) => ({
          name: i.name,
          iataCode: i.iataCode
        }));

       this.setState({ options: options,
                      isLoading : true,
                    });
        // setIsLoading(false);
      });
  };

  handleChangeMode = (event) => {
    event.preventDefault();
    this.setState({ onewayflag: true });
  };

  handleResetMode = (event) => {
    event.preventDefault();
    this.setState({ onewayflag: false });
  };

  renderFlights = () => {
    return (
      this.state.flights.map(flight => {
        return (
        <div>
          <Card
            className={this.classes.root1}
            raised="true"
            style={{ width: "80%" }}
          >
            <CardHeader style={{height: '250px', background: flight.airline }}></CardHeader>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                  {flight.duration}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                  {flight.price}
              </Typography>
            </CardContent>
            <CardActions>
              <Btn size="small" color="primary">
                Add to itinerary
              </Btn>
            </CardActions>    
          </Card>
        </div>
        )
      })
    )
  }

  renderReturnFlights= () => {
    return (
      this.state.returnFlights.map(flight => {
        return (
        <div>
          <Card
            className={this.classes.root1}
            raised="true"
            style={{ width: "80%", marginLeft: "140px", marginTop: "40px" }}
          >
            <CardHeader>{flight.airline}</CardHeader>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                  {flight.duration}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                  {flight.price}
              </Typography>
            </CardContent>
            <CardActions>
              <Btn size="small" color="primary">
                Add to itinerary
              </Btn>
            </CardActions>    
          </Card>
        </div>
        )
      })
    )
  }

  render() {
    return (
      <Grid>
        <CssBaseline />
        <div className={this.classes.root}>
          <AppBar position="static" style={{ backgroundColor: "indigo" }}>
            <Toolbar>
              <Typography
                className={this.classes.title}
                variant="h6"
                noWrap
                style={{
                  fontSize: "24px",
                  marginLeft: "275px",
                  paddingRight: "800px",
                }}
              >
                GoBike
                <DirectionsBikeIcon className={this.classes.logo} />
              </Typography>

              <Link to={"/traveller/signin"} style={{ float: "right" }}>
                <Button
                  size="sm"
                  style={{ alignItems: "right", marginRight: "10px" }}
                  onClick={this.handleSubmit}
                >
                  logout
                </Button>
              </Link>
            </Toolbar>
          </AppBar>
        </div>
        <Grid container>
          <Grid item xs={2}>
            <Panel />
          </Grid>
          <Grid item xs={10}>
            <h1 style={{ marginLeft: "20px" }}>Search your travel route</h1>
            <div style={{ marginLeft: "20px" }}>
              <Button
                style={{ backgroundColor: "indigo", color: "white" }}
                onClick={this.handleResetMode}
              >
                Roundtrip
              </Button>
              <Button
                style={{ backgroundColor: "indigo", color: "white" }}
                onClick={this.handleChangeMode}
              >
                one-way
              </Button>
            </div>
            <Card
              raised="true"
              style={{ width: "85%", marginLeft: "100px", marginTop: "40px" }}
            >
              <div style={{ backgroundColor: "lightyellow" }}>
                {/* // style={{ backgroundColor: "lightyellow" }}> */}
                <div style={{ display: "inline-block" }}>
                  <LocationOnIcon />
                  <AsyncTypeahead
                    id="source"
                    labelKey="name"
                    minLength={3}
                    onChange={(selected) => this.setState({departurecity : selected})}
                    //  isLoading={this.state.isLoading}
                    onSearch={this.handleAirportSearch}
                    // onChange={setSingleSelections}
                    options={this.state.options}
                    placeholder="Enter source"
                    // selected={singleSelections}
                  //  renderMenuItemChildren={(option, props) => (
                  //   <React.Fragment>
                  //     <span>{option.name}</span>
                  //   </React.Fragment>
                  // )}
                 />
                  {/* <Autocomplete
                    id="combo-box-demo"
                    options={this.cities}
                    // getOptionLabel={(option) => option.city}
                    style={{ backgroundColor: "lightyellow" }}
                    // style={{ width: "600", marginTop: "5px",marginLeft:"5px" }}
                    // autoSelect
                    value={this.state.departurecity}
                    onInputChange={this.handleChangeLeavingFrom}
                    // onChange={this.handleChangeLeavingFrom}
                    onChange={this.handleChangeLeavingFrom}
                    // value={this.state.departurecity}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        style={{
                          width: "500px",
                          marginTop: "5px",
                          marginLeft: "20px",
                          backgroundColor: "lightyellow",
                        }}
                        id="start"
                        // select
                        label="Leaving from"
                        // value={this.state.departurecity}
                        // onChange={(val) => this.handleChangeLeavingFrom(val)}
                        variant="outlined"
                        color="primary"
                        // size="medium"
                      />
                    )}
                  /> */}
                </div>

                <div style={{ display: "inline-block" }}>
                  <LocationOnIcon />
                  <AsyncTypeahead
                    id="destination"
                    labelKey="name"
                    minLength={3}
                    onChange={(selected) => this.setState({arrivalcity : selected})}
                    //  isLoading={this.state.isLoading}
                    onSearch={this.handleAirportSearch}
                    // onChange={setSingleSelections}
                    options={this.state.options}
                    placeholder="Enter source"
                    // selected={singleSelections}
                    renderMenuItemChildren={(option, props) => (
                    <React.Fragment>
                      <span>{option.name}</span>
                    </React.Fragment>
                  )}
                />
                  {/* <Autocomplete
                    id="combo-box-demo2"
                    options={this.cities}
                    // getOptionLabel={(option) => option.city}
                    style={{ width: "15%", display: "inline-block" }}
                    autoSelect
                    value={this.state.arrivalcity}
                    onInputChange={this.handleChangeArrivalAt}
                    onChange={this.handleChangeArrivalAt}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="start"
                        style={{
                          width: "500px",
                          marginTop: "5px",
                          marginLeft: "5px",
                        }}
                        // select
                        label="Going to"
                        // value={value}
                        // onChange={this.handleChange}
                        variant="outlined"
                        color="primary"
                        size="medium"
                      />
                    )}
                  /> */}
                </div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    // style={{
                    //   marginLeft: "15px",
                    //   height: "20px",
                    //   width: "20%",
                    //   marginTop: "45px",
                    // }}
                    disableToolbar
                    variant="inline"
                    format="yyyy-MM-dd"
                    size="small"
                    margin="normal"
                    id="date-picker-inline"
                    label="Select departure date"
                    color="primary"
                    font="Helvetica"
                    // inputFormat={(date) => moment(new Date()).format('MM-DD-YYYY')}
                    value={this.state.depatureDate}
                    onChange={this.handleDateChange1}
                  />
                </MuiPickersUtilsProvider>
                {this.state.onewayflag === true ? null : (
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      // style={{
                      //   marginLeft: "15px",
                      //   marginTop: "45px",
                      //   height: "20px",
                      //   width: "20%",
                      // }}
                      disableToolbar
                      variant="inline"
                      format="yyyy-MM-dd"
                      size="small"
                      margin="normal"
                      id="date-picker-inline"
                      label="Select returning date"
                      color="primary"
                      font="Helvetica"
                      value={this.state.selectedDate}
                      onChange={this.handleDateChange}
                    />
                  </MuiPickersUtilsProvider>
                )}
                <div style={{ display: "inline-block" }}>
                  <Autocomplete
                    id="combo-box-demo3"
                    options={this.countoftravellers}
                    // getOptionLabel={(option) => option.value}
                    // style={{ width: "15%", display: "inline-block" }}
                    autoSelect
                    value={this.state.countoftravellers}
                    onChange={this.handleCountoftravellers}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="start"
                        // style={{
                        //   width: "200px",
                        //   // marginTop: "5px",
                        //   marginLeft: "10px",
                        //   marginBottom: "10px",
                        // }}
                        // select
                        label="No. of passengers"
                        // value={value}
                        // onChange={this.handleChange}
                        variant="outlined"
                        color="primary"
                        size="medium"
                      />
                    )}
                  />
                </div>

                <div style={{ display: "inline-block" }}>
                  <Autocomplete
                    id="combo-box-demo4"
                    options={this.travellerclass}
                    // getOptionLabel={(option) => option.value}
                    // style={{ width: "15%", display: "inline-block" }}
                    autoSelect
                    value={this.state.travellerclass}
                    onChange={this.handletravellerclass}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="start"
                        // style={{
                        //   width: "200px",
                        //   // marginTop: "5px",
                        //   marginLeft: "10px",
                        //   marginBottom: "10px",
                        // }}
                        // select
                        label="class"
                        // value={value}
                        onChange={this.handleChange}
                        variant="outlined"
                        color="primary"
                        size="medium"
                      />
                    )}
                  />
                </div>
                <div style={{ display: "inline-block" }}>
                  <Autocomplete
                      id="combo-box-demo4"
                      options={this.stop}
                      // getOptionLabel={(option) => option.value}
                      // style={{ width: "15%", display: "inline-block" }}
                      autoSelect
                      value={this.state.stop}
                      onChange={this.handleStopClass}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          id="stop"
                          label="stop"
                          // value={value}
                          onChange={this.handleChange}
                          variant="outlined"
                          color="primary"
                          size="medium"
                        />
                      )}
                    />
                  </div>
                <Button
                  style={{
                    backgroundColor: "indigo",
                    width: "15%",
                    // marginTop: "35px",
                    // marginLeft: "15px",
                    // height: "55px",
                    // fontSize: "18px",
                    fontFamily: "Arial",
                    color: "white",
                  }}
                  onClick={this.handleFlightSearch}
                >
                  Search
                </Button>
              </div>
            </Card>
            <div>
              {this.state.flights && this.renderFlights()}
              {this.state.returnFlights &&this.renderReturnFlights()}
            </div>
                  
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(Travel);
