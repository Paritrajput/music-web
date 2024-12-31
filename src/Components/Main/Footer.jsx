// components/Footer.js
import Image from "next/image";

const Footer = () => {
  return (
    <div className=" text-white p-6 mt-8">
      <div className="flex justify-between space-x-6">
        <div className="space-y-2">
          <span className="font-semibold">Company</span>
          <div>About</div>
          <div>Jobs</div>
          <div>For the Record</div>
        </div>
        <div className="space-y-2">
          <span className="font-semibold">Communities</span>
          <div>For Artists</div>
          <div>Vendors</div>
          <div>Developers</div>
          <div>Investors</div>
          <div>Advertising</div>
        </div>
        <div className="space-y-2">
          <span className="font-semibold">Useful Links</span>
          <div>Support</div>
          <div>Free Mobile App</div>
        </div>
        <div className="flex items-center h-16 space-x-4">
          <img src="/twiter.png" alt="Twitter" className="w-10 h-10" />
          <img src="/facebookLogo.png" alt="Facebook" className="w-10 h-10" />
          <img src="/instaLogo.png" alt="Instagram" className="w-7 h-7" />
        </div>
      </div>
      <div className="text-center mt-6">© 2024 Spotify AB</div>
    </div>
  );
};

export default Footer;
