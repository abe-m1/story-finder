import { useState } from 'react';
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import { useUser } from '../lib/hooks';

const ProfileForm = ({
  formId,
  userForm,
  userId,
  forNewPet = false,
  advanceScreen,
}) => {
  const router = useRouter();
  const contentType = 'application/json';
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [position, setPosition] = useState({});
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const [form, setForm] = useState({
    name: userForm.name,
    age: userForm.age,
    image_url: userForm.image_url,
    onboardingStep: 2,
  });

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    try {
      const res = await fetch(`/api/user/${userId}`, {
        method: 'PATCH',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify({ ...form, position }),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      mutate(`/api/user/${userId}`, data, false); // Update the local data without a revalidation
      // router.push('/');
      advanceScreen();
    } catch (error) {
      setMessage('Failed to update user');
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify({ ...form, position }),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push('/onboard');
    } catch (error) {
      setMessage('Failed to add user');
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const value =
      target.name === 'poddy_trained' ? target.checked : target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      forNewPet ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  const getLocation = () => {
    const geolocation = navigator.geolocation;

    if (!geolocation) {
      throw new Error('Not Supported');
    }
    geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        return position;
      },
      () => {
        console.log('permission denied');
      }
    );
  };

  const formValidate = () => {
    let err = {};
    // if (!form.name) err.name = 'Name is required';
    // if (!form.image_url) err.image_url = 'Image URL is required';
    return err;
  };

  return (
    <>
      <div className="container">
        <form id={formId} onSubmit={handleSubmit}>
          <label htmlFor="name">What is your name</label>
          <input
            type="text"
            maxLength="20"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
          />

          <div className="location-box">
            <label htmlFor="name">Where are you located?</label>
            <p>Story time would like to user your location</p>
            <button className="" onClick={getLocation}>
              Allow
            </button>
          </div>

          <button type="submit" className="btn">
            Submit
          </button>
        </form>
        <p>{message}</p>
        <div>
          {Object.keys(errors).map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </div>
      </div>
      <style jsx>{`
        form {
          width: 60%;
          margin: auto;
          max-width: 550px;
          background-color: #fff;
          padding: 2rem;
          border-radius: 10px;
        }
        input,
        form button,
        label {
          display: block;
        }
        form button,
        input,
        textarea {
          outline: none;
        }
        input,
        textarea {
          border: 1px solid rgb(199, 199, 199);
          border-radius: 10px;
          padding: 10px;
          font-size: 90%;
          width: 100%;
          height: 30px;
          color: rgb(53, 53, 53);
        }
        textarea {
          height: 50px;
        }
        label {
          margin-top: 10px;
        }
        form button {
          --accent: rgb(0, 162, 255);
          margin-top: 20px;
        }

        .form-container {
          width: 60%;
        }
        // .container {
        //   padding: 3rem;
        //   background-color: #fff;
        //   height: 100%;
        //   width: 40%;
        //   border-radius: 10px;
        // }
        .location-box {
          padding: 1rem;
          border: 1px solid #ebebeb;
          margin-top: 1rem;
        }
      `}</style>
    </>
  );
};

export default ProfileForm;
