'use client';

import css from './EditProfilePage.module.css';
import { useEffect, useState } from 'react';
import { updateMe } from '@/lib/api/clientApi';
import useAuthStore from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const EditProfile = () => {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const [userName, setUserName] = useState(user?.username ?? '');

  const setUser = useAuthStore(state => state.setUser);
  useEffect(() => {
    if (user) {
      setUserName(user.username);
    }
  }, [user]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedUser = await updateMe({ userName });
    setUser(updatedUser);
    router.push('/profile');
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  if (!user) return null;
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form onSubmit={handleSaveUser} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              value={userName}
              onChange={handleChange}
              id="username"
              type="text"
              className={css.input}
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
