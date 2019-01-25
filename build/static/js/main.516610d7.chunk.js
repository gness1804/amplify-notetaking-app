(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    136: function(e, t, n) {
      e.exports = n(345);
    },
    345: function(e, t, n) {
      'use strict';
      n.r(t);
      var a = n(0),
        r = n.n(a),
        i = n(134),
        o = n.n(i),
        c = n(7),
        s = n.n(c),
        u = n(16),
        l = n.n(u),
        p = n(25),
        d = n(37),
        f = n(36),
        b = n(135);
      function m(e) {
        var t = e.notes,
          n = e.handleDeleteNote,
          a = e.handleSetNote;
        return r.a.createElement(
          'div',
          null,
          t.map(function(e) {
            return r.a.createElement(
              'div',
              { key: e.id, className: 'flex items-center' },
              r.a.createElement(
                'li',
                {
                  className: 'list pa1 f3',
                  onClick: function() {
                    a(e);
                  },
                },
                e.details,
              ),
              r.a.createElement(
                'button',
                {
                  className: 'bg-transparent bn f4',
                  onClick: function() {
                    var t;
                    (t = e.id), n(t);
                  },
                },
                r.a.createElement('span', null, '\xd7'),
              ),
            );
          }),
        );
      }
      var h = Object(b.withAuthenticator)(
        function() {
          var e,
            t,
            n,
            i = Object(a.useState)(''),
            o = Object(f.a)(i, 2),
            s = o[0],
            u = o[1],
            b = Object(a.useState)(''),
            h = Object(f.a)(b, 2),
            v = h[0],
            N = h[1],
            w = Object(a.useState)([]),
            O = Object(f.a)(w, 2),
            g = O[0],
            _ = O[1],
            k = (function() {
              var e = Object(p.a)(
                l.a.mark(function e() {
                  var t;
                  return l.a.wrap(
                    function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (e.next = 2),
                              c.API.graphql(
                                Object(c.graphqlOperation)(
                                  'query ListNotes(\n  $filter: ModelNoteFilterInput\n  $limit: Int\n  $nextToken: String\n) {\n  listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {\n    items {\n      id\n      details\n    }\n    nextToken\n  }\n}\n',
                                ),
                              )
                            );
                          case 2:
                            (t = e.sent), _(t.data.listNotes.items);
                          case 4:
                          case 'end':
                            return e.stop();
                        }
                    },
                    e,
                    this,
                  );
                }),
              );
              return function() {
                return e.apply(this, arguments);
              };
            })();
          Object(a.useEffect)(function() {
            return (
              k(),
              (e = c.API.graphql(
                Object(c.graphqlOperation)(
                  'subscription OnCreateNote {\n  onCreateNote {\n    id\n    details\n  }\n}\n',
                ),
              ).subscribe({
                next: function(e) {
                  var t = e.value.data.onCreateNote;
                  _(function(e) {
                    var n = e.filter(function(e) {
                      return e.id !== t.id;
                    });
                    return [].concat(Object(d.a)(n), [t]);
                  });
                },
              })),
              (t = c.API.graphql(
                Object(c.graphqlOperation)(
                  'subscription OnDeleteNote {\n  onDeleteNote {\n    id\n    details\n  }\n}\n',
                ),
              ).subscribe({
                next: function(e) {
                  var t = e.value.data.onDeleteNote.id;
                  _(function(e) {
                    return e.filter(function(e) {
                      return e.id !== t;
                    });
                  });
                },
              })),
              (n = c.API.graphql(
                Object(c.graphqlOperation)(
                  'subscription OnUpdateNote {\n  onUpdateNote {\n    id\n    details\n  }\n}\n',
                ),
              ).subscribe({
                next: function(e) {
                  var t = e.value.data.onUpdateNote.id;
                  _(function(n) {
                    var a = n.findIndex(function(e) {
                      return e.id === t;
                    });
                    return [].concat(
                      Object(d.a)(n.slice(0, a)),
                      [e.value.data.onUpdateNote],
                      Object(d.a)(n.slice(a + 1)),
                    );
                  }),
                    N(''),
                    u('');
                },
              })),
              function() {
                e.unsubscribe(), t.unsubscribe(), n.unsubscribe();
              }
            );
          }, []);
          var x = function() {
              return (
                !!s &&
                g.filter(function(e) {
                  return e.id === s;
                }).length > 0
              );
            },
            j = (function() {
              var e = Object(p.a)(
                l.a.mark(function e(t) {
                  var n;
                  return l.a.wrap(
                    function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (n = { id: t }),
                              (e.next = 3),
                              c.API.graphql(
                                Object(c.graphqlOperation)(
                                  'mutation DeleteNote($input: DeleteNoteInput!) {\n  deleteNote(input: $input) {\n    id\n    details\n  }\n}\n',
                                  { input: n },
                                ),
                              )
                            );
                          case 3:
                          case 'end':
                            return e.stop();
                        }
                    },
                    e,
                    this,
                  );
                }),
              );
              return function(t) {
                return e.apply(this, arguments);
              };
            })(),
            y = (function() {
              var e = Object(p.a)(
                l.a.mark(function e(t, n) {
                  var a;
                  return l.a.wrap(
                    function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (a = { id: t, details: n }),
                              (e.next = 3),
                              c.API.graphql(
                                Object(c.graphqlOperation)(
                                  'mutation UpdateNote($input: UpdateNoteInput!) {\n  updateNote(input: $input) {\n    id\n    details\n  }\n}\n',
                                  { input: a },
                                ),
                              )
                            );
                          case 3:
                          case 'end':
                            return e.stop();
                        }
                    },
                    e,
                    this,
                  );
                }),
              );
              return function(t, n) {
                return e.apply(this, arguments);
              };
            })(),
            E = (function() {
              var e = Object(p.a)(
                l.a.mark(function e(t) {
                  var n;
                  return l.a.wrap(
                    function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (n = { details: t }),
                              (e.next = 3),
                              c.API.graphql(
                                Object(c.graphqlOperation)(
                                  'mutation CreateNote($input: CreateNoteInput!) {\n  createNote(input: $input) {\n    id\n    details\n  }\n}\n',
                                  { input: n },
                                ),
                              )
                            );
                          case 3:
                            N('');
                          case 4:
                          case 'end':
                            return e.stop();
                        }
                    },
                    e,
                    this,
                  );
                }),
              );
              return function(t) {
                return e.apply(this, arguments);
              };
            })(),
            q = (function() {
              var e = Object(p.a)(
                l.a.mark(function e(t) {
                  return l.a.wrap(
                    function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if ((t.preventDefault(), v)) {
                              e.next = 4;
                              break;
                            }
                            return (
                              alert('Oops! Your note must include text.'),
                              e.abrupt('return')
                            );
                          case 4:
                            if (!x()) {
                              e.next = 9;
                              break;
                            }
                            return (e.next = 7), y(s, v);
                          case 7:
                            e.next = 11;
                            break;
                          case 9:
                            return (e.next = 11), E(v);
                          case 11:
                          case 'end':
                            return e.stop();
                        }
                    },
                    e,
                    this,
                  );
                }),
              );
              return function(t) {
                return e.apply(this, arguments);
              };
            })();
          return r.a.createElement(
            'div',
            {
              className:
                'flex flex-column items-center justify-center pa3 bg-washed-red',
            },
            r.a.createElement('h1', { className: 'code f2-1' }, 'Notetaker'),
            r.a.createElement(
              'form',
              { onSubmit: q, className: 'mb3' },
              r.a.createElement('input', {
                type: 'text',
                className: 'pa2 f4',
                placeholder: 'Write your note.',
                onChange: function(e) {
                  N(e.target.value);
                },
                value: v,
              }),
              r.a.createElement(
                'button',
                { className: 'pa2 f4', type: 'submit' },
                x()
                  ? r.a.createElement('span', null, 'Update Note')
                  : r.a.createElement('span', null, 'Add Note'),
              ),
            ),
            r.a.createElement(m, {
              notes: g,
              handleDeleteNote: j,
              handleSetNote: function(e) {
                var t = e.id,
                  n = e.details;
                u(t), N(n);
              },
            }),
          );
        },
        { includeGreetings: !0 },
      );
      Boolean(
        'localhost' === window.location.hostname ||
          '[::1]' === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
          ),
      );
      var v = {
        aws_project_region: 'us-east-2',
        aws_cognito_identity_pool_id:
          'us-east-2:69b8019b-4fbc-4d28-8e08-1d9452ab90bc',
        aws_cognito_region: 'us-east-2',
        aws_user_pools_id: 'us-east-2_2d4R06C4I',
        aws_user_pools_web_client_id: 'dgcn25iefkkmufcbfkm46ddu2',
        aws_appsync_graphqlEndpoint:
          'https://c47cl7iv3fac3iteba2sobpccu.appsync-api.us-east-2.amazonaws.com/graphql',
        aws_appsync_region: 'us-east-2',
        aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
        aws_content_delivery_bucket:
          'amplifynotetaker-20190124193538-hostingbucket',
        aws_content_delivery_bucket_region: 'us-east-2',
        aws_content_delivery_url:
          'http://amplifynotetaker-20190124193538-hostingbucket.s3-website.us-east-2.amazonaws.com',
      };
      s.a.configure(v),
        o.a.render(r.a.createElement(h, null), document.getElementById('root')),
        'serviceWorker' in navigator &&
          navigator.serviceWorker.ready.then(function(e) {
            e.unregister();
          });
    },
    43: function(e, t) {},
  },
  [[136, 2, 1]],
]);
//# sourceMappingURL=main.516610d7.chunk.js.map
