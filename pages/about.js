import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useUser } from '../lib/hooks';
import Layout from '../components/layout';
import Form from '../components/form';
import * as d3 from 'd3';
// import d3 from 'd3';

import _ from 'lodash';
import dTree from 'd3-dtree';

const About = () => {
  // useUser({ redirectTo: '/', redirectIfFound: true });
  let data1 = [
    {
      name: 'Nicolas Superlongsurname',
      className: 'man',
      textClass: 'emphasis',
      marriages: [
        {
          spouse: {
            name: 'Iliana',
            class: 'woman',
            extra: {
              nickname: 'Illi',
            },
          },
          children: [
            {
              name: 'James',
              class: 'man',
              marriages: [
                {
                  spouse: {
                    name: 'Alexandra',
                    class: 'woman',
                  },
                  children: [
                    {
                      name: 'Eric',
                      class: 'man',
                      marriages: [
                        {
                          spouse: {
                            name: 'Eva',
                            class: 'woman',
                          },
                        },
                      ],
                    },
                    {
                      name: 'Jane',
                      class: 'woman',
                    },
                    {
                      name: 'Jasper',
                      class: 'man',
                    },
                    {
                      name: 'Emma',
                      class: 'woman',
                    },
                    {
                      name: 'Julia',
                      class: 'woman',
                    },
                    {
                      name: 'Jessica',
                      class: 'woman',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const [errorMsg, setErrorMsg] = useState('');
  useEffect(() => {
    window.d3 = d3;
    window._ = _;

    dTree.init(data1, {
      target: '#graph',
      debug: false,
      width: 600,
      height: 600,
      hideMarriageNodes: true,
      marriageNodeSize: 10,
      callbacks: {
        /*
        Callbacks should only be overwritten on a need to basis.
        See the section about callbacks below.
      */
      },
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      nodeWidth: 100,
      styles: {
        node: 'node',
        linage: 'linage',
        marriage: 'marriage',
        text: 'nodeText',
      },
    });
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (errorMsg) setErrorMsg('');

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    if (body.password !== e.currentTarget.rpassword.value) {
      setErrorMsg(`The passwords don't match`);
      return;
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        Router.push('/login');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error);
      setErrorMsg(error.message);
    }
  }

  // let data1 = [
  //   {
  //     name: 'Niclas Superlongsurname',
  //     class: 'man',
  //     textClass: 'emphasis',
  //     marriages: [
  //       {
  //         spouse: {
  //           name: 'Iliana',
  //           class: 'woman',
  //           extra: {
  //             nickname: 'Illi',
  //           },
  //         },
  //         children: [
  //           {
  //             name: 'James',
  //             class: 'man',
  //             marriages: [
  //               {
  //                 spouse: {
  //                   name: 'Alexandra',
  //                   class: 'woman',
  //                 },
  //                 children: [
  //                   {
  //                     name: 'Eric',
  //                     class: 'man',
  //                     marriages: [
  //                       {
  //                         spouse: {
  //                           name: 'Eva',
  //                           class: 'woman',
  //                         },
  //                       },
  //                     ],
  //                   },
  //                   {
  //                     name: 'Jane',
  //                     class: 'woman',
  //                   },
  //                   {
  //                     name: 'Jasper',
  //                     class: 'man',
  //                   },
  //                   {
  //                     name: 'Emma',
  //                     class: 'woman',
  //                   },
  //                   {
  //                     name: 'Julia',
  //                     class: 'woman',
  //                   },
  //                   {
  //                     name: 'Jessica',
  //                     class: 'woman',
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  // d3.json('./data.json', function (error, treeData) {
  //   dTree.init(treeData, {
  //     target: '#graph',
  //     debug: true,
  //     hideMarriageNodes: true,
  //     marriageNodeSize: 5,
  //     height: 800,
  //     width: 1200,
  //     callbacks: {
  //       nodeClick: function (name, extra) {
  //         alert('Click: ' + name);
  //       },
  //       nodeRightClick: function (name, extra) {
  //         alert('Right-click: ' + name);
  //       },
  //       textRenderer: function (name, extra, textClass) {
  //         if (extra && extra.nickname)
  //           name = name + ' (' + extra.nickname + ')';
  //         return (
  //           "<p align='center' className='" + textClass + "'>" + name + '</p>'
  //         );
  //       },
  //       marriageClick: function (extra, id) {
  //         alert('Clicked marriage node' + id);
  //       },
  //       marriageRightClick: function (extra, id) {
  //         alert('Right-clicked marriage node' + id);
  //       },
  //     },
  //   });
  // });

  return (
    <Layout>
      <div>
        <div id="graph"></div>
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
      `}</style>
    </Layout>
  );
};

export default About;
