import React, { useState, useEffect, useRef } from 'react';
import { assets } from '../../assets/assets';

const ProfileUser = () => {
  const [user, setUser] = useState(localStorage.getItem('profileImage') || assets.user_icon);
  const [name, setName] = useState(localStorage.getItem('userName') || 'Satyam');
  const [isOpen, setIsOpen] = useState(true);
  const [showbar, setshowBar] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedProfileImage = localStorage.getItem('profileImage');
    if (storedProfileImage) {
      setUser(storedProfileImage);
    }
  }, []);

  const handleProfileImageChange = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result;
        setUser(imageUrl);
        localStorage.setItem('profileImage', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('userName', name);
  };

  const toggleProfile = () => {
    setIsOpen(prev => !prev); 
  };

  return (
    <div className={`absolute right-10 top-20 flex flex-col justify-center items-center bg-mainBG-200 h-50 rounded-xl p-5 ${isOpen ? 'block' : 'hidden'}`}>
        {showbar ? <div className='relative w-full -top-5'>
        <div className='bars'></div>
        <div className='bars'></div>
        <div className='bars'></div>
        </div> : null}
      <img src={assets.plus_icon} className='rotate-45 h-6 absolute right-3 top-3 cursor-pointer' onClick={toggleProfile} alt="" />
      <div className='flex flex-col justify-center items-center'>
        <img
          src={user}
          alt=""
          className='w-14 h-14 rounded-full cursor-pointer border-spacing-2 border pointr hover:border-mainBG-100'
          onClick={handleProfileImageChange}
        />
        <img
          src={assets.pen}
          alt=""
          className='w-6 h-6 rounded-full cursor-pointer absolute ml-9 mt-4 bg-white p-1'
          onClick={handleProfileImageChange}
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />
        <p>Hi, {name}</p>
      </div>

      <div className='flex flex-col p-3'>
        <input
          type="text"
          className="rounded-full -border-spacing-3 border border-mainBG-300 text-black px-3 py-2 outline-none"
          placeholder='Enter your name'
          value={name}
          onChange={(e) => { setName(e.target.value) }}
        />
      </div>
      <button
  className='w-auto rounded-full px-4 py-1.5 text-base flex bg-white text-black'
  onClick={() => {
    handleSave();
    setshowBar(true);
    setTimeout(() => {
      toggleProfile();
      window.location.reload();
    }, 1000);
  }}
>
  Save
</button>


    </div>
  );
};
export default ProfileUser;
