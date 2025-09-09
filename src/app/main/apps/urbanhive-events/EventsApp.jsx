import React, {useEffect} from "react";
import {
  TextField,
  MenuItem,
  Button,
  Divider,
  Select,
  FormControl,
  FormHelperText,
  Chip,
  Autocomplete,
} from "@mui/material";
import { useForm, Form } from "./components/useForms";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { useDispatch, useSelector } from "react-redux";
import Icon from "@material-ui/core/Icon";
import { Paper } from "@mui/material";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { useLocation } from "react-router-dom";

const initialFValues = {
  name: "",
  email: "",
  date: "",
  email:"",
  eventType: "",
};



function EventsScreen() {
  
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = fieldValues.email ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = fieldValues.email ? "" : "This field is required.";
    if ("date" in fieldValues)
      temp.date = fieldValues.date ? "" : "This field is required.";
    if ("eventType" in fieldValues)
      temp.eventType = fieldValues.eventType ? "" : "Select an event.";
    setErrors({ ...temp });
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).every((x) => x === "")) {
      console.log("Form submitted:", values);
      resetForm();
    }
  };
  const { isAuth } = useSelector((state) => state.login);
  const location = useLocation();
  const { name, email } = location.state || {}; 
  useEffect(() => {
  if (name || email) {
    setValues((prev) => ({
      ...prev,
      name: name || prev.name,
      email: email || prev.email,
    }));
  }
}, [name, email, setValues]);

  if (!isAuth) return <Redirect to={"/login"} />;

  return (
    <FusePageSimple
      header={
        <div
          className="flex flex-1 items-center justify-between p-12 md:p-24"
          style={{backgroundColor: "#20dbe4"}}
        >
          <div className="flex flex-col">
            <div className="flex items-center mb-16">
              <Icon className="text-18" color="action">
                home
              </Icon>
              <Icon className="text-16" color="action">
                chevron_right
              </Icon>
              <Typography color="white" className="font-semibold">
                Events
              </Typography>
            </div>
            <Typography variant="h6" className="text-28 sm:text-24 font-bold">
              Add Events
            </Typography>
          </div>
        </div>
      }
      content={
        <div className="p-12 md:p-24 max-w-2xl">
          <Paper
            height="100vh"
            display="flex"
            flexDirection="column"
            sx={{ padding: 5 }}
          >
            <Form
              onSubmit={handleSubmit}
              sx={{
                maxWidth: 600,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontSize: "2rem",
              }}
            >
              <div className="flex justify-between">
                <Grid item xs={12} sm={6} style={{ marginTop: "1rem" }}>
                  <TextField
                    label="Name"
                    name="name"
                    value={values.name}
                    onChange={handleInputChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    variant="outlined"
                    InputProps={{
                      sx: { fontSize: "1.3rem", width: "80%" },
                    }}
                    InputLabelProps={{
                      sx: { fontSize: "1.3rem" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} style={{ marginTop: "1rem" }}>
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    variant="outlined"
                    InputProps={{
                      sx: { fontSize: "1.3rem", width: "80%" },
                    }}
                     InputLabelProps={{
                      sx: { fontSize: "1.3rem" },
                    }}
                  />
                </Grid>
              </div>
              <div className="flex justify-between">
                <Grid item xs={12} sm={6} style={{ marginTop: "1rem" }}>
                  <TextField
                    label="Date"
                    name="date"
                    type="date"
                    value={values.date}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.date}
                    helperText={errors.date}
                    variant="outlined"
                    InputProps={{
                      sx: { fontSize: "1.3rem", width: "80%" },
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={{  marginTop: "1rem" }}  >

                <FormControl fullWidth error={!!errors.eventType}>
                  <Select
                    labelId="event-type-label"
                    id="event-type"
                    name="eventType"
                    value={values.eventType}
                    onChange={handleInputChange}
                    displayEmpty
                    sx={{ fontSize: "1.3rem", width: "80%" }}
                  >
                    <MenuItem value="">
                      <em>Choose an event</em>
                    </MenuItem>
                    <MenuItem value="Birthday">Birthday</MenuItem>
                    <MenuItem value="Anniversary">Anniversary</MenuItem>
                  </Select>
                  <FormHelperText>{errors.eventType}</FormHelperText>
                </FormControl>
                  </Grid>
              </div>

              {/* </div> */}
              <Divider>
                <Chip label="😉 | 🔃" />
              </Divider>

              <div
                style={{
                  marginTop: 16,
                  fontSize: "1.3rem",
                  marginLeft: "1rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "2rem",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    fontSize: "1.3rem",
                    borderRadius: "0.7rem",
                    color: "white",
                    backgroundColor: "#20dbe4",
                    width: "100px",
                    height: "40px",
                  }}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </Paper>
        </div>
      }
    />
  );
}

export default EventsScreen;
