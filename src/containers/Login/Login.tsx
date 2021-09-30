import { Field, FormikHelpers, FormikProvider, useFormik } from "formik";
import { useHistory } from "react-router";
import { useSessionContext } from "../../contexts/SessionContext";
import * as Yup from 'yup';


export default function Login() {
  const [session, setSession] = useSessionContext();
  const history = useHistory();

  const handleLogin = (values: LoginValue, actions: FormikHelpers<LoginValue>) => {
    console.log({ values, actions });
    actions.setSubmitting(false);
    setSession({ ...session, isAuthenticated: true });
    history.push(session.redirectPath);
  }

  const initialValues: LoginValue = { email: '', password: '' };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleLogin,
    validationSchema: Yup.object({
      email: Yup.string().required('Required').email(),
      password: Yup.string().required('Required')
    })
  });

  const validations = (val: LoginValue) => {

  }

  return (
    <FormikProvider value={formik}>
       <form
      onSubmit={formik.handleSubmit}
    >
      <label htmlFor="email">Email</label>
      <Field id="email" placeholder="Email"  {...formik.getFieldProps('email')} />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      <label htmlFor="password">Password</label>
      <Field id="password" placeholder="Password"  {...formik.getFieldProps('password')} />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}
      <button type="submit">Login</button>
    </form>
    </FormikProvider>
   );
}

interface LoginValue {
  email: string;
  password: string;
}