const { render } = ReactDOM;
import { ReactSupamenu } from "../../dist/supamenu-react/index.js";
const domNode = document.getElementById("root");

const Example = () => {
  return <div>Hello, React!</div>;
};

render(<Example />, domNode);
