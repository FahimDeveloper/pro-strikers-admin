import { Suspense } from "react";
import { FaSpinner } from "react-icons/fa";

const LazyLoad = (Component: React.FC) => (props: JSX.IntrinsicAttributes) => {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex justify-center items-center">
          <FaSpinner className="animate-spin size-8 text-primary" />
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default LazyLoad;
