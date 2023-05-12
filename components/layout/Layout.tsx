import { Layout, LayoutProps } from "react-admin";
import { ReactQueryDevtools } from "react-query/devtools";
import { CustomMenu } from "./Menu";
import CustomAppBar from "./AppBar";

const CustomLayout = (props: LayoutProps) => (
  <>
    <Layout {...props} appBar={CustomAppBar} menu={CustomMenu} />
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  </>
);
export default CustomLayout;
