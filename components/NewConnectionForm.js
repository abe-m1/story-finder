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
    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify({ imagePreviewUrl, userId, onboardStep }),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push('/onboard');
    } catch (error) {
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
      [name]: value,
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
      <form id={formId} onSubmit={handleSubmit}>
        <div className="container">
          <PlacesAutocomplete
            value={locationName}
            onChange={handleChange1}
            onSelect={handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: '',
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        className="autocomplete-dropdown-content"
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span className="suggested-places">
                          {suggestion.description}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
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
          height: 100%;
        }
      `}</style>
    </>
  );
};

export default NewConnectionForm;
