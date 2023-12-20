import * as yup from "yup"

const registrationSchema = yup.object({
    username: yup
        .string()
        .required("firstname cannot be empty")
        .min(4, "firstname must be at least 6 characters")
        .max(20, "firstname must be maximum 20 characters"),
    email: yup
        .string().email().required("email cannot be empty"),
    password: yup
        .string()
        .required("password cannot be empty")
        .min(4, "username must be at least 4 characters")
        .max(20, "username must be maximum 20 characters"),
    confirm: yup.string()
        .required("password cannot be empty")
        .oneOf([yup.ref("password")], "Password does not match")
})

export type registrationFormData = yup.InferType<typeof registrationSchema>
export default registrationSchema