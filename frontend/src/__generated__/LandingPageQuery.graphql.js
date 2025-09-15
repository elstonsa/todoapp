/**
 * @generated SignedSource<<789064b96c124e808ed543cb7a80bf67>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "LandingPageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "TaskItem",
        "kind": "LinkedField",
        "name": "allTasks",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "TaskDetailPage_task"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LandingPageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "TaskItem",
        "kind": "LinkedField",
        "name": "allTasks",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4cfc8cc3c03b83bf52350f8666fe6770",
    "id": null,
    "metadata": {},
    "name": "LandingPageQuery",
    "operationKind": "query",
    "text": "query LandingPageQuery {\n  allTasks {\n    id\n    title\n    status\n    ...TaskDetailPage_task\n  }\n}\n\nfragment TaskDetailPage_task on TaskItem {\n  id\n  title\n  description\n  status\n}\n"
  }
};
})();

node.hash = "912015d937927bb3df7b00e87b7aa904";

export default node;
