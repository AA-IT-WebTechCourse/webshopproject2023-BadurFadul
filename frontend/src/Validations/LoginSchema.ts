import * as yup from "yup"

const loginSchema = yup.object({
    username: yup
        .string()
        .required("firstname cannot be empty")
        .min(3, "firstname must be at least 6 characters")
        .max(20, "firstname must be maximum 20 characters"),
    password: yup
        .string().required("password cannot be empty")
})

export type logindata = yup.InferType<typeof loginSchema>
export default loginSchema