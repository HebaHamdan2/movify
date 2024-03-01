import * as Yup from 'yup';
export const registerSchema=Yup.object({
    userName:Yup.string().required("Username is rquired"),
    email:Yup.string().email().required("Email is required"),
    password:Yup.string().required("Password is required at least 8 digits ").matches( /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,"Minimum eight characters, at least one letter and one number"),
    cPassword:Yup.string().required("Confirm Password").oneOf([Yup.ref('password')],"mismatch passwords")
}) 