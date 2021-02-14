import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { useUser } from '../lib/hooks';
import Layout from '../components/layout';
import Tree from 'react-tree-graph';
import Modal from 'react-modal';
import 'react-tree-graph/dist/style.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const FamilyTree = () => {
  let data = {
    name: 'Parent',
    id: 4545454,

    nodeProps: {
      href: 'Logo1.png',
    },
    children: [
      {
        name: 'Child One5',
        id: 1546564,
        gProps: {
          className: 'red-node',
          onClick: (e, n) => openModal(e, n),
          // onClick: (event, node) => alert(`Clicked ${node}!`),
        },
      },
      {
        name: 'Child Two',
        id: 34534545,
      },
    ],
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedNode, setSelectedNode] = React.useState('');
  function openModal(e, n) {
    setIsOpen(true);
    setSelectedNode(n);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Layout>
      <Tree
        data={data}
        height={400}
        width={400}
        keyProp="id"
        // gProps={{
        //   className: 'node',
        //   onClick: hand,
        // }}
      />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Modal</h2>
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
        <button onClick={closeModal}>close</button>
        <div>I am selected Node {selectedNode}</div>
        <button>add Node</button>
      </Modal>
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
      `}</style>
    </Layout>
  );
};

export default FamilyTree;
