import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useUser } from '../lib/hooks';
import Layout from '../components/layout';
// import d3 from 'd3';
import React from 'react';
// import Tree from 'react-d3-tree';
import dynamic from 'next/dynamic';
import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';
// import handler from './api/pets/[id]';

const About = () => {
  let data1 = {
    name: 'Parent',
    id: '0-1-0-0',

    nodeProps: {
      href: 'Logo1.png',
    },
    children: [
      {
        name: 'Child One5',
        id: '0-1-1-0',
      },
      {
        name: 'Child Two',
        id: '0-1-2-0',
        children: [
          {
            name: 'Child One6',
            id: '0-1-2-1',
          },
          {
            name: 'Child Two7',
            id: '0-1-2-2',
          },
        ],
      },
    ],
  };

  const [tree, setTree] = useState({});
  useEffect(() => {
    console.log('this is tree before', data1);
    setTree(Object.assign({}, data1));
  }, []);
  function hand(e, k, r) {
    console.log('clicked', e, k, r);
  }

  function add(n) {
    console.log('this is tree', n);
    let newTree = tree;
    newTree.children.push({
      name: 'Child Three',
      id: '0-0-0-a',
    });
    setTree(Object.assign({}, newTree));
  }
  function addParent() {
    console.log('this is tree', tree);
    let newTree = {
      name: 'grandparent',
      id: 3453453344443,
      children: [tree],
    };
    setTree(newTree);
  }

  function traverseDF(neededId) {
    let position = [];
    console.log(tree.children);
    if (tree.id === neededId) {
      console.log('found');
    }
    // map through top level , after each add 'end'
    //when get to end reset counter
    const arr = [...tree.children];

    while (arr.length) {
      const node = arr.shift();
      if (node.children) {
        //same thing here but add 's' after each 's' go deeper
        arr.unshift(...node.children);
      }

      // fn(node);
      if (node.id === neededId) {
        console.log('FOUND', node.id);
        console.log('this is parent', tree.children[1].children[1]);
      }
    }
  }

  function addSpouse(neededId) {
    let position = [];
    console.log(tree.children);
    if (tree.id === neededId) {
      console.log('found', tree.id);
    }
    // map through top level , after each add 'end'
    //when get to end reset counter
    const arr = [...tree.children];

    while (arr.length) {
      const node = arr.shift();
      if (node.children) {
        //same thing here but add 's' after each 's' go deeper
        arr.unshift(...node.children);
      }

      // fn(node);
      if (node.id === neededId) {
        console.log('FOUND', node.id);
        const tails = node.id.split('-');
        console.log(tails);
        let path;
        // for (let char in tails){
        //   if
        // }

        //NEED TO IMPROVE
        console.log(tails[3] === '0');
        if (tails[0] === '0' && tails[3] === '0') {
          console.log('IN HERE', tails[1]);
          let p1 = parseInt(tails[2]) - 1;

          //   // console.log(p1, p2);
          path = tree.children[`${p1}`];
          //   path.name = `${path.name} = spouse`;
          //   let newTree = { ...tree, path };
          //   setTree(newTree);
          //   console.log('path A', path);
        }

        // add Child
        if (!path.children) {
          let pathId;
          if (tails[3] === 0) {
            tails[3] = '0';
            pathId = tails.join('-');
          }
          path.children = [];
          path.children.push({
            name: 'john',
            id: pathId,
          });

          let newTree = { ...tree, path };
          setTree(newTree);
        }
        console.log('this is parent', path);
      }
    }
  }
  return (
    <Layout>
      <h1>{tree.name}</h1>
      <Tree
        data={tree}
        height={400}
        width={400}
        keyProp="id"
        gProps={{
          onClick: (e, n) => addSpouse(n),
        }}
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
