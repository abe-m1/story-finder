import { useState } from 'react';
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import { useUser } from '../lib/hooks';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const NewConnectionForm = ({
  formId,
  userForm,
  userId,
  onboardStep,
  forNewPet = true,
}) => {
  const router = useRouter();
  const contentType = 'application/json';
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [locationName, setLocationName] = useState('');
  const [geoResults, setGeoResults] = useState({});
  const [coords, setCoords] = useState({});
  const [form, setForm] = useState({
    name: userForm.name,
    connection: userForm.connection,
  });
  /* The PUT method edits an existing entry in the mongodb database. */
  const handleChange1 = (locName) => {
    setLocationName(locName);
  };

  const handleSelect = (locationName) => {
    setLocationName(locationName);
    geocodeByAddress(locationName)
      .then((results) => {
        setGeoResults(results[0]);

        return getLatLng(results[0]);
      })
      .then((latLng) => setCoords(latLng))
      .catch((error) => console.error('Error', error));
  };

  const putData = async (form) => {
    try {
      const res = await fetch(`/api/user/${userId}`, {
        method: 'PATCH',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      mutate(`/api/user/${userId}`, data, false); // Update the local data without a revalidation
      // router.push('/');
    } catch (error) {
      setMessage('Failed to update pet');
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (imagePreviewUrl) => {
    //
    const geoResult = await opencage.geocode({
      q: locationName,
      key: '7366e3ec71b04c7989dec9bb0033fb90',
      no_annotations: 1,
      limit: 1,
    });

    if (geoResult) {
      console.log(geoResult);
      setCoords(geoResult.results[0].geometry);
    }
    // .then((data) => {
    //   // console.log(JSON.stringify(data));
    //   console.log(data.results[0].geometry);
    //   setCoords(data.results[0].geometry);
    // })
    // .catch((error) => {
    //   console.log('error', error.message);
    // });
    //
    console.log('this is form', form, userId, coords, locationName);
    try {
      console.log();
      const res = await fetch('/api/connection', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify({
          ...form,
          imagePreviewUrl,
          locationName,
          coords: geoResult.results[0].geometry,
          userId,
        }),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push('/onboard');
    } catch (error) {
      console.log(error);
      setMessage('Failed to add pet');
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const value =
      target.name === 'poddy_trained' ? target.checked : target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: target.value,
    });
  };

  const handleChange2 = (e) => {
    setLocationName(e.target.value);
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();
    console.log('handling submit');
    opencage
      .geocode({
        q: locationName,
        key: process.env.GEOCODE_KEY,
        no_annotations: 1,
        limit: 1,
      })
      .then((data) => {
        // console.log(JSON.stringify(data));
        console.log(data.results[0].geometry);
        setCoords(data.results[0].geometry);
      })
      .catch((error) => {
        console.log('error', error.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      forNewPet ? postData(imagePreviewUrl) : putData(imagePreviewUrl);
    } else {
      setErrors({ errs });
    }
  };

  const handleImageChange = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {};
    // if (!form.imagePreviewUrl) err.name = 'Name is required';
    // if (!form.owner_name) err.owner_name = 'Owner is required';
    // if (!form.species) err.species = 'Species is required';
    // if (!form.image_url) err.image_url = 'Image URL is required';
    return err;
  };

  return (
    <>
      <div className="container">
        <form id={formId} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Location</label>
            <input
              type="text"
              maxLength="20"
              name="name"
              value={locationName}
              onChange={handleChange2}
              required
            />
            <label htmlFor="name">Name</label>
            <input
              type="text"
              maxLength="20"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="name">Type of connection</label>
            <input
              type="text"
              maxLength="20"
              name="name"
              value={form.connection}
              onChange={handleChange}
              required
            />
          </div>

          <label htmlFor="image">Upload Image</label>
          <div className="row">
            <div className="">
              <div className="">
                Add image
                <input
                  className=""
                  type="file"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
            </div>
            <div className="">
              {imagePreviewUrl && (
                <button onClick={() => setImagePreviewUrl('')}>remove</button>
              )}
            </div>
          </div>

          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
      <style jsx>{`
        form {
          width: 90%;
          margin: auto;
          max-width: 550px;
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
          width: 90%;
        }
        .container {
          padding: 3rem;
          background-color: #fff;
          height: 60%;
          width: 60%;
        }
      `}</style>
    </>
  );
};

export default NewConnectionForm;
