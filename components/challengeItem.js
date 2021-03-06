import Link from 'next/link';

const ChallengeItem = ({
  challenge,
  challengeName,
  challengeDescription,
  currentChallenge,
  completed,
}) => {
  const imageUrl = `/challenge-icon-${challenge.id}.jpg`;
  return (
    <Link href={`/challenge/${challenge.id}`}>
      <li className={`item-container ${completed ? '' : 'fade'}`}>
        <div>
          <img src={imageUrl} className="img" alt="challenge picture" />
          <Link href={`/challenge/${challenge.id}`}>
            <span className="new">View</span>
          </Link>
        </div>
        <div className="challenge-info">
          <div className="top-line">
            <span className="challenge-number">Challenge #{challenge.id}</span>{' '}
            <span className="new">{challenge.challengeType}</span>
            {currentChallenge === challenge.id && (
              <span className="featured">Current</span>
            )}
            <p className="position">{challenge.challengeName}</p>
            {/* <span>{challenge.challengeName}</span>{' '}
          <span className="seperator">&bull;</span>{' '}
          <span>{challenge.challengeName}</span>{' '}
          <span className="seperator">&bull;</span>{' '}
          <span>{challenge.challengeName}</span> */}
            <span>{challenge.challengeDescription}</span>
            <hr className="horizontal-rule" />
          </div>
          <div className="filter-items">
            {challenge.tags.map((tag) => (
              <span id={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        {currentChallenge > challenge.id && (
          <div>
            <img
              src="/images/badge1.png"
              className="img"
              alt="challenge picture"
            />
          </div>
        )}

        <style jsx>{`
          .item-container {
            cursor: pointer;
            width: 80%;
            margin: auto;
            margin-bottom: 2rem;
            background-color: #fff;
            text-align: left;
            border-radius: 4px;
            box-shadow: 0px 3px 15px hsla(180, 29%, 50%, 0.3);
            padding: 1rem;
          }
          .feature-selected {
            border-left: 4px solid hsl(180, 29%, 50%);
          }

          .img {
            margin-top: -2rem;
            width: 60px;
            margin-bottom: 0.6rem;
          }

          .challenge-number {
            font-weight: 700;
            color: hsl(180, 29%, 50%);
            margin-right: 0.6rem;
          }
          .new {
            background-color: hsl(180, 29%, 50%);
            padding: 0.2rem 0.6rem;
            border-radius: 12px;
            text-transform: uppercase;
            font-size: 0.8rem;
            color: hsl(180, 31%, 95%);
            font-weight: 700;
            margin-right: 0.5rem;
          }

          .featured {
            background-color: #000;
            color: white;
            padding: 0.2rem 0.6rem;
            border-radius: 12px;
            text-transform: uppercase;
            font-size: 0.8rem;
            font-weight: 700;
          }

          .horizontal-rule {
            margin-top: 1rem;
          }

          .tag {
            margin-right: 0.8rem;
            padding: 5px 10px;
            background-color: hsl(180, 52%, 96%);
            border-radius: 5px;
            margin-bottom: 1rem;
            font-weight: 700;
            font-size: 0.8rem;
            color: hsl(180, 29%, 50%);
          }
          .tag:hover {
            background-color: hsl(180, 29%, 50%);
            color: hsl(180, 52%, 96%);
          }
          .position {
            font-weight: 700;
            color: black;
          }
          .filter-items {
            margin-top: 1rem;
            display: flex;
            flex-wrap: wrap;
          }
          @media (min-width: 900px) {
            .item-container {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .img {
              margin-top: 0;
              width: 115px;
            }
            .challenge-info {
              margin-right: auto;
              margin-left: 4rem;
            }

            .top-line {
              margin-bottom: 0.5rem;
            }
            .challenge-number {
              margin-bottom: 0.5rem;
            }
            .seperator {
              margin-left: 0.5rem;
              margin-right: 0.5rem;
            }
            .horizontal-rule {
              display: none;
            }
            .tag {
              font-size: 1rem;
            }

            .fade {
              background-color: #ebebeb;
              pointer-events: none; //This makes it not clickable
              opacity: 0.6; //This grays it out to look disabled
            }
          }
        `}</style>
      </li>
    </Link>
  );
};

export default ChallengeItem;
