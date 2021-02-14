const ChallengeItem = ({ challenge, challengeName, challengeDescription }) => {
  return (
    <li className="item-container">
      <div>
        <img className="img" alt="challenge picture" />
      </div>
      <div className="company-info">
        <div className="top-line">
          <span className="company">{challenge.challengeName}</span>{' '}
          <span className="new">Test!</span>{' '}
          <span className="featured">Places</span>
          <p className="position">{challenge.challengeName}</p>
          <span>{challenge.challengeName}</span>{' '}
          <span className="seperator">&bull;</span>{' '}
          <span>{challenge.challengeName}</span>{' '}
          <span className="seperator">&bull;</span>{' '}
          <span>{challenge.challengeName}</span>
          <hr className="horizontal-rule" />
        </div>
        <div className="filter-items">
          <span className="tag">{challenge.challengeName}</span>
          <span className="tag">{challenge.challengeName}</span>
        </div>
      </div>
      <style jsx>{`
        .item-container {
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
          width: 50px;
          margin-bottom: 0.6rem;
        }

        .company {
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
            width: 90px;
          }
          .company-info {
            margin-right: auto;
            margin-left: 4rem;
          }

          .top-line {
            margin-bottom: 0.5rem;
          }
          .company {
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
        }
      `}</style>
    </li>
  );
};

export default ChallengeItem;
