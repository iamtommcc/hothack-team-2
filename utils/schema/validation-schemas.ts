import * as Yup from 'yup'

const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.^,/'"(){}|;:+=_\-\\[\]<>`])[A-Za-z\d@$!%*#?&.^,/'"(){}|;:+=_\-\\[\]<>`]{8,}$/

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Required'),
    password: Yup.string().required('Required').min(8, 'Password must be at least 8 characters').matches(passwordRegExp, 'Password must contain 1 number and one special character')
});

export const signUpValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Required'),
    password: Yup.string()
    .required('Required')
    .min(8, 'Password must be at least 8 characters.')
    .matches(passwordRegExp, 'Password must contain 1 number and one special character.'),
    confirmPassword: Yup.string(), // TODO Must match password
});