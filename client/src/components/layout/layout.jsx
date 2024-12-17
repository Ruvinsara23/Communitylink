
import PropTypes from 'prop-types'; // Import prop-types
import Navbar from '../navbar/navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto mt-8 px-4">
        {children}
      </main>
    </div>
  );
};


Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
