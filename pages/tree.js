import React, { useState, useEffect, useCallback } from 'react';
import Router from 'next/router';
import { useUser } from '../lib/hooks';
import Layout from '../components/layout';
import Tree from 'react-tree-graph';
import Modal from 'react-modal';
import 'react-tree-graph/dist/style.css';
import ConnectionDialog from '../components/ConnectionDialog';

const FamilyTree = () => {
  const user = useUser({ redirectTo: '/login' });

  let data = {
    name: 'Grandpa = Grandma',
    id: 8989,
    children: [
      {
        name: 'Uncle',
        id: 45454542,

        nodeProps: {
          href: 'Logo1.png',
        },
      },
      {
        name: 'Mom = Dad',
        id: 4545454,

        nodeProps: {
          href: 'Logo1.png',
        },
        children: [
          {
            name: 'Brother',
            id: 1546564,
          },
          {
            name: 'Me',
            id: 34534545,
            gProps: {
              className: 'red-node',
              onClick: (e, n) => openModal(e, n),
              // onClick: (event, node) => alert(`Clicked ${node}!`),
            },
          },
        ],
      },
    ],
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedNode, setSelectedNode] = React.useState('');
  const [addConnection, setAddConnection] = useState(false);
  function openModal(e, n) {
    setIsOpen(true);
    setSelectedNode(n);
  }

  const onSuccessSubmit = () => {
    setAddConnection(false);
  };

  const onClose = useCallback(() => {
    setAddConnection(false);
  }, []);

  return (
    <Layout>
      <div className="flex-container">
        <div className="tree">
          <Tree
            data={data}
            height={700}
            width={800}
            keyProp="id"
            textProps={{ x: 10, fill: '#3f51b5', fontSize: '30px' }}
            // gProps={{
            //   className: 'node',
            //   onClick: hand,
            // }}
          />
        </div>
        <aside className="sidebar">
          <div className="top-row">
            <h1>Connections</h1>
            <a onClick={() => setAddConnection(true)}>&#43;</a>
          </div>

          <ul>
            {user.connections.length === 0 && <p>add connections</p>}
            {user.connections.length > 0 &&
              user.connections.map((connection) => (
                <li key={connection._id} className="user">
                  <img
                    className="user__circle"
                    src={connection.connectionImage}
                    alt=""
                  />
                  <div>
                    <p className="user__name">{connection.name}</p>
                    <p className="user__type">{connection.connectionType}</p>
                  </div>
                </li>
              ))}
          </ul>
        </aside>
        <ConnectionDialog
          userId={user._id}
          onSuccessSubmit={onSuccessSubmit}
          addConnection={addConnection}
          onClose={onClose}
        />
      </div>
      <style jsx>{`
        .linage {
          fill: none;
          stroke: #000;
        }
        .marriage {
          fill: none;
          stroke: #989898;
        }
        .marriageNode {
          background-color: #989898;
          border-radius: 50%;
        }
        .man {
          background-color: #989898;
          border-style: solid;
          border-width: 1px;
          box-sizing: border-box;
        }
        .woman {
          background-color: #989898;
          border-style: solid;
          border-width: 1px;
          box-sizing: border-box;
        }
        .emphasis {
          font-style: italic;
        }
        p {
          padding: 0;
          margin: 0;
        }
        svg {
          border-style: solid;
          border-width: 1px;
        }

        .flex-container {
          display: flex;
        }

        .user {
          display: flex;
          margin-bottom: 1rem;
        }
        .user img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 2rem;
        }
        .user__name {
          font-weight: 700;
          // color: #ecf2f8;
        }
        .user__name-dark {
          font-weight: 700;
          // color: #48556a;
        }
        .user__type {
          // color: #ecf2f8;
          opacity: 50%;
          margin-top: 2px;
          margin-bottom: 5px;
        }
        .user__type-dark {
          // color: #48556a;
          opacity: 50%;
        }
        .user__circle {
          border: 2px solid #9681b6;
        }
        .sidebar {
          border-left: 1px solid #ebebeb;
          padding: 2rem;
          flex: 1;
        }

        .top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .top-row a {
          color: #fff;
          padding: 0.8rem 1rem;
          border-radius: 50%;
          background-color: rgb(63, 81, 181);
        }
        .tree {
          flex: 60%;
          padding: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default FamilyTree;
