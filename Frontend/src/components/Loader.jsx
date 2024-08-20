import { momentum } from "ldrs";

const Loader = () => {
  momentum.register();
  return (
    <l-momentum size="90" speed="1.1" color="black"></l-momentum>
  );
};

export default Loader;
