import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useUser } from '../lib/hooks';
import Layout from '../components/layout';
import Form from '../components/form';
// import d3 from 'd3';
import React from 'react';
// import Tree from 'react-d3-tree';
import dynamic from 'next/dynamic';
import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';
// import handler from './api/pets/[id]';

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
        onClick: (event, node) => alert(`Clicked ${node}!`),
      },
    },
    {
      name: 'Child Two',
      id: 34534545,
    },
  ],
};

// const Tree = dynamic(() => import('react-d3-tree'), { ssr: false });

const orgChart = {
  name: 'CEO',
  children: [
    {
      name: 'Manager',
      attributes: {
        department: 'Production',
      },
      children: [
        {
          name: 'Foreman',
          attributes: {
            department: 'Fabrication',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
        {
          name: 'Foreman',
          attributes: {
            department: 'Assembly',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
      ],
    },
  ],
};

const About = () => {
  function hand(e, k, r) {
    console.log('clicked', e, k, r);
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

export default About;
