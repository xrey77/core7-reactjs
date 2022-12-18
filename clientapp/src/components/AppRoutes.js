import { Home } from "./Home";
import { Aboutus } from "./Aboutus";
import { Services } from "./Services";
import { Products } from "./Products";
const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/aboutus',
    element: <Aboutus />
  },
  {
    path: '/services',
    element: <Services />
  },
  {
    path: '/products',
    element: <Products />
  },

];

export default AppRoutes;
