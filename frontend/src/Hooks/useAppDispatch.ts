import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";

const useAppDispatch: () => AppDispatch = useDispatch

export default useAppDispatch