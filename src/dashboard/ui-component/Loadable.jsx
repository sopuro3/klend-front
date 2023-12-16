import { Suspense } from "react";

// project imports
import Loader from "./Loader";

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component) => {
    const LoadableT = (props) => (
        <Suspense fallback={<Loader />}>
            <Component {...props} />
        </Suspense>
    );
    return LoadableT;
};

export default Loadable;
