const Footer = () => {
    return (
      <footer className="bg-gray-900 text-gray-300 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          
          {/* Copyright */}
          <p className="text-sm text-center md:text-left">© 2025 MyApp. All rights reserved.</p>
  
          {/* Quick Links */}
          <ul className="flex space-x-4 mt-3 md:mt-0">
            <li><a href="#" className="hover:text-white transition">About</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
          </ul>

  
        </div>
      </footer>
    );
  };
  
  export default Footer;
  