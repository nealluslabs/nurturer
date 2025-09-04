import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@mui/material/Alert';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory,useParams,useLocation } from 'react-router-dom';
import { submitRegister } from 'app/auth/store/registerSlice';
import * as yup from 'yup';
import _ from '@lodash';
import { signup } from 'src/redux/actions/auth.action';
import { db, fb } from '../../../../../config/firebase';
import { logoutSuccess } from 'src/redux/reducers/auth.slice';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const schema = yup.object().shape({
  // displayName: yup.string().required('You must enter display name'),
  fName: yup.string().required('You must enter first name'),
  lName: yup.string().required('You must enter last name'),
  phone: yup.number().required('You must enter phone number'),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

//THIS WILL BE THE COMPANY'S ID FROM THEIR UNIQUE LINK I.E https://nurturer.vercel.app/register/100001
//

//const { id } = props.match.params; // <-- get param here
//
//useEffect(() => {
//  if (id) {
//    console.log("Route param id:", id);
//    // do something with id...
//  }
//}, [id]);


const notifySkip = (message) => toast.error(message, {
  position: "top-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  });


const defaultValues = {
  // displayName: '',
  fName: '',
  lName: '',
  phone: '',
  email: '',
  password: '',
  companyID:'',
  passwordConfirm: '',
};

function RegisterForm(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoading, error2, message2 } = useSelector((state) => state.login)
  // const authRegister = useSelector(({ auth }) => auth.register);

   // the alert is displayed by default
   const [alert, setAlert] = useState(true);


  // fetching id from params -START
 

  const {id}= useParams();
  let companyId =id && id;
  const [companyID, setCompanyID] = useState(id);

useEffect(()=>{
  companyId  = id?id:null

  console.log("OUR ROUTE PARAMS ID IS---->",companyId)
}
,[id])


// fetching id from params - END

  const { control, formState, handleSubmit, reset, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;


  useEffect(() => {
    // when the component is mounted, the alert is displayed for 3 seconds
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }, []);     
    

  // useEffect(() => {
  //   authRegister.errors.forEach((error) => {
  //     setError(error.type, {
  //       type: 'manual',
  //       message: error.message,
  //     });
  //   });
  // }, [authRegister.errors, setError]);

  function userSignup(model) {
    // dispatch(submitRegister(model));

    // const name = model.displayName;
    const fName = model.fName;
    const lName = model.lName;

    const name = fName + ' ' + lName;
    const email = model.email;
    const phone = model.phone;
    const password = model.password;
    const user = { name, email, phone, password,companyID:companyID };
    dispatch(signup(user, history,notifySkip));
  }


  return (
    <div className="w-full">
      <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
      {/* Close after 3 sec */}
      {/* {alert && <Alert  severity="error" color="error">
           Error Dey o
            </Alert>} */}

     {error2 && <div><Alert
        severity="error" color="error"
        action={
          <Button color="inherit" size="small" style={{ fontSize: '15px' }} onClick={() => {dispatch(logoutSuccess())}}>
            <b>X</b>
          </Button>
        }
      >
        <p style={{ fontSize: '11px' }}><b>{error2}</b></p>
      </Alert><br/></div>}

      <form className="flex flex-col justify-center w-full" onSubmit={handleSubmit(userSignup)}>
        {/* <Controller
          name="displayName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              // value={name}
              // onChange={(e) => setName(e.target.value)}
              className="mb-16"
              type="text"
              label="Display name"
              error={!!errors.displayName}
              helperText={errors?.displayName?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      person
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
            />
          )}
        /> */}

         <Controller
          name="fName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              // value={name}
              // onChange={(e) => setName(e.target.value)}
              className="mb-16"
              type="text"
              label="First name"
              error={!!errors.fName}
              helperText={errors?.fName?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      person
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
            />
          )}
        />

        <Controller
          name="lName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              // value={name}
              // onChange={(e) => setName(e.target.value)}
              className="mb-16"
              type="text"
              label="Last name"
              error={!!errors.lName}
              helperText={errors?.lName?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      person
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              className="mb-16"
              type="text"
              error={!!errors.email}
              helperText={errors?.email?.message}
              label="Email"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      email
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
            />
          )}
        />


        <Controller
          name="companyID"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={companyID && companyID}
               onChange={(e) => setCompanyID(e.target.value)}
              className="mb-16"
              type="number"
              disabled={companyId?true:false}
              error={!!errors.companyID}
              helperText={errors?.companyID?.message}
              label="Company ID"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      home
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
            />
          )}
        />

         <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              className="mb-16"
              type="text"
              error={!!errors.phone}
              helperText={errors?.phone?.message}
              label="Phone"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      phone
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              className="mb-16"
              type="password"
              label="Password"
              error={!!errors.password}
              helperText={errors?.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      vpn_key
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
            />
          )}
        />

        <Controller
          name="passwordConfirm"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              // value={cpassword}
              // onChange={(e) => setCpassword(e.target.value)}
              className="mb-16"
              type="password"
              label="Confirm Password"
              error={!!errors.passwordConfirm}
              helperText={errors?.passwordConfirm?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      vpn_key
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full mx-auto mt-16"
          aria-label="REGISTER"
          disabled={_.isEmpty(dirtyFields) || !isValid  || isLoading}
          value="legacy"
        >
          {isLoading ? 'Loading...' : 'Register'}
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
