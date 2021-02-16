import { useUser } from '../lib/hooks';
import Layout from '../components/layout';

const Profile = () => {
  const user = useUser({ redirectTo: '/login' });
  return (
    <Layout>
      {user && (
        <>
          <section className="profile">
            <header className="header">
              <div className="details">
                <img
                  src={user.image_url || '/default-profile.png'}
                  alt="profile image"
                  className="profile-pic"
                />
                <h1 className="heading">{user.name}</h1>
                <div className="location">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12 ,2Z"></path>
                  </svg>
                  <p>{user.userLocation}</p>
                </div>
                <div className="stats">
                  <div className="col-4">
                    <h4>{user.challenges.length}</h4>
                    <p>Challenges</p>
                  </div>
                  <div className="col-4">
                    <h4>{user.connections.length}</h4>
                    <p>Connections</p>
                  </div>
                  <div className="col-4">
                    <h4>{user.markers.length}</h4>
                    <p>Map Markers</p>
                  </div>
                </div>
              </div>
            </header>
          </section>
        </>
      )}

      <style jsx>{`
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        .header {
          min-height: 60vh;
          background: #009fff;
          background: linear-gradient(to right, #ec2f4b, #009fff),
            url('/bg-pattern4.jpg');
          color: white;
          clip-path: ellipse(100vw 60vh at 50% 50%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .details {
          text-align: center;
        }

        .profile-pic {
          height: 6rem;
          width: 6rem;
          object-fit: center;
          border-radius: 50%;
          border: 2px solid #fff;
        }

        .location p {
          display: inline-block;
        }

        .location svg {
          vertical-align: middle;
        }

        .stats {
          display: flex;
        }

        .stats .col-4 {
          width: 10rem;
          text-align: center;
        }

        .heading {
          font-weight: 400;
          font-size: 1.3rem;
          margin: 1rem 0;
        }
      `}</style>
    </Layout>
  );
};

export default Profile;
