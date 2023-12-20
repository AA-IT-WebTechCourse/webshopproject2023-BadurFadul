import { TypedUseSelectorHook, useSelector } from "react-redux";
import { GlobalState } from "../Redux/store";

const useAppSelector:TypedUseSelectorHook<GlobalState> = useSelector
export default useAppSelector