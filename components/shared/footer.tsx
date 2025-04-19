import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12 border-t border-slate-600">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row justify-between items-start">
        
        <div className="flex flex-col items-center lg:pl-36 w-full lg:w-auto"> 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-20 w-20 text-purple-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
          </svg>
          <p className="mt-4 text-lg text-gray-400 text-center">&copy; 2025 CodeVibe. All rights reserved.</p>
        </div>

        <div className='flex flex-col items-center justify-center flex-1 pt-6 mx-0 lg:mx-12 mt-16 lg:mt-0 w-full lg:w-auto'>
          <div className='flex gap-2 justify-center text-xl'>
            <p className='text-2xl'>Made with</p> 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-red-500">
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
            <p className='text-2xl'>by</p>
          </div>
          <div className='flex gap-2 justify-center mt-2'>
            <p className='text'>Ganne ka Juice Paglus</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center lg:justify-start space-x-0 lg:space-x-12 mt-8 lg:mt-0 w-full lg:w-auto lg:pr-52">
          <div className="text-center p-4 lg:text-left mb-8 lg:mb-0">
            <h3 className="text-xl font-semibold mb-3 flex justify-center">Socials</h3>
            <div className='flex gap-4'>
              <ul className="space-y-2 text-gray-400 text-lg">
                <li><a href="#" className="hover:text-red-200">Twitter</a></li>
                <li><a href="https://discord.gg/KjsqfMwJKR" className="hover:text-red-200">Discord</a></li>
              </ul>
              <ul className="space-y-2 text-gray-400 text-lg">
                <li><a href="https://www.instagram.com/cybercell_viit/" className="hover:text-red-200">Instagram</a></li>
                <li><a href="https://in.linkedin.com/company/cybercell-viit" className="hover:text-red-200">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;